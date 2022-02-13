import ProtoParticle from "./ProtoParticle";

/**
 * Mapping layers via constants
 * These should always be used to reference layers when used as parameters to a function or when interacting with this.state.
 * This allows us to easily add and remove layers.
 */
import {
    base,
    canvas_height,
    canvas_width,
    eject,
    gas,
    hallThrusterOff,
    hallThrusterOn,
    heat,
    keeper,
    plasma
} from "./Galactic";

// const hallThruster_x = canvas_width / 4; // x coord of hall thruster image
// const hallThruster_y = canvas_height / 4; // y coord of hall thruster image




class Painter{
    constructor(layers) {
        this.layers = layers;

        // pre-load images
        this.base_cathode = new Image();
        this.base_cathode.src = "/images/base_cathode.png";
        this.thruster_off = new Image();
        this.thruster_off.src = "/images/HallThrusterMockup.png";
        this.thruster_on = new Image();
        this.thruster_on.src = "/images/plasma_sample.jpg";
        this.psyche_spacecraft = new Image();
        this.psyche_spacecraft.src = "/images/psyche_spacecraft.png";

        // particle managing variables
        this.xenon_particles = []; //array of all existing xenon particle objects
        this.electron_particles = []; //array of all existing electron particle objects

        this.draw_csv_Base_Drawing = this.draw_csv_Base_Drawing.bind(this);
        this.xenonAnimation = this.xenonAnimation.bind(this);

        this.getCanvasHeight = this.getCanvasHeight.bind(this);
        this.getCanvasHeight = this.getCanvasHeight.bind(this);

        this.cathodeTop = this.getCanvasHeight() * 0.50;
        this.cathodeHeight = this.getCanvasHeight() * 0.70;
        this.cathodeLeft = this.getCanvasWidth() * 0.35;
        this.cathodeRight = this.getCanvasWidth() * 0.55;
    }

    /**
     * Retrieves a layer by index (constant number)
     * @param layer_number the number for the layer needed
     * @returns {*} ctx reference/object for the layer
     */
    getLayer(layer_number){
        return this.layers[layer_number];
    }

    getCanvasHeight(){
        return this.getLayer(0).canvas.height;
    }
    getCanvasWidth(){
        return this.getLayer(0).canvas.width;
    }

    /**
     * clearCanvas(layer number)
     * Clears contents of a given canvas layer
     *
     * @param layer_number layer number for layer to clear
     */
    clearCanvas(layer_number){
        // this.getLayer(layer_number).clearRect(0, 0, canvas_width, canvas_height); // depends on canvas_width & canvas_height
        this.getLayer(layer_number).clearRect(0, 0, this.getCanvasWidth(), this.getCanvasHeight()); // doesn't

    }

    /** Learning Mode */
    /**
     * Particle effect overlay to make the thruster and cathode appear to be on/operating
     */
    draw_Hall_Thruster_Off(){
        // console.log(hallThrusterOff ," draw_Hall_Thruster_Off called") //:debug

        this.clearCanvas(hallThrusterOff);
        const ctx = this.getLayer(hallThrusterOff);

        // ctx.drawImage(this.thruster_off, hallThruster_x, hallThruster_y, this.thruster_off.width * 0.04, this.thruster_off.height * 0.04);
    }

    /**
     * Particle effect overlay to make the thruster and cathode appear to be on/operating
     */
    draw_Hall_Thruster_On(){
        // console.log(hallThrusterOn ," draw_Hall_Thruster_On called") //:debug

        this.clearCanvas(hallThrusterOn);
        const ctx = this.getLayer(hallThrusterOn);

        // ctx.drawImage(this.thruster_on, hallThruster_x, hallThruster_y, this.thruster_on.width, this.thruster_on.height);
    }

    /** Learning Mode and Presentation Mode */
    /**
     * draw_csv_Base_Drawing()
     * Function to draw the base cathode visuals
     */
    draw_csv_Base_Drawing(){
        // console.log(base ," draw_csv_Base_Drawing called") //:debug

        this.clearCanvas(base);
        const ctx = this.getLayer(base);

        // ctx.drawImage(this.base_cathode, 0, this.getCanvasHeight() * 0.25, this.base_cathode.width * 0.4, this.base_cathode.height * 0.4);
        ctx.drawImage(this.base_cathode, 0, this.getCanvasHeight() * 0.25, this.getCanvasWidth() * 0.4, this.getCanvasHeight() * 0.4);
        // ctx.drawImage(this.base_cathode, 0, 0, 300, 300);


        // set overall boundary box to be the canvas edges

        let max_y = this.cathodeHeight;
        let min_y = this.cathodeTop;
        let max_x = this.cathodeRight;
        let min_x = this.cathodeLeft;

        ctx.strokeStyle = 'rgba(255,255,255,0.6)';
        // ctx.fillStyle = 'rgba(194,62,62,0.3)';
        ctx.lineWidth = 6;

        // right
        ctx.beginPath();
        ctx.moveTo(min_x, min_y);
        ctx.lineTo(min_x, max_y);
        ctx.stroke();

        // left
        ctx.beginPath();
        ctx.moveTo(max_x, max_y);
        ctx.lineTo(max_x, min_y);
        ctx.stroke();

        // top
        ctx.beginPath();
        ctx.moveTo(max_x, min_y);
        ctx.lineTo(min_x, min_y);
        ctx.stroke();

        // bottom
        ctx.beginPath();
        ctx.moveTo(min_x, max_y);
        ctx.lineTo(max_x, max_y);
        ctx.stroke();

    }

