// particle variables
var accelerating = true; // array of all existing particles
var particles_array = []; // array of all existing particles
var interval = 3/60; // !WARNING! - affects all particles - essentially how many times a second accelerations and forces should be applied (delta time)

class Sample_Particle {
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


    /**
     * Constructor for particle object with 7 optional parameters and 1 mandatory parameter (layer)
     *
     * @param layer ctx element/layer to draw the particle on
     * @param x int px, initial x position of center of particle, defaults to a random value between 26 and 800  (optional)
     * @param y int px, initial y position of center of particle, defaults to a random value between 26 and 400  (optional)
     * @param vx int px/tick, initial x velocity, defaults to a random integer between 0 and 5  (optional)
     * @param vy int px/tick, initial y velocity, defaults to a random integer between 0 and 5  (optional)
     * @param ax int px/tick^2, initial x acceleration, defaults to a random integer between 1 and 5  (optional)
     * @param ay int px/tick^2, initial y acceleration, defaults to a random integer between 1 and 5  (optional)
     * @param r int px, initial radius of particle, defaults to 15px  (optional)
     * @param color color string or hex string, defaults to 'white'  (optional)
     */
    constructor(
        layer,
        x = -999,
        y = -999,
        vx = Math.floor(Math.random() * 5),
        vy = Math.floor(Math.random() * 5),
        ax = Math.floor(Math.random() * (5 - 1) + 1),
        ay = Math.floor(Math.random() * (5 - 1) + 1),
        r = 15,
        color = 'white'
    ) {
        this.ctx = layer;
        this.canvas = layer.canvas;

        // x error checking
        if(x > layer.canvas.width || x < 0){
            console.error("invalid initial x coordinate of particle");
        }
        // y error checking
        if(y > layer.canvas.height || y < 0){
            console.error("invalid initial y coordinate of particle");
        }

        // y: randomize default value
        if(x === -999){
            // default to a random x position between min and max
            let max = layer.canvas.width;
            let min = r + 1;
            this.x = Math.floor(Math.random() * (max - min) + min);
        } else {
            this.x = x;
        }

        // y: randomize default value
        if(y === -999){
            // default to a random x position between min and max
            let max = layer.canvas.height;
            let min = r + 1;
            this.y = Math.floor(Math.random() * (max - min) + min);
        } else {
            this.y = y;
        }

        this.vx = vx;
        this.vy = vy;
        this.ax = ax;
        this.ay = ay;
        this.radius = r;
        this.color = color;
        this.anime_key = -1; // key/reference to current animation frame, given by browser, defaults to -1
        particles_array.push(this); // add self to particles array
    }

    /**
     * Definition of how a Sample_Particle should look
     */
    draw(){
        this.ctx.beginPath();
        this.ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, true);
        this.ctx.closePath();
        this.ctx.fillStyle = this.color;
        this.ctx.fill();
    }

    /**
     * Initialize/start this particle's rendering and animation.
     */
    startAnimation(){
        // this.anime_key = window.requestAnimationFrame(animate_ball);
        let temp_this = this; // assign "this" (this particle) to a temporary variable so that it is defined when requestAnimationFrame calls it
        this.anime_key = window.requestAnimationFrame(function() { animate_ball(temp_this) });
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
        // this.ctx.beginPath();
        // this.ctx.arc(this.x, this.y, this.radius+1, 0, Math.PI * 2, true);
        // this.ctx.closePath();
        // this.ctx.fillStyle = 'grey';
        // this.ctx.fill();

        // method 1 - properly clear area as rectangle, visible edges on overlap
        this.ctx.clearRect(this.x - this.radius - 1, this.y - this.radius - 1, this.radius * 2 + 2, this.radius * 2 + 2);
    }

}

/**
 * Definition of how to animate a specific particle (a ball)
 */
function animate_ball(ball) {
    ball.clearPath();

    //boundary checking and acceleration
    //y direction
    if (ball.y + ball.vy > ball.canvas.height - ball.radius || ball.y + ball.vy < 0 + ball.radius) {
        ball.vy = -ball.vy;
    } else if(accelerating) {
        // y acceleration
        // v_f = v_o + a*t (kinematic) (where t is the interval or intensity) (good values are like 1/60 or 5/60)
        // acceleration is only applied here to prevent logic errors accelerating particles through collisions
        ball.vy = ball.vy + (ball.ay * interval);
    }

    //x direction
    if (ball.x + ball.vx > ball.canvas.width - ball.radius || ball.x + ball.vx < 0 + ball.radius) {
        ball.vx = -ball.vx;
    } else if(accelerating) {
        // x acceleration
        // v_f = v_o + a*t (kinematic) (where t is the interval or intensity) (good values are like 1/60 or 5/60)
        // acceleration is only applied here to prevent logic errors accelerating particles through collisions
        ball.vx = ball.vx + (ball.ax * interval);
    }

    //move the ball at the given velocity
    ball.x += ball.vx;
    ball.y += ball.vy;
    //draw the ball
    ball.draw();

    ball.raf = window.requestAnimationFrame(function() {animate_ball(ball)});
}

function stop_ball(){
    if(particles_array.length > 0){
        particles_array.pop().clearAnimation();
    } else {
        console.error("stopBall(): particles_array is empty");
    }
}


export default Sample_Particle;

// var ball = new Sample_Particle();
// ball.startAnimation();
