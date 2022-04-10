
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
    plasma,
    right_of_cathode_constant,
    left_of_cathode_constant,
    top_of_cathode_constant,
    bottom_of_cathode_constant,
    particle_right_bounding_box
} from "./Galactic";


/// "CONSTANTS" ///
const ELECTRON_SPAWN_RATE = 5; // 2 particle(s) every [ELECTRON_SPAWN_RATE] seconds
const XENON_SPAWN_RATE = 2; // 1 particle(s) every [XENON_SPAWN_RATE] seconds
const ELECTRON_RADIUS = 6;
const XENON_RADIUS = 10;
///

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
        this.base_cathode.src = "/images/hall_thruster_shell.png";

        this.draw_csv_Base_Drawing = this.draw_csv_Base_Drawing.bind(this);

        this.getCanvasHeight = this.getCanvasHeight.bind(this);
        this.getCanvasHeight = this.getCanvasHeight.bind(this);

        // mounding box for cathode tube
        // (measures are *from* the axis)
        this.min_y = this.getCathTubeTop();
        this.max_y = this.getCathTubeBot();
        this.min_x = this.getCathTubeLeftX();
        this.max_x = this.getCathTubeRightX();

        this.XenonGeneratorKey = -1;
        this.ElectronGeneratorKey_Top = -1; // top of insert
        this.ElectronGeneratorKey_Bot = -1; // bottom of insert
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
        return this.getLayer(base).canvas.height;
    }
    getCanvasWidth(){
        return this.getLayer(base).canvas.width;
    }

    /**
     * clearCanvas(layer number)
     * Clears contents of a given canvas layer
     *
     * @param layer_number layer number for layer to clear
     */
    clearCanvas(layer_number){
        this.getLayer(layer_number).clearRect(0, 0, this.getCanvasWidth(), this.getCanvasHeight());

    }


    /**
     * getInsert___()
     * Returns the location of the ___ of the insert on the _ axis, don't forget to account for particle width
     * Used for the electron and xenon spawn positions
     *
     * @returns {number} (int) single coordinate
     */
    getInsertTopX(){
        return (this.getCathTubeLeftX() + this.getCathTubeRightX())/2; // in short: ( tube_left + tube_right ) / 2
    }
    getInsertTopY(){
        return this.getCanvasHeight() * top_of_cathode_constant;
    }
    getInsertBotY(){
        return this.getCanvasHeight() * bottom_of_cathode_constant;
    }

    /**
     * getCathTube___()
     * Returns the location of the ___ of the cathode tube on the _ axis, don't forget to account for particle width
     * Used for the electron and xenon boundary box positions* (talk to Jack he isn't done here - 3/31/22)
     *
     * @returns {number} (int) single coordinate
     */
    getCathTubeBot(){
        return this.getCanvasHeight() * bottom_of_cathode_constant;
    }
    getCathTubeTop(){
        return this.getCanvasHeight() * top_of_cathode_constant;
    }
    getCathTubeRightX(){
        return this.getCanvasWidth() * right_of_cathode_constant;
    }
    getCathTubeLeftX(){
        return this.getCanvasWidth() * left_of_cathode_constant;
    }

    getRandomInt(min, max) {
        min = Math.ceil(this.getCathTubeLeftX()) + ELECTRON_RADIUS;
        max = Math.floor(this.getCathTubeRightX()) - ELECTRON_RADIUS;
        return Math.floor(Math.random() * (max - min) + min); //The maximum is exclusive and the minimum is inclusive
    }

    /**
     * getParticleTube___()
     * Returns the location of the particle boundary for the cathode tube on the _ axis, don't forget to account for particle width
     * Used for the electron and xenon boundary box positions* (talk to Jack he isn't done here - 3/31/22)
     *
     * @returns {number} (int) single coordinate
     */
    getParticleTubeRightX(){
        return this.getCanvasWidth() * particle_right_bounding_box;
    }



    /** Learning Mode */
    /**
     * Particle effect overlay to make the thruster and cathode appear to be on/operating
     */
    draw_Hall_Thruster_Off(){
        this.clearCanvas(hallThrusterOff);
        const ctx = this.getLayer(hallThrusterOff);
    }

    /**
     * Particle effect overlay to make the thruster and cathode appear to be on/operating
     */
    draw_Hall_Thruster_On(){
        this.clearCanvas(hallThrusterOn);
        const ctx = this.getLayer(hallThrusterOn);
    }

    /** Learning Mode and Presentation Mode */
    /**
     * draw_csv_Base_Drawing()
     * Function to draw the base cathode visuals
     */
    draw_csv_Base_Drawing(){
        // console.log(base ," draw_csv_Base_Drawing called") //:debug
        // console.log('base cathode info: '+this.base_cathode.complete+' '+this.base_cathode.naturalHeight); //:debug
        this.clearCanvas(base);
        const ctx = this.getLayer(base);

        ctx.drawImage(this.base_cathode, 0, this.getCanvasHeight() * 0, this.getCanvasWidth() * 0.6, this.getCanvasHeight() * 0.75); // draw the cathode

        ctx.drawImage(this.base_cathode, -100, this.getCanvasHeight() * 0.1, this.getCanvasWidth() * .7, this.getCanvasHeight() * 0.75); // draw the cathode




        // visualize cathode tube bounding box //:debug
        ctx.strokeStyle = 'rgba(255,255,255,0.6)'; //:debug
        ctx.lineWidth = 6; //:debug

        // right //:debug
        ctx.beginPath(); //:debug
        ctx.moveTo(this.min_x, this.min_y); //:debug
        ctx.lineTo(this.min_x, this.max_y); //:debug
        ctx.stroke(); //:debug

        ctx.strokeStyle = 'rgba(201,69,69,0.6)'; //:debug

        // left //:debug
        ctx.beginPath(); //:debug
        ctx.moveTo(this.max_x, this.max_y); //:debug
        ctx.lineTo(this.max_x, this.min_y); //:debug
        ctx.stroke(); //:debug

        ctx.strokeStyle = 'rgba(210,184,30,0.6)'; //:debug

        // top //:debug
        ctx.beginPath(); //:debug
        ctx.moveTo(this.max_x, this.min_y); //:debug
        ctx.lineTo(this.min_x, this.min_y); //:debug
        ctx.stroke(); //:debug

        ctx.strokeStyle = 'rgba(128,0,0,0.6)'; //:debug

        // bottom //:debug
        ctx.beginPath(); //:debug
        ctx.moveTo(this.min_x, this.max_y); //:debug
        ctx.lineTo(this.max_x, this.max_y); //:debug
        ctx.stroke(); //:debug

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
     * Defines what drawing "heat insert" looks like
     * Function to draw the heat insert visuals (currently only draws an orange square)
     */
    draw_csv_Heat_Insert(){
        // console.log(heat, " draw_csv_Heat_Insert called"); //:debug

        this.clearCanvas(heat);
        const ctx = this.getLayer(heat);

        // Managing particles
        // Turn on Electron Generator
        this.startElectronGenerator(ELECTRON_SPAWN_RATE);
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
        // Turn on Xenon Generator
        this.startXenonGenerator(XENON_SPAWN_RATE);

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
            ProtoParticle.generateXenon(ctx, this.min_x + 20, (this.min_y + this.max_y) / 2, this.max_y, this.min_y, this.max_x, this.min_x - XENON_RADIUS); // generate an initial one to get it going right away
            this.XenonGeneratorKey = setInterval(ProtoParticle.generateXenon, spawn_rate * 1000, ctx, this.min_x + 20, (this.min_y + this.max_y) / 2, this.max_y, this.min_y, this.max_x, this.min_x - XENON_RADIUS); // generate on a timer
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
        this.killElectronGenerator();
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
        if(this.ElectronGeneratorKey_Top === -1){
            // generate two initial ones to get it going right away
            ProtoParticle.generateElectron(ctx, this.getInsertTopX(), this.getInsertTopY() + 12, this.getCathTubeBot(), this.getCathTubeTop(), this.getParticleTubeRightX(), this.getCathTubeLeftX()); // "top insert"
            ProtoParticle.generateElectron(ctx, this.getInsertTopX(), this.getInsertBotY() - 12, this.getCathTubeBot(), this.getCathTubeTop(), this.getParticleTubeRightX(), this.getCathTubeLeftX()); // "bottom insert"
            // generate on a timer
            this.ElectronGeneratorKey_Top = setInterval(ProtoParticle.generateElectron, spawn_rate * 1000, ctx, this.getInsertTopX() + 12, this.getInsertTopY() + 12, this.getCathTubeBot(), this.getCathTubeTop(), this.getParticleTubeRightX(), this.getCathTubeLeftX()); // "top insert"
            this.ElectronGeneratorKey_Bot = setInterval(ProtoParticle.generateElectron, spawn_rate * 1000, ctx, this.getInsertTopX() + 12, this.getInsertBotY() - 12, this.getCathTubeBot(), this.getCathTubeTop(), this.getParticleTubeRightX(), this.getCathTubeLeftX()); // "bottom insert"
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
        clearInterval(this.ElectronGeneratorKey_Top); // kill interval
        clearInterval(this.ElectronGeneratorKey_Bot); // kill interval
        this.ElectronGeneratorKey_Top = -1; // reset key
        this.ElectronGeneratorKey_Bot = -1; // reset key
    }


    stopEjecting(){
        ProtoParticle.setEjectFlag(false);
    }
    stopIonizing(){
        ProtoParticle.setIonizeFlag(false);
    }

    /**
     * Stops, clears, and resets all generators, particles, and flags.
     */
    killProtoParticle(){
        this.killElectronGenerator();
        this.killXenonGenerator();
        ProtoParticle.setEjectFlag(false);
        ProtoParticle.setIonizeFlag(false);
        ProtoParticle.killAllParticles();
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
