// particle variables
var xenon_particles_array = []; // array of all existing xenon particles
var electron_particles_array = []; // array of all existing electron particles

const electronImage = new Image();
electronImage.src = "/images/electron.png";
const xenonImage = new Image();
xenonImage.src = "/images/xenon.png";
const ionizedXenonImage = new Image();
ionizedXenonImage.src = "/images/ionized_xenon.png";

class ProtoParticle {
    ctx; // ctx element/layer the particle is drawn on, draw on this one
    canvas; // canvas element/layer the particle is drawn on, use this to look at the properties of the canvas, don't draw on it
    x; // int px, x position of center of particle
    y; // int px, y position of center of particle
    vx; // int px, x velocity
    vy; // int px, y velocity
    ax; // int px/tick^2, x acceleration
    ay; // int px/tick^2, y acceleration
    radius; // int px, radius of particle
    color; // color string or hex string, color of particle
    anime_key; // animation frame reference used to cancel this particle's animation, see this.startAnimation(), defaults to -1
    animate; // animation function and logic (pathing, boundaries, physics, etc.)
    interval; // essentially the rate defining how many times a second accelerations and forces are applied (delta time)
    accelerating = true; // toggle application of accelerations (for testing purposes)





    /**
     * Constructor for particle object with 7 optional parameters and 1 mandatory parameter (layer)
     *
     * @param layer ctx element/layer to draw the particle on
     * @param x int px, initial x position of center of particle, if set to -999: defaults to a random value between 26 and 800
     * @param y int px, initial y position of center of particle, if set to -999: defaults to a random value between 26 and 400
     * @param vx int px/tick, initial x velocity, if set to -999: defaults to a random integer between 0 and 5
     * @param vy int px/tick, initial y velocity, if set to -999: defaults to a random integer between 0 and 5
     * @param ax int px/tick^2, initial x acceleration, defaults to a random integer between 1 and 5  (optional)
     * @param ay int px/tick^2, initial y acceleration, defaults to a random integer between 1 and 5  (optional)
     * @param r int px, initial radius of particle, defaults to 15px  (optional)
     * @param particle_type either 'electron' or 'xenon' or [(future addition)]
     * @param max_y bounding box
     * @param min_y bounding box
     * @param max_x bounding box
     * @param min_x bounding box
     */
    constructor(
        layer,
        x,
        y,
        vx,
        vy,
        ax = Math.floor(Math.random() * (5 - 1) + 1),
        ay = Math.floor(Math.random() * (5 - 1) + 1),
        r = 15,
        particle_type,
        max_y,
        min_y,
        max_x,
        min_x
    ) {
        this.ctx = layer;
        this.canvas = layer.canvas;


        // x: randomize if default value
        if(x === -999){
            // default to a random x position between min and max
            let max = layer.canvas.width;
            let min = r + 1;
            this.x = Math.floor(Math.random() * (max - min) + min);
        } else {
            this.x = x;
        }

        // y: randomize if default value
        if(y === -999){
            // default to a random x position between min and max
            let max = layer.canvas.height;
            let min = r + 1;
            this.y = Math.floor(Math.random() * (max - min) + min);
        } else {
            this.y = y;
        }

        // x error checking
        if(this.x > layer.canvas.width || this.x < 0){
            console.error("invalid initial x coordinate of particle: ", this.x);
        }
        // y error checking
        if(this.y > layer.canvas.height || this.y < 0){
            console.error("invalid initial y coordinate of particle: ", this.y);
        }


        let vmax = 30;
        let vmin = -30;

        // vx: randomize if default value
        if(vx === -999){
            this.vx = (Math.floor(Math.random() * 30 +1) / 10 / 2);
        } else {
            this.vx = vx;
        }

        // vy: randomize if default value
        if(vy === -999){
            this.vy = (Math.floor(Math.random() * (vmax - vmin) + vmin) / 10 / 2);
        } else {
            this.vy = vy;
        }

        this.ax = ax;
        this.ay = ay;
        this.radius = r;
        // this.color = color; // depreciated now that we have images from the artist
        this.anime_key = -1; // key/reference to current animation frame, given by browser, defaults to -1
        this.interval = 3/60;

        this.max_y = max_y; // set bounding box // operates off of distance from axis
        this.min_y = min_y; // set bounding box
        this.max_x = max_x; // set bounding box
        this.min_x = min_x; // set bounding box

        this.particle_type = particle_type;

        // classification
        // add self to particles array
        if(particle_type === 'electron'){
            this.image = electronImage;
            electron_particles_array.push(this);
        } else if(particle_type === 'xenon'){
            this.image = xenonImage;
            xenon_particles_array.push(this);
        } else {
            this.image = 'none';
            console.error("invalid particle_type: ", this.particle_type);
        }
    }

