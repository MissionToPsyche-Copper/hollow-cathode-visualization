// particle variables
var accelerating = false; // array of all existing particles
var particles_array = []; // array of all existing particles

class Sample_Particle {
    x; // int px, x position of center of particle
    y; // int px, y position of center of particle
    vx; // int px, x velocity
    vy; // int px, y velocity
    a; // int px/tick^2, acceleration
    radius; // int px, radius of particle
    color; // color string or hex string, color of particle
    canvas; // canvas element/layer the particle is drawn on
    raf; // animation frame reference used to cancel this particle's animation, see this.startAnimation(), defaults to -1


    /**
     * Constructor for particle object with 8 optional parameters
     *
     * @param x int px, initial x position of center of particle, defaults to a random value between 26 and 800
     * @param y int px, initial y position of center of particle, defaults to a random value between 26 and 400
     * @param vx int px/tick, initial x velocity, defaults to a random integer between 0 and 5
     * @param vy int px/tick, initial y velocity, defaults to a random integer between 0 and 5
     * @param a int px/tick^2, initial acceleration, defaults to a random integer between 1 and 5
     * @param r int px, initial radius of particle, defaults to 25px
     * @param color color string or hex string, defaults to 'white'
     * @param layer canvas element/layer to draw the particle on
     */
    constructor(
        x = Math.floor(Math.random() * (800 - 26) + 26),
        y = Math.floor(Math.random() * (400 - 26) + 26),
        vx = Math.floor(Math.random() * 5),
        vy = Math.floor(Math.random() * 5),
        a = Math.floor(Math.random() * (5 - 1) + 1),
        r = 25,
        color = 'white',
        layer = document.getElementById()
    ) {
        this.x = x;
        this.y = y;
        this.vx = vx;
        this.vy = vy;
        this.a = a;
        this.radius = r;
        this.color = color;
        this.canvas = layer;
        // this.canvas = ctx;
        this.raf = -1; // key/reference to current animation frame, defaults to -1
        particles_array.push(this); // add self to particles array
    }

    /**
     * Definition of how a Sample_Particle should look
     */
    draw(){
        this.canvas.beginPath();
        this.canvas.arc(this.x, this.y, this.radius, 0, Math.PI * 2, true);
        this.canvas.closePath();
        this.canvas.fillStyle = this.color;
        this.canvas.fill();
    }

    /**
     * Initialize/start this particle's rendering and animation.
     */
    startAnimation(){
        // this.raf = window.requestAnimationFrame(animate_ball);
        this.raf = window.requestAnimationFrame(function() { animate_ball(this) });
    }

    /**
     * !logic error warning! you may be thinking of clearAnimation()
     * Stop this particle's rendering and animation *WITHOUT erasing the last frame of it.*
     */
    stopAnimation(){
        window.cancelAnimationFrame(this.raf);
    }

    /**
     * !logic error warning! you may be thinking of stopAnimation()
     * Stop this particle's rendering and animation *AND erase the last frame of it.*
     */
    clearAnimation(){
        window.cancelAnimationFrame(this.raf);
        this.clearPath();
    }

    /**
     * Function for clearing the previous frame/particle before drawing the new/updated frame.
     */
    clearPath(){
        // method 0 - clear path using grey particle, no visible edges on overlap but leaves a trail
        // this.canvas.beginPath();
        // this.canvas.arc(this.x, this.y, this.radius+1, 0, Math.PI * 2, true);
        // this.canvas.closePath();
        // this.canvas.fillStyle = 'grey';
        // this.canvas.fill();

        // method 1 - properly clear area as rectangle, visible edges on overlap
        this.canvas.clearRect(this.x - this.radius - 1, this.y - this.radius - 1, this.radius * 2 + 2, this.radius * 2 + 2);
        console.error(this.canvas);
    }

}

/**
 * Definition of how to animate a specific particle (a ball)
 */
function animate_ball(ball) {
    ball.clearPath();

    //boundary checking
    //y direction
    if (ball.y + ball.vy > ball.canvas.height - ball.radius || ball.y + ball.vy < 0 + ball.radius) {
        ball.vy = -ball.vy;
    } else if(accelerating) {
        // y acceleration
        // v_f = v_o + a*t (kinematic) (where t is the interval or intensity) (good values are like 1/60 or 5/60)
        // acceleration is only applied here to prevent logic errors accelerating particles through collisions
        ball.vy = ball.vy + (ball.a * (10/60));
    }
    //x direction
    if (ball.x + ball.vx > ball.canvas.width - ball.radius || ball.x + ball.vx < 0 + ball.radius) {
        ball.vx = -ball.vx;
    } else if(accelerating) {
        // x acceleration
        // v_f = v_o + a*t (kinematic) (where t is the interval or intensity) (good values are like 1/60 or 5/60)
        // acceleration is only applied here to prevent logic errors accelerating particles through collisions
        ball.vx = ball.vx + (ball.a * (10/60));
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


// var ball = new Sample_Particle();
// ball.startAnimation();
