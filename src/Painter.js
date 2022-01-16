import ProtoParticle from "./ProtoParticle";

/**
 * Mapping layers via constants
 * These should always be used to reference layers when used as parameters to a function or when interacting with this.state.
 * This allows us to easily add and remove layers.
 */
import { base } from "./Galactic";              // ctx0 // scene[base]
import { heat } from "./Galactic";              // ctx1 // scene[heat]
import { gas } from "./Galactic";               // ctx2 // scene[gas]
import { plasma } from "./Galactic";            // ctx3 // scene[plasma]
import { keeper } from "./Galactic";            // ctx4 // scene[keeper]
import { eject } from "./Galactic";             // ctx5 // scene[eject]
import { hallThrusterOff } from "./Galactic";   // ctx6 // scene[hallThrusterOff]
import { hallThrusterOn } from "./Galactic";    // ctx7 // scene[hallThrusterOn]

import { canvas_height } from "./Galactic";
import { canvas_width } from "./Galactic";

const hallThruster_x = canvas_width / 4; // x coord of hall thruster image
const hallThruster_y = canvas_height / 4; // y coord of hall thruster image



class Painter{
    constructor(layers) {
        this.layers = layers;
        this.base_cathode = new Image();
        this.base_cathode.src = "/images/base_cathode.png";
        this.thruster_off = new Image();
        this.thruster_off.src = "/images/HallThrusterMockup.png";
        this.thruster_on = new Image();
        this.thruster_on.src = "/images/plasma_sample.jpg";
        this.psyche_spacecraft = new Image();
        this.psyche_spacecraft.src = "/images/psyche_spacecraft.png";
        this.draw_csv_Base_Drawing = this.draw_csv_Base_Drawing.bind(this);
    }

    getLayer(layer){
        return this.layers[layer];
    }

    /**
     * clearCanvas(layer number)
     * Clears contents of a given canvas layer
     *
     * @param layer_number layer number for layer to clear
     */
    clearCanvas(layer_number){
        this.getLayer(layer_number).clearRect(0, 0, canvas_width, canvas_height);
    }

    /**
     * draw_csv_Base_Drawing()
     * Function to draw the base cathode visuals (currently only draws csv png)
     */

    draw_spacecraft(){
        const ctx = this.getLayer(base);

        ctx.drawImage(this.psyche_spacecraft, 0, 0, this.psyche_spacecraft.width * 0.7, this.psyche_spacecraft.height * 0.7);
    }

    draw_test(){
        // this.clearCanvas(base);
        const ctx = this.getLayer(base);

        // draw text
        ctx.font = "30px Arial";
        ctx.fillStyle = 'rgb(255,255,255)';
        ctx.fillText("Click the spacecraft to begin!", canvas_width * 0.45, canvas_height * 0.6);
    }

    draw_csv_Hall_Thruster_Off(){
        console.log(hallThrusterOff ," draw_csv_Hall_Thruster_Off called") //:debug

        this.clearCanvas(hallThrusterOff);
        const ctx = this.getLayer(hallThrusterOff);

        // draw rectangle
        // ctx.fillStyle = 'rgba(255,0,0,0.5)'; //set the pen color
        // ctx.fillRect(200, 400, 200, 200) //draw a filled in rectangle

        ctx.drawImage(this.thruster_off, hallThruster_x, hallThruster_y, this.thruster_off.width * 0.04, this.thruster_off.height * 0.04);
    }

    draw_csv_Hall_Thruster_On(){
        console.log(hallThrusterOn ," draw_csv_Hall_Thruster_On called") //:debug

        this.clearCanvas(hallThrusterOn);
        const ctx = this.getLayer(hallThrusterOn);

        // draw rectangle
        ctx.fillStyle = 'rgba(0,217,255,0.5)'; //set the pen color
        ctx.fillRect(hallThruster_x, hallThruster_y, 200, 200) //draw a filled in rectangle

        ctx.drawImage(this.thruster_on, hallThruster_x, hallThruster_y, this.thruster_on.width, this.thruster_on.height);
    }

    draw_csv_Base_Drawing(){
        console.log(base ," draw_csv_Base_Drawing called") //:debug

        this.clearCanvas(base);
        const ctx = this.getLayer(base);

        // draw rectangle
        // ctx.fillStyle = 'rgba(255,0,0,0.5)'; //set the pen color
        // ctx.fillRect(200, 400, 200, 200) //draw a filled in rectangle

        ctx.drawImage(this.base_cathode, 0, canvas_height * 0.25, this.base_cathode.width * 0.4, this.base_cathode.height * 0.4);
    }

    /**
     * draw_csv_Base_Drawing_guide()
     * Draws the guide text and tooltips and such for the base drawing for learning mode
     */
    draw_csv_Base_Drawing_guide(){
        // this.clearCanvas(base);
        const ctx = this.getLayer(base);

        // draw text
        ctx.save();
        ctx.font = "30px Arial";
        ctx.fillStyle = 'rgb(255,255,255)';
        ctx.fillText("Hollow Cathode Turned Off", canvas_width * 0.05, canvas_height * 0.9);
        ctx.restore();
    }

