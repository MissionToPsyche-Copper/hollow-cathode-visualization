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
        this.psyche_spacecraft = new Image();
        this.psyche_spacecraft.src = "/images/psyche_spacecraft.png";
        this.thruster_on = new Image();
        this.thruster_on.src = "/images/plasma_sample.jpg";
        this.thruster_off = new Image();
        this.thruster_off.src = "/images/HallThrusterMockup.png";
        this.base_cathode = new Image();
        this.base_cathode.src = "/images/cross_sectional_view.png";

        this.draw_csv_Base_Drawing = this.draw_csv_Base_Drawing.bind(this);

        this.getCanvasHeight = this.getCanvasHeight.bind(this);
        this.getCanvasHeight = this.getCanvasHeight.bind(this);

        // mounding box for cathode tube
        // (measures are *from* the axis)
        this.min_y = this.getCanvasHeight() * 0.39; // previous value: * 0.39
        this.max_y = this.getCanvasHeight() * 0.49; // previous value: * 0.49
        this.min_x = this.getCanvasWidth() * 0.20; // previous value: * 0.20
        this.max_x = this.getCanvasWidth() * 1.00; // previous value: * 0.35

        this.XenonGeneratorKey = -1;
        this.ElectronGeneratorKey = -1;
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









    getInsertTopX(){
        return (((this.getCanvasWidth() * 0.20) + 12 + (this.getCanvasWidth() * 0.35))/2);
    }
    getInsertTopY(){
        return ((this.getCanvasHeight() * 0.39) + 12);
    }
    getInsertBotY(){
        return ((this.getCanvasHeight() * 0.49) - 12);
    }
    getCathTubeBot(){
        return (this.getCanvasHeight() * 0.49);
    }
    getCathTubeTop(){
        return (this.getCanvasHeight() * 0.39);
    }
    getCathTubeRight(){
        return (this.getCanvasWidth() * 1.00);
    }
    getCathTubeLeft(){
        return (this.getCanvasWidth() * 0.20);
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
        console.log(base ," draw_csv_Base_Drawing called") //:debug
        console.log('base cathode info: '+this.base_cathode.complete+' '+this.base_cathode.naturalHeight); //:debug
        this.clearCanvas(base);
        const ctx = this.getLayer(base);

        ctx.drawImage(this.base_cathode, -100, this.getCanvasHeight() * 0.15, this.getCanvasWidth() * .9, this.getCanvasHeight() * 0.75);




        // visualize cathode tube bounding box
        // ctx.strokeStyle = 'rgba(255,255,255,0.6)';
        // // ctx.fillStyle = 'rgba(194,62,62,0.3)';
        // ctx.lineWidth = 6;
        //
        // // right
        // ctx.beginPath();
        // ctx.moveTo(this.min_x, this.min_y);
        // ctx.lineTo(this.min_x, this.max_y);
        // ctx.stroke();
        //
        // // left
        // ctx.beginPath();
        // ctx.moveTo(this.max_x, this.max_y);
        // ctx.lineTo(this.max_x, this.min_y);
        // ctx.stroke();
        //
        // // top
        // ctx.beginPath();
        // ctx.moveTo(this.max_x, this.min_y);
        // ctx.lineTo(this.min_x, this.min_y);
        // ctx.stroke();
        //
        // // bottom
        // ctx.beginPath();
        // ctx.moveTo(this.min_x, this.max_y);
        // ctx.lineTo(this.max_x, this.max_y);
        // ctx.stroke();

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



    /**
     * draw_csv_Heat_Insert()
     * Function to draw the heat insert visuals (currently only draws an orange square)
     */
    draw_csv_Heat_Insert(){
        // console.log(heat, " draw_csv_Heat_Insert called"); //:debug

        this.clearCanvas(heat);
        const ctx = this.getLayer(heat);

        // Managing particles
        // Turn on Electron Generator, 2 electron per 8 seconds
        this.startElectronGenerator(8);
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

    // draw_csv_Heat_Insert_Particle(){
    //     const ctx = this.getLayer(heat);
    //
    //     // let electron = new ProtoParticle(ctx, ctx.canvas.width * .3, ctx.canvas.height *.6, -999, -999, 0, 0, 6, 'blue'); // randomized
    //     let electron = new ProtoParticle(ctx, this.min_x + 12, (this.min_y + this.max_y) / 2, -999, -999, 0, 0, 6, 'blue', this.max_y, this.min_y, this.max_x, this.min_x); // randomized
    //     electron.setAnimation(this.electronAnimation);
    //     electron.startAnimation();
    //
    //     this.electron_particles.push(electron);
    // }

    /**
     * draw_csv_gas_feed()
     * Function to draw the gas feed visuals (currently only draws a yellow square)
     */
    draw_csv_gas_feed(){
        // console.log(gas, " draw_csv_gas_feed called"); //:debug

        // this.clearCanvas(gas);
        const ctx = this.getLayer(gas);


        // Jack - managing particles
        // Turn on Xenon Generator, 1 xenon per 5 seconds
        this.startXenonGenerator(5);

        // ProtoParticle.generateXenon(ctx)
        // this.draw_csv_gas_feed_particles();
    }


    /**
     * Spawns xenon particles every [spawn_rate] seconds, simulates the gas feed.
     * @author Jack
     *
     * @param spawn_rate time in SECONDS between each particle spawn.
     */
    startXenonGenerator(spawn_rate){
        const ctx = this.getLayer(gas);

        // 1 xenon per 3 seconds
        if(this.XenonGeneratorKey === -1){
            ProtoParticle.generateXenon(ctx, this.min_x + 20, (this.min_y + this.max_y) / 2, this.max_y, this.min_y, this.max_x, this.min_x); // generate an initial one to get it going right away
            this.XenonGeneratorKey = setInterval(ProtoParticle.generateXenon, spawn_rate * 1000, ctx, this.min_x + 20, (this.min_y + this.max_y) / 2, this.max_y, this.min_y, this.max_x, this.min_x); // generate on a timer
        }
    }

    /**
     * Restarts the xenon generator with the desired spawn rate, likely to slow it down
     *
     * @param new_spawn_rate time in seconds between each particle spawn
     */
    slowXenonGenerator(new_spawn_rate){
        this.killXenonGenerator();
        this.startXenonGenerator(new_spawn_rate);
    }

    /**
     * Stops the generation of xenon immediately
     */
    killXenonGenerator(){
        clearInterval(this.XenonGeneratorKey); // kill interval
        this.XenonGeneratorKey = -1; // reset key
    }

    /**
     * Spawns xenon particles every [spawn_rate] seconds, simulates heated cathode inserts.
     * @author Jack
     *
     * @param spawn_rate time in SECONDS between each particle spawn.
     */
    startElectronGenerator(spawn_rate){
        const ctx = this.getLayer(heat);

        // 2 electrons per spawn_rate seconds + 2 initial ones
        if(this.ElectronGeneratorKey === -1){
            // generate two initial ones to get it going right away
            ProtoParticle.generateElectron(ctx, this.getInsertTopX(), this.getInsertTopY(), this.getCathTubeBot(), this.getCathTubeTop(), this.getCathTubeRight(), this.getCathTubeLeft()); // "top insert"
            ProtoParticle.generateElectron(ctx, this.getInsertTopX(), this.getInsertBotY(), this.getCathTubeBot(), this.getCathTubeTop(), this.getCathTubeRight(), this.getCathTubeLeft()); // "bottom insert"
            // generate on a timer
            this.ElectronGeneratorKey = setInterval(ProtoParticle.generateElectron, spawn_rate * 1000, ctx, this.getInsertTopX(), this.getInsertTopY(), this.getCathTubeBot(), this.getCathTubeTop(), this.getCathTubeRight(), this.getCathTubeLeft()); // "top insert"
            this.ElectronGeneratorKey = setInterval(ProtoParticle.generateElectron, spawn_rate * 1000, ctx, this.getInsertTopX(), this.getInsertBotY(), this.getCathTubeBot(), this.getCathTubeTop(), this.getCathTubeRight(), this.getCathTubeLeft()); // "bottom insert"
        }
    }

    /**
     * Restarts the electron generator with the desired spawn rate, likely to slow it down
     *
     * @param new_spawn_rate time in seconds between each particle spawn
     */
    slowElectronGenerator(new_spawn_rate){
        this.killElectronGenerator();
        this.startElectronGenerator(new_spawn_rate);
    }

    /**
     * Stops the generation of electrons immediately
     */
    killElectronGenerator(){
        clearInterval(this.ElectronGeneratorKey); // kill interval
        this.ElectronGeneratorKey = -1; // reset key
    }


    // /**
    //  * draw_csv_gas_feed_particles()
    //  * Draws some simulated particles for the gas feed as a demo
    //  * Author: @Jack Blicha
    //  */
    // draw_csv_gas_feed_particles(){
    //
    // }



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

        ProtoParticle.ejectParticles();
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