    /**
     * Definition of how a ProtoParticle should look
     */
    draw(){
        // colored circle
        // this.ctx.beginPath();
        // this.ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, true);
        // this.ctx.closePath();
        // this.ctx.fillStyle = this.color;
        // this.ctx.fill();

        // proper image
        this.ctx.drawImage(this.image, this.x, this.y, this.radius * 2, this.radius * 2)
    }

    /**
     * Initialize/start this particle's rendering and animation.
     */
    startAnimation(){
        // this.anime_key = window.requestAnimationFrame(animate);
        let temp_this = this; // assign "this" (this particle) to a temporary variable so that it is defined when requestAnimationFrame calls it
        this.anime_key = window.requestAnimationFrame(function() { temp_this.animate(temp_this) });
    }

    /**
     * !logic error warning! you may be thinking of clearAnimation()
     * Stop this particle's rendering and animation *WITHOUT erasing the last frame of it.*
     */
    stopAnimation(){
        window.cancelAnimationFrame(this.anime_key);
    }

    /**
     * !logic error warning! you may be thinking of stopAnimation()
     * Stop this particle's rendering and animation *AND erase the last frame of it.*
     */
    clearAnimation(){
        window.cancelAnimationFrame(this.anime_key);
        this.clearPath();
    }

    /**
     * Function for clearing the previous frame/particle before drawing the new/updated frame.
     */
    clearPath(){
        // method 0 - clear path using grey particle, no visible edges on overlap but leaves a trail
        // clear circle
        // this.ctx.beginPath();
        // this.ctx.arc(this.x, this.y, this.radius+1, 0, Math.PI * 2, true);
        // this.ctx.closePath();
        // this.ctx.fillStyle = 'grey';
        // this.ctx.fill();

        // method 1 - properly clear area as rectangle, visible edges on overlap
        // clear circle
        // this.ctx.clearRect(this.x - this.radius - 1, this.y - this.radius - 1, this.radius * 2 + 2, this.radius * 2 + 2);

        // clear image
        this.ctx.clearRect(this.x, this.y, this.radius * 2, this.radius * 2);
    }

    /**
     * Sets the animation function
     * @param animate (function)
     */
    setAnimation(animate){
        this.animate = animate;
    }

    /**
     * Input should be 'electron', 'xenon', 'ionized xenon', or 'none'
     * @param type (string) string representing the particle type, is mapped to appropriate particle image
     */
    setImage(type){
        if(type === 'electron'){
            this.particle_type = 'electron';
            this.image = electronImage;
        } else if(type === 'xenon'){
            this.particle_type = 'xenon';
            this.image = xenonImage;
        } else if(type === 'ionized xenon'){
            this.particle_type = 'ionized xenon';
            this.image = ionizedXenonImage;
        } else if(type === 'none'){
            this.particle_type = 'none';
            console.error('ProtoParticle:: setImage: Invalid type provided: ', type);
        } else {
            this.particle_type = 'none';
            console.error('ProtoParticle:: setImage: Invalid type provided: ', type);
        }
    }

    /**
     * Ionize yourself
     */
    ionize(){
        // if is xenon
        if(this.particle_type === 'xenon'){
            // this.color = '#fff';
            // this.radius += 1;
            this.setImage('ionized xenon');
            // this.vx = Math.floor(this.vx / 4);
            // this.yx = Math.floor(this.yx / 4);
        }
        // if is electron
        else if(this.particle_type === 'electron'){
            // clone self?
            // electron_particles_array.push(this); // not quite how you'd do it
        }
    }

    /**
     * Ionizes the particle at xenon_particles_array[key]
     * Essentially a wrapper for the call, this is needed since using setTimeout makes scoping issues
     *
     * @param index index in xenon_particles_array[]
     */
    static draw_ionize(index){
        try {
            xenon_particles_array[index].ionize();
        } catch (error) {
            // Expected error: TypeError
            // This happens when a particle is deleted before it can ionize, this is normal (in presMode)
        }

    }

    static ionizeParticles(){
        // should avoid array usage here for efficiency
        for (const index in xenon_particles_array) {
            // should probably filter here instead of in this.ionize
            setTimeout(ProtoParticle.draw_ionize, Math.random() * 3 * 1000, index); // random between 0 and 3 seconds
        }
    }

    static xenonAnimation(particle){
        particle.clearPath();

        // set angled boundary box using a slope and a y-intercept
        let m = 1; // slope
        let b = 300; // y intercept

        // check y boundary using normal bounding box
        if (particle.y + particle.vy > particle.max_y - particle.radius * 2 || particle.y + particle.vy < particle.min_y) {
            particle.vy = -particle.vy;
        }
        // check x boundary using normal bounding box
        else if (particle.x + particle.vx > particle.max_x - particle.radius * 2 || particle.x + particle.vx < particle.min_x) {
            particle.vx = -particle.vx;
        }
        // check boundary using slope intercept form (doesn't account for square objects yet) (for squares, pov = top left instead of center)
        else if((particle.y + particle.vy) >= m * (particle.x + particle.vx) + b){

            // // do a proper angled bounce
            // let swap = particle.vx;
            // particle.vx = particle.vy;
            // particle.vy = swap;

        } else if(particle.accelerating){
            // acceleration is only applied here to prevent logic errors accelerating particles through collisions
            // v_f = v_o + a*t (kinematic) (where t is the interval or intensity) (good values are like 1/60 or 5/60)

            // y acceleration
            particle.vy = particle.vy + (particle.ay * particle.interval);

            // x acceleration
            particle.vx = particle.vx + (particle.ax * particle.interval);
        }

        //move the particle at the given velocity
        particle.x += particle.vx;
        particle.y += particle.vy;

        //draw the particle
        particle.draw();

        particle.anime_key = window.requestAnimationFrame(function() {particle.animate(particle)});
    }


    /**
     * Generates a new xenon on a given layer at a given position
     * @param ctx layer
     * @param x initial x position
     * @param y initial y position
     * @param mmax_y bounding box
     * @param mmin_y bounding box
     * @param mmax_x bounding box
     * @param mmin_x bounding box
     */
    static generateXenon(ctx, x, y, mmax_y, mmin_y, mmax_x, mmin_x){
        // Drawing some particles //
        let xenon0 = new ProtoParticle(ctx, x, y, -999, -999, 0, 0, 10, 'xenon', mmax_y, mmin_y, mmax_x, mmin_x); // randomized
        xenon0.setAnimation(ProtoParticle.xenonAnimation);
        xenon0.startAnimation();
    }

    static killAllXenon(){
        let limiti = xenon_particles_array.length;
        for (let i = 0; i < limiti; i++) {
            (xenon_particles_array.pop()).clearAnimation();
        }
    }



    static electronAnimation(particle){
        particle.clearPath();

        // set angled boundary box using a slope and a y-intercept
        let m = 1; // slope
        let b = 300; // y intercept

        // check y boundary using slope intercept form
        if (particle.y + particle.vy > particle.max_y - particle.radius * 2 || particle.y + particle.vy < particle.min_y) {
            particle.vy = -particle.vy;
        }
        // check x boundary using normal bounding box
        else if (particle.x + particle.vx > particle.max_x - particle.radius * 2 || particle.x + particle.vx < particle.min_x) {
            particle.vx = -particle.vx;
        }
        // check boundary using slope intercept form (doesn't account for square objects yet) (for squares, pov = top left instead of center)
        else if((particle.y + particle.vy) >= m * (particle.x + particle.vx) + b){

            // // do a proper angled bounce
            // let swap = particle.vx;
            // particle.vx = particle.vy;
            // particle.vy = swap;

        } else if(particle.accelerating){
            // acceleration is only applied here to prevent logic errors accelerating particles through collisions
            // v_f = v_o + a*t (kinematic) (where t is the interval or intensity) (good values are like 1/60 or 5/60)

            // y acceleration
            particle.vy = particle.vy + (particle.ay * particle.interval);

            // x acceleration
            particle.vx = particle.vx + (particle.ax * particle.interval);
        }

        //move the particle at the given velocity
        particle.x += particle.vx;
        particle.y += particle.vy;

        //draw the particle
        particle.draw();

        particle.anime_key = window.requestAnimationFrame(function() {particle.animate(particle)});
    }

    /**
     * Generates a new xenon on a given layer at a given position
     * @param ctx layer
     * @param x initial x position
     * @param y initial y position
     * @param mmax_y bounding box
     * @param mmin_y bounding box
     * @param mmax_x bounding box
     * @param mmin_x bounding box
     */
    static generateElectron(ctx, x, y, mmax_y, mmin_y, mmax_x, mmin_x){
        // Drawing some particles //
        let electron0 = new ProtoParticle(ctx, x, y, -999, -999, 0, 0, 6, 'electron', mmax_y, mmin_y, mmax_x, mmin_x); // randomized
        electron0.setAnimation(ProtoParticle.electronAnimation);
        electron0.startAnimation();
    }

    static killAllElectron(){
        let limiti = electron_particles_array.length;
        for (let i = 0; i < limiti; i++) {
            (electron_particles_array.pop()).clearAnimation();
        }
    }

    static setElectronBoundingBox(mmax_y, mmin_y, mmax_x, mmin_x){
        // needs implemented
        // for each particle in electron array, update these parameters
    }

    static setXenonBoundingBox(mmax_y, mmin_y, mmax_x, mmin_x){
        // needs implemented
        // for each particle in electron array, update these parameters
    }
}


export default ProtoParticle;