    /**
     * draw_csv_Heat_Insert()
     * Function to draw the heat insert visuals (currently only draws an orange square)
     */
    draw_csv_Heat_Insert(){
        console.log(heat, " draw_csv_Heat_Insert called"); //:debug

        this.clearCanvas(heat);
        const ctx = this.getLayer(heat);

        // draw rectangle
        ctx.fillStyle = 'rgba(255,136,0,0.5)';
        ctx.fillRect(300, 400, 200, 200);
    }

    /**
     * draw_csv_Heat_Insert_guide()
     * Draws the guide text and tooltips and such for draw_csv_Heat_Insert for learning mode
     */
    draw_csv_Heat_Insert_guide(){
        console.log(heat, " draw_csv_Heat_Insert_guide called"); //:debug

        // this.clearCanvas(heat);
        const ctx = this.getLayer(heat);

        // draw text
        ctx.save();
        ctx.font = "30px Arial";
        ctx.fillStyle = 'rgb(255,255,255)';
        ctx.fillText("Heat Insert", canvas_width/2, canvas_height/2);
        ctx.restore();
    }

    /**
     * draw_csv_gas_feed()
     * Function to draw the gas feed visuals (currently only draws a yellow square)
     */
    draw_csv_gas_feed(){
        console.log(gas, " draw_csv_gas_feed called"); //:debug

        this.clearCanvas(gas);
        const ctx = this.getLayer(gas);

        // draw rectangle
        ctx.fillStyle = 'rgba(247,255,0,0.5)';
        ctx.fillRect(400, 400, 200, 200);


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
        // Particle Experimentation //
        // Draw some particles

        // sample electron - bound to canvas element
        let electron = new ProtoParticle(ctx, ctx.canvas.width * 0.1, ctx.canvas.height * 0.25, 2, 3, 0, 2, 9, 'blue');
        let electronAnimation = function (particle){
            particle.clearPath();

            //boundary checking and acceleration
            let max_height = particle.canvas.height - particle.radius;
            let min_height = 0 + particle.radius;
            let max_width = particle.canvas.width - particle.radius;
            let min_width = 0 + particle.radius;

            //y direction
            if (particle.y + particle.vy > max_height || particle.y + particle.vy < min_height) {
                particle.vy = -particle.vy;
            } else if(particle.accelerating) {
                // y acceleration
                // v_f = v_o + a*t (kinematic) (where t is the interval or intensity) (good values are like 1/60 or 5/60)
                // acceleration is only applied here to prevent logic errors accelerating particles through collisions
                particle.vy = particle.vy + (particle.ay * particle.interval);
            }

            //x direction
            if (particle.x + particle.vx > max_width || particle.x + particle.vx < min_width) {
                particle.vx = -particle.vx;
            } else if(particle.accelerating) {
                // x acceleration
                // v_f = v_o + a*t (kinematic) (where t is the interval or intensity) (good values are like 1/60 or 5/60)
                // acceleration is only applied here to prevent logic errors accelerating particles through collisions
                particle.vx = particle.vx + (particle.ax * particle.interval);
            }

            //move the particle at the given velocity
            particle.x += particle.vx;
            particle.y += particle.vy;
            //draw the particle
            particle.draw();

            particle.raf = window.requestAnimationFrame(function() {particle.animate(particle)});
        }
        electron.setAnimation(electronAnimation);
        electron.startAnimation();

        // sample xenon - bound vertically to canvas element, bound horizontally to cathode
        let xenon = new ProtoParticle(ctx, ctx.canvas.width * 0.1, ctx.canvas.height * 0.25, 2, 3, 0, 2, 15, 'purple');
        let xenonAnimation = function (particle){
            particle.clearPath();

            //boundary checking and acceleration
            let max_height = particle.canvas.height - particle.radius;
            let min_height = 0 + particle.radius;
            let max_width = (particle.canvas.width / 2) - particle.radius;
            let min_width = 0 + particle.radius;

            //y direction
            if (particle.y + particle.vy > max_height || particle.y + particle.vy < min_height) {
                particle.vy = -particle.vy;
            } else if(particle.accelerating) {
                // y acceleration
                // v_f = v_o + a*t (kinematic) (where t is the interval or intensity) (good values are like 1/60 or 5/60)
                // acceleration is only applied here to prevent logic errors accelerating particles through collisions
                particle.vy = particle.vy + (particle.ay * particle.interval);
            }

            //x direction
            if (particle.x + particle.vx > max_width - particle.radius || particle.x + particle.vx < min_width) {
                particle.vx = -particle.vx;
            } else if(particle.accelerating) {
                // x acceleration
                // v_f = v_o + a*t (kinematic) (where t is the interval or intensity) (good values are like 1/60 or 5/60)
                // acceleration is only applied here to prevent logic errors accelerating particles through collisions
                particle.vx = particle.vx + (particle.ax * particle.interval);
            }

            //move the particle at the given velocity
            particle.x += particle.vx;
            particle.y += particle.vy;
            //draw the particle
            particle.draw();

            particle.raf = window.requestAnimationFrame(function() {particle.animate(particle)});
        }
        xenon.setAnimation(xenonAnimation);
        xenon.startAnimation();

        // sample floater - bound canvas element, no accelerations
        let floater = new ProtoParticle(ctx, ctx.canvas.width * 0.1, ctx.canvas.height * 0.25, 2, 3, 0, 2, 30, 'white');
        let floaterAnimation = function (particle){
            particle.clearPath();

            //boundary checking and acceleration
            let max_height = particle.canvas.height - particle.radius;
            let min_height = 0 + particle.radius;
            let max_width = particle.canvas.width - particle.radius;
            let min_width = 0 + particle.radius;

            //y direction
            if (particle.y + particle.vy > max_height || particle.y + particle.vy < min_height) {
                particle.vy = -particle.vy;
            }

            //x direction
            if (particle.x + particle.vx > max_width - particle.radius || particle.x + particle.vx < min_width) {
                particle.vx = -particle.vx;
            }

            //move the particle at the given velocity
            particle.x += particle.vx;
            particle.y += particle.vy;
            //draw the particle
            particle.draw();

            particle.raf = window.requestAnimationFrame(function() {particle.animate(particle)});
        }
        floater.setAnimation(floaterAnimation);
        floater.startAnimation();
    }



