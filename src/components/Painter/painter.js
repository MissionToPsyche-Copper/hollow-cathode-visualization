const base = 0; // ctx0 // scene[base]
const heat = 1; // ctx1 // scene[heat]
const gas = 2; // ctx2 // scene[gas]
const plasma = 3; // ctx3 // scene[plasma]
const keeper = 4; // ctx4 // scene[keeper]
const eject = 5; // ctx5 // scene[eject]

export default class Painter{
    constructor(layers, canvas_height, canvas_width) {
        this.layers = layers
        this.base_cathode = new Image();
        this.base_cathode.src = "/images/base_cathode.png";
        this.psyche_spacecraft = new Image();
        this.psyche_spacecraft.src = "/images/psyche_spacecraft.png";
        this.canvas_height= canvas_height;
        this.canvas_width= canvas_width
        this.draw_csv_Base_Drawing = this.draw_csv_Base_Drawing.bind(this);
    }

    getLayer(layer){
        return this.layers[layer];
    }

    /**
     * clearCanvas(layer)
     * Clears contents of a given canvas layer
     *
     * @param layer layer to clear
     */
    clearCanvas(layer){
        console.log(layer)
        this.getLayer(layer).clearRect(0, 0, this.canvas_width, this.canvas_height);
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
        ctx.fillText("Click the spacecraft to begin!", this.canvas_width * 0.45, this.canvas_height * 0.6);
    }

    draw_csv_Base_Drawing(){
        console.log(base ," draw_csv_Base_Drawing called") //:debug

        this.clearCanvas(base);
        const ctx = this.getLayer(base);

        // draw rectangle
        // ctx.fillStyle = 'rgba(255,0,0,0.5)'; //set the pen color
        // ctx.fillRect(200, 400, 200, 200) //draw a filled in rectangle

        ctx.drawImage(this.base_cathode, 0, this.canvas_height * 0.25, this.base_cathode.width * 0.4, this.base_cathode.height * 0.4);
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
        ctx.fillText("Hollow Cathode Turned Off", this.canvas_width * 0.05, this.canvas_height * 0.9);
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
        ctx.fillText("Heat Insert", this.canvas_width/2, this.canvas_height/2);
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
        ctx.fillText("Gas Feed", this.canvas_width/2, this.canvas_height/2);
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
        ctx.fillText("Internal Plasma", this.canvas_width/2, this.canvas_height/2);
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
        ctx.fillText("Keeper Electrode", this.canvas_width/2, this.canvas_height/2);
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
        ctx.fillText("Eject Plasma", this.canvas_width/2, this.canvas_height/2);
        ctx.restore();
    }
}