    /**
     * draw_csv_Base_Drawing_guide()
     * Draws the guide text and tooltips and such for the base drawing for learning mode
     */
    draw_csv_Base_Drawing_guide(){
        // console.log("draw_csv_Base_Drawing_guide");
        // this.clearCanvas(base);
        // const ctx = this.getLayer(base);

    }


    xenonAnimation(particle){
        particle.clearPath();

        let max_y = this.cathodeHeight;
        let min_y = this.cathodeTop;
        let max_x = this.cathodeRight;
        let min_x = this.cathodeLeft;

        //boundary checking and acceleration - (combined to prevent logic errors on boundary AND acceleration at same time)
        // let cathodeTop = this.getCanvasHeight() * .25; // original canvas modifier: * .25
        // let cathodeHeight = this.getCanvasHeight() * .25; // original canvas modifier: this.base_cathode.height *.4
        // let cathodeLeft = this.getCanvasWidth() *.25; // original canvas modifier: * .25
        // let cathodeRight = this.getCanvasWidth() *.25; // original canvas modifier: this.base_cathode.width *.4
        // // set overall boundary box to be the canvas edges
        //
        // let max_y = (cathodeTop + cathodeHeight) - particle.radius;
        // let min_y = cathodeTop + particle.radius;
        // let max_x = (cathodeRight) - particle.radius;
        // let min_x = (cathodeLeft + particle.radius)*.9;

        // set angled boundary box using a slope and a y-intercept
        let m = 1; // slope
        let b = 300; // y intercept

        // check boundary using slope intercept form
        if (particle.y + particle.vy > max_y || particle.y + particle.vy < min_y) {
            particle.vy = -particle.vy;
        }
        else if (particle.x + particle.vx > max_x - particle.radius || particle.x + particle.vx < min_x) {
            particle.vx = -particle.vx;
        }
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

        particle.raf = window.requestAnimationFrame(function() {particle.animate(particle)});
    }

    /**
     * draw_csv_Heat_Insert()
     * Function to draw the heat insert visuals (currently only draws an orange square)
     */
    draw_csv_Heat_Insert(){
        // console.log(heat, " draw_csv_Heat_Insert called"); //:debug

        this.clearCanvas(heat);
        const ctx = this.getLayer(heat);

        this.draw_csv_Heat_Insert_Particle()
    }

    /**
     * draw_csv_Heat_Insert_guide()
     * Draws the guide text and tooltips and such for draw_csv_Heat_Insert for learning mode
     */
    draw_csv_Heat_Insert_guide(){
        // console.log(heat, " draw_csv_Heat_Insert_guide called"); //:debug

        // this.clearCanvas(heat);
        // const ctx = this.getLayer(heat);
    }

    draw_csv_Heat_Insert_Particle(){
        const ctx = this.getLayer(heat);
        // let electron = new ProtoParticle(ctx, ctx.canvas.width * .3, ctx.canvas.height *.6, -999, -999, 0, 0, 6, 'blue'); // randomized
        let electron = new ProtoParticle(ctx, this.cathodeLeft + 12, (this.cathodeHeight + this.cathodeTop) / 2, -999, -999, 0, 0, 6, 'blue'); // randomized
        electron.setAnimation(this.xenonAnimation);
        electron.startAnimation();

        this.electron_particles.push(electron);
    }

    /**
     * draw_csv_gas_feed()
     * Function to draw the gas feed visuals (currently only draws a yellow square)
     */
    draw_csv_gas_feed(){
        // console.log(gas, " draw_csv_gas_feed called"); //:debug

        this.clearCanvas(gas);
        const ctx = this.getLayer(gas);


        // Jack
        this.draw_csv_gas_feed_particles();
    }


    /**
     * draw_csv_gas_feed_particles()
     * Draws some simulated particles for the gas feed as a demo
     * Author: @Jack Blicha
     */
    draw_csv_gas_feed_particles(){
        const ctx = this.getLayer(gas);


        // Drawing some particles //
        let xenon0 = new ProtoParticle(ctx,this.cathodeLeft + 12, (this.cathodeHeight + this.cathodeTop) / 2, -999, -999, 0, 0, 10, 'purple'); // randomized
        xenon0.setAnimation(this.xenonAnimation);
        xenon0.startAnimation();

        this.xenon_particles.push(xenon0); //meaningless now
    }



    /**
     * draw_csv_gas_feed_guide()
     * Draws the guide text and tooltips and such for draw_csv_gas_feed for learning mode
     */
    draw_csv_gas_feed_guide(){
        // console.log(gas, " draw_csv_gas_feed_guide called"); //:debug

         this.clearCanvas(gas);
         const ctx = this.getLayer(gas);

    }

    /**
     * draw_csv_internal_plasma()
     * Function to draw the internal plasma visuals (currently only draws a green square)
     */
    draw_csv_internal_plasma(){
        // console.log(plasma, " draw_csv_internal_plasma called"); //:debug

        this.clearCanvas(plasma);
        const ctx = this.getLayer(plasma);

        ProtoParticle.ionizeParticles();
    }

    /**
     * draw_csv_internal_plasma_guide()
     * Draws the guide text and tooltips and such for draw_csv_internal_plasma for learning mode
     */
    draw_csv_internal_plasma_guide() {
        // console.log(plasma, " draw_csv_internal_plasma_guide called"); //:debug

        // because the user has the inserts heated and the gas feed toggled on, plasma is forming within the cathode tube/chamber(?), this plasma is super hot and stuff and is what we need
        // now we need to eject this plasma from the hollow cathode

        // this.clearCanvas(plasma);
        // const ctx = this.getLayer(plasma);

    }

    /**
     * draw_csv_internal_plasma_off_heat_guide()
     * Draws the guide text for when the user has caused the internal plasma to disappear due to turning off "heat inserts"
     */
    draw_csv_internal_plasma_on_heat_guide() {
        // console.log(plasma, " draw_csv_internal_plasma_off_heat_guide called"); //:debug
    }

    /**
     * draw_csv_internal_plasma_off_heat_guide()
     * Draws the guide text for when the user has caused the internal plasma to disappear due to turning off "heat inserts"
     */
    draw_csv_internal_plasma_on_heat_guide() {
        // console.log(plasma, " draw_csv_internal_plasma_off_heat_guide called"); //:debug
    }

    /**
     * draw_csv_internal_plasma_off_heat_guide()
     * Draws the guide text for when the user has caused the internal plasma to disappear due to turning off "heat inserts"
     */
    draw_csv_internal_plasma_off_heat_guide() {
        // console.log(plasma, " draw_csv_internal_plasma_off_heat_guide called"); //:debug
    }

    /**
     * draw_csv_internal_plasma_off_gas_guide()
     * Draws the guide text for when the user has caused the internal plasma to disappear due to turning off "gas feed"
     */
    draw_csv_internal_plasma_off_gas_guide() {
        // console.log(plasma, " draw_csv_internal_plasma_off_gas_guide called"); //:debug
    }


    /**
     * draw_csv_keeper_electrode()
     * Function to draw the keeper electrode visuals (currently only draws a blue square)
     */
    draw_csv_keeper_electrode(){
        // console.log(keeper, " draw_csv_keeper_electrode called"); //:debug

        this.clearCanvas(keeper);
        const ctx = this.getLayer(keeper);
    }

    /**
     * draw_csv_keeper_electrode_guide()
     * Draws the guide text and tooltips and such for the draw_csv_keeper_electrode for learning mode
     */
    draw_csv_keeper_electrode_guide(){
        // console.log(keeper, " draw_csv_keeper_electrode_guide called"); //:debug

        // this.clearCanvas(keeper);
        // const ctx = this.getLayer(keeper);
    }


    /**
     * draw_csv_eject_plasma()
     * Function to draw the eject plasma visuals (currently only draws a violet [purple] square)
     */
    draw_csv_eject_plasma(){
        // console.log(eject, " draw_csv_eject_plasma called"); //:debug

        this.clearCanvas(eject);
        const ctx = this.getLayer(eject);
    }

    /**
     * draw_csv_eject_plasma_guide()
     * Draws the guide text and tooltips and such for the draw_csv_eject_plasma for learning mode
     */
    draw_csv_eject_plasma_guide() {
        // console.log(eject, " draw_csv_eject_plasma_guide called"); //:debug

        // this.clearCanvas(eject);
        // const ctx = this.getLayer(eject);
    }
}

export default Painter;