    /**
     * draw_csv_gas_feed_guide()
     * Draws the guide text and tooltips and such for draw_csv_gas_feed for learning mode
     */
    draw_csv_gas_feed_guide(){
        console.log(gas, " draw_csv_gas_feed_guide called"); //:debug

        // this.clearCanvas(gas);
        const ctx = this.getLayer(gas);

        // draw text
        ctx.save();
        ctx.font = "30px Arial";
        ctx.fillStyle = 'rgb(255,255,255)';
        ctx.fillText("Gas Feed", canvas_width/2, canvas_height/2);
        ctx.restore();
    }

    /**
     * draw_csv_internal_plasma()
     * Function to draw the internal plasma visuals (currently only draws a green square)
     */
    draw_csv_internal_plasma(){
        console.log(plasma, " draw_csv_internal_plasma called"); //:debug

        this.clearCanvas(plasma);
        const ctx = this.getLayer(plasma);

        // draw rectangle
        ctx.fillStyle = 'rgba(56,255,0,0.65)';
        ctx.fillRect(500, 400, 200, 200);
    }

    /**
     * draw_csv_internal_plasma_guide()
     * Draws the guide text and tooltips and such for draw_csv_internal_plasma for learning mode
     */
    draw_csv_internal_plasma_guide() {
        console.log(plasma, " draw_csv_internal_plasma_guide called"); //:debug

        // this.clearCanvas(plasma);
        const ctx = this.getLayer(plasma);

        // draw text
        ctx.save();
        ctx.font = "30px Arial";
        ctx.fillStyle = 'rgb(255,255,255)';
        ctx.fillText("Internal Plasma", canvas_width/2, canvas_height/2);
        ctx.restore();
    }


    /**
     * draw_csv_keeper_electrode()
     * Function to draw the keeper electrode visuals (currently only draws a blue square)
     */
    draw_csv_keeper_electrode(){
        console.log(keeper, " draw_csv_keeper_electrode called"); //:debug

        this.clearCanvas(keeper);
        const ctx = this.getLayer(keeper);

        // draw rectangle
        ctx.fillStyle = 'rgba(0,54,255,0.5)';
        ctx.fillRect(600, 400, 200, 200);
    }

    /**
     * draw_csv_keeper_electrode_guide()
     * Draws the guide text and tooltips and such for the draw_csv_keeper_electrode for learning mode
     */
    draw_csv_keeper_electrode_guide(){
        console.log(keeper, " draw_csv_keeper_electrode_guide called"); //:debug

        // this.clearCanvas(keeper);
        const ctx = this.getLayer(keeper);

        // draw text
        ctx.save();
        ctx.font = "30px Arial";
        ctx.fillStyle = 'rgb(255,255,255)';
        ctx.fillText("Keeper Electrode", canvas_width/2, canvas_height/2);
        ctx.restore();
    }


    /**
     * draw_csv_eject_plasma()
     * Function to draw the eject plasma visuals (currently only draws a violet [purple] square)
     */
    draw_csv_eject_plasma(){
        console.log(eject, " draw_csv_eject_plasma called"); //:debug

        this.clearCanvas(eject);
        const ctx = this.getLayer(eject);

        // draw rectangle
        ctx.fillStyle = 'rgba(59,0,255,0.5)';
        ctx.fillRect(700, 400, 200, 200);
    }

    /**
     * draw_csv_eject_plasma_guide()
     * Draws the guide text and tooltips and such for the draw_csv_eject_plasma for learning mode
     */
    draw_csv_eject_plasma_guide() {
        console.log(eject, " draw_csv_eject_plasma_guide called"); //:debug

        // this.clearCanvas(eject);
        const ctx = this.getLayer(eject);

        // draw text
        ctx.save();
        ctx.font = "30px Arial";
        ctx.fillStyle = 'rgb(255,255,255)';
        ctx.fillText("Eject Plasma", canvas_width/2, canvas_height/2);
        ctx.restore();
    }
}

export default Painter;