import logo from './logo.svg';
import './App.css';
import React from 'react';
import ReactDOM from "react-dom";

const canvas_height = '600';
const canvas_width = '940';

/**
 * Mapping layers via constants
 * These should always be used to reference layers when used as parameters to a function or when interacting with this.state.
 * This allows us to easily add and remove layers.
 */
const base = 0; // ctx0 // scene[base]
const heat = 1; // ctx1 // scene[heat]
const gas = 2; // ctx2 // scene[gas]
const plasma = 3; // ctx3 // scene[plasma]
const keeper = 4; // ctx4 // scene[keeper]
const eject = 5; // ctx5 // scene[eject]

function App() {
  return (
      <div>
          <div id={"canvasHolder"}>
              <LandingPage id={"LandingPage"}/>
          </div>
      </div>
//>>>>>>> master
  );
}



export default App;

/**
 * Site landing page element
 * Should be rendered inside a <div id={"canvasHolder"}>
 */
class LandingPage extends React.Component {
    constructor(props) {
        super();

        // create a reference to the canvas element
        this.canvas = React.createRef()
    }

    /**
     * componentDidMount()
     * Called when canvas element is mounted on page (canvas element is unusable up until this point)
     */
    componentDidMount() {
        this.ctx = this.canvas.current.getContext('2d'); // grab the canvas element

        this.LearningMode_HandleClick = this.LearningMode_HandleClick.bind(this);
        this.PresMode_HandleClick = this.PresMode_HandleClick.bind(this);

        // draw some test text
        this.draw_test();
    }

    draw_test(){
        // draw text
        this.ctx.font = "30px Arial";
        this.ctx.fillStyle = 'rgb(255,255,255)';
        this.ctx.fillText("Landing Page", canvas_width/2, canvas_height/2);
    }

    /**
     * LearningMode_HandleClick()
     * Onclick handler for the learning mode button on the landing page
     */
    LearningMode_HandleClick() {

        // render learning mode
        ReactDOM.render(
            <div id={"canvasHolder"}>
                <LearningMode id={"LearningMode"} deltastage={0} scene={[true,false,false,false,false,false]}/>
            </div>,
            document.getElementById('root')
        );
    }

    /**
     * PresMode_HandleClick()
     * Onclick handler for the learning mode button on the landing page
     */
    PresMode_HandleClick() {

        // render learning mode
        ReactDOM.render(
            <div id={"canvasHolder"}>
                <PresMode id={"presMode"} deltastage={0} scene={[true,false,false,false,false,false]}/>
            </div>,
            document.getElementById('root')
        );
    }

    render() {
        return (
            <>
                <canvas id={"canvas"} className={"canvas"} ref={this.canvas} width={canvas_width} height={canvas_height}> You need a better browser :( </canvas>
                <button id={"LearningModeButton"} onClick={this.LearningMode_HandleClick} height="auto" width="auto"> Learning Mode </button>
                <button id={"PresModeButton"} onClick={this.PresMode_HandleClick}> Presentation Mode </button>
            </>
        )
    }
}

/**
 * Learning mode element
 * Should be rendered inside a <div id={"canvasHolder"}>
 * also with props: id={"LearningMode"} deltastage={base} scene={[true,false,false,false,false,false]}
 */
class LearningMode extends React.Component {
    // Instance variables:
    // (all essentially cosmetic) (created in constructor)
    deltastage;
    scene;
    canvas;
    layers; // layers[base = 0, heat = 1, gas = 2, plasma = 3, keeper = 4, eject = 5]; //layers = [ctx0, ctx1, ctx2, ctx3, ctx4, ctx5];

    constructor(props){
        super() // I don't understand what this line does - Jack

        // initialize canvas instance variables
        this.canvas0 = React.createRef();                              //// 1 - create ref
        this.canvas1 = React.createRef();
        this.canvas2 = React.createRef();
        this.canvas3 = React.createRef();
        this.canvas4 = React.createRef();
        this.canvas5 = React.createRef();

        // bind handler function(s)
        this.HeatInsertToggle_HandleClick = this.HeatInsertToggle_HandleClick.bind(this);
        this.GasFeedToggle_HandleClick = this.GasFeedToggle_HandleClick.bind(this);
        this.KeeperElectrodeToggle_HandleClick = this.KeeperElectrodeToggle_HandleClick.bind(this);
        this.nextButton_plasma_HandleClick = this.nextButton_plasma_HandleClick.bind(this);
        this.nextButton_eject_HandleClick = this.nextButton_eject_HandleClick.bind(this);

        // initialize state
        this.state = { deltastage: props.deltastage, scene: props.scene };


        // console.log("   constructor:: this.state.scene", this.state.scene); //note: scene is defined here. //:debug
        // console.log("   constructor:: this.deltastage", this.deltastage); //note: deltastage is undefined here for some reason? //:debug

    }

    /**
     * componentDidMount()
     * Called when canvas element is mounted on page (canvas element is unusable up until this point)
     */
    componentDidMount() {

        // initialize instance variables for each canvas element/layer
        const ctx0 = this.canvas0.current.getContext('2d'); // base = 0;
        const ctx1 = this.canvas1.current.getContext('2d'); // heat = 1;
        const ctx2 = this.canvas2.current.getContext('2d'); // gas = 2;
        const ctx3 = this.canvas3.current.getContext('2d'); // plasma = 3;
        const ctx4 = this.canvas4.current.getContext('2d'); // keeper = 4;
        const ctx5 = this.canvas5.current.getContext('2d'); // eject = 5;

        this.layers = [ctx0, ctx1, ctx2, ctx3, ctx4, ctx5];
        //      layers[base = 0, heat = 1, gas = 2, plasma = 3, keeper = 4, eject = 5];

        this.scenarioRefresh();
    }

    /**
     * scenarioRefresh()
     *
     * Populates the canvas based on the current state, is hopefully called whenever a change is made (ex: the onClick functions)
     * You can see the end of this function as the end of the current update/iteration.
     */
    scenarioRefresh() {
        console.log("LearningMode.scenarioRefresh() called") //:debug

        console.log("   scenarioRefresh:: this.state.deltastage", this.state.deltastage); //:debug
        console.log("   scenarioRefresh:: this.state.scene", this.state.scene); //:debug

        // Execute logic based on deltastage and scene

        // if basedrawing is active
        if(this.state.scene[base] === true){
            this.draw_baseDrawing();

            // if the user just toggled basedrawing
            if(this.state.deltastage === base || this.state.deltastage === undefined){
                this.draw_baseDrawing_guide();
            }
        }
        else if (this.state.deltastage === base){
            // the user deselected this option/layer
            this.clearCanvas(this.state.deltastage);
        }

        // if heat insert is active
        if(this.state.scene[heat] === true){
            this.draw_csv_Heat_Insert();

            // if the user just toggled heat insert
            if(this.state.deltastage === heat){
                this.draw_csv_Heat_Insert_guide();
            }
        }
        else if (this.state.deltastage === heat){
            // the user deselected this option/layer
            this.clearCanvas(this.state.deltastage);
        }

        // if gas feed is active
        if(this.state.scene[gas] === true){
            this.draw_csv_gas_feed();

            // if the user just toggled the gas feed
            if(this.state.deltastage === gas){
                this.draw_csv_gas_feed_guide();
            }
        }
        else if (this.state.deltastage === gas){
            // the user deselected this option/layer
            this.clearCanvas(this.state.deltastage);
        }

        // if internal plasma is true
        if(this.state.scene[plasma] === true){
            this.draw_csv_internal_plasma();

            // if the user just triggered the internal plasma
            if(this.state.deltastage === plasma){
                this.draw_csv_internal_plasma_guide();
            }
        }
        else if (this.state.deltastage === plasma){
            // the user deselected this option/layer
            this.clearCanvas(this.state.deltastage);
        }

        // SPECIAL CASE [trigger internal plasma] LOGIC
        if ((this.state.scene[heat] === true) && (this.state.scene[gas] === true)){
            if ((this.state.deltastage === heat) || (this.state.deltastage === gas)){
                console.log("   scenarioRefresh:: SPECIAL CASE: [Internal Plasma] TRIGGERED", this.state.deltastage, this.state.scene[heat], this.state.scene[gas]); //:debug
                ReactDOM.render(
                    <button id={"nextButton"} onClick={this.nextButton_plasma_HandleClick}> Next </button>,
                    document.getElementById('toggleButtonGroup')
                );
            }
        }

        // if keeper electrode is active
        if(this.state.scene[keeper] === true){
            this.draw_csv_keeper_electrode();

            // if the user just toggled the keeper electrode
            if(this.state.deltastage === keeper){
                this.draw_csv_keeper_electrode_guide();
            }
        }
        else if (this.state.deltastage === keeper){
            // the user deselected this option/layer
            this.clearCanvas(this.state.deltastage);
        }

        // if eject plasma is true
        if(this.state.scene[eject] === true){
            this.draw_csv_eject_plasma();

            // if the user just triggered eject plasma
            if(this.state.deltastage === eject){
                this.draw_csv_eject_plasma_guide();
            }
        }
        else if (this.state.deltastage === eject){
            // the user deselected this option/layer
            this.clearCanvas(this.state.deltastage);
        }

        // SPECIAL CASE [trigger eject plasma] LOGIC
        if ((this.state.scene[heat] === true) && (this.state.scene[gas] === true)){
            // Todo questionable logic, oddly enough, not checking for keeper here^ makes the model more accurate
            if (this.state.deltastage === keeper){
                // Todo not super solid logic^
                console.log("   scenarioRefresh:: SPECIAL CASE: [Eject Plasma] TRIGGERED", this.state.deltastage, this.state.scene); //:debug
                ReactDOM.render(
                    <button id={"nextButton"} onClick={this.nextButton_eject_HandleClick}> Next </button>,
                    document.getElementById('toggleButtonGroup')
                );
            }
        }

        //TODO add one more for the 'finished' state where the controls disappear but do it better

        // source: https://stackoverflow.com/questions/53897673/check-if-all-values-in-array-are-true-then-return-a-true-boolean-statement-jav
        let checker = arr => arr.every(v => v === true);
        if(checker(this.state.scene)){
            ReactDOM.render(<></>, document.getElementById('toggleButtonGroup'));
        }

        console.log("-----------------------------scenarioRefresh (end)-----------------------------"); //:debug
    }

    /**
     * HeatInsertToggle_HandleClick()
     * Onclick handler for the heat insert toggle button
     */
    HeatInsertToggle_HandleClick() {
        let newScene = this.state.scene;
        newScene[heat] = !newScene[heat];

        // change the current state, refresh scenario in callback to synchronously update the visuals after the state has changed
        this.setState((state, props) => {
            return { deltastage: heat, scene: newScene };
        }, () => {this.scenarioRefresh()});

        // WARNING: code past setState will not be synchronously executed
    }

    /**
     * GasFeedToggle_HandleClick()
     * Onclick handler for the gas feed toggle button
     */
    GasFeedToggle_HandleClick() {
        let newScene = this.state.scene;
        newScene[gas] = !newScene[gas];

        // change the current state, refresh scenario in callback to synchronously update the visuals after the state has changed
        this.setState((state, props) => {
            return { deltastage: gas, scene: newScene };
        }, () => {this.scenarioRefresh()});

        // WARNING: code past setState will not be synchronously executed
    }

    /**
     * KeeperElectrodeToggle_HandleClick()
     * Onclick handler for the keeper electrode toggle button
     */
    KeeperElectrodeToggle_HandleClick() {
        let newScene = this.state.scene;
        newScene[keeper] = !newScene[keeper];

        // change the current state, refresh scenario in callback to synchronously update the visuals after the state has changed
        this.setState((state, props) => {
            return { deltastage: keeper, scene: newScene };
        }, () => {this.scenarioRefresh()});

        // WARNING: code past setState will not be synchronously executed
    }

    /**
     * nextButton_plasma_HandleClick()
     * Onclick handler for the "next" button for the internal plasma scene, updates the state and DOM via appropriate logic
     */
    nextButton_plasma_HandleClick() {
        let newScene = this.state.scene;
        newScene[plasma] = true;


        // update DOM buttons (replace next with toggles)
        ReactDOM.render(
            <>
                <button id={"KeeperElectrodeToggle"} onClick={this.KeeperElectrodeToggle_HandleClick}> Keeper Electrode </button>
                <button id={"GasFeedToggle"} onClick={this.GasFeedToggle_HandleClick}> Gas Feed </button>
                <button id={"HeatInsertToggle"} onClick={this.HeatInsertToggle_HandleClick}> Heat Inserts </button>
            </>,
            document.getElementById('toggleButtonGroup')
        );

        console.log("   nextButton_plasma_HandleClick:: this.state.deltastage", this.state.deltastage); //:debug
        console.log("   nextButton_plasma_HandleClick:: this.state.scene", this.state.scene); //:debug

        // change the current state, refresh scenario in callback to synchronously update the visuals after the state has changed
        this.setState((state, props) => {
            return { deltastage: plasma, scene: newScene };
        }, () => {this.scenarioRefresh()});

    }

    /**
     * nextButton_eject_HandleClick()
     * Onclick handler for the "next" button for the eject plasma scene, updates the state and DOM via appropriate logic
     */
    nextButton_eject_HandleClick() {
        let newScene = this.state.scene;
        newScene[eject] = !newScene[eject];

        // update DOM buttons (replace next with toggles)
        ReactDOM.render(
            <>
                <button id={"KeeperElectrodeToggle"} onClick={this.KeeperElectrodeToggle_HandleClick}> Keeper Electrode </button>  {/*Todo undecided logic (this way of doing this stinks)*/}
                <button id={"GasFeedToggle"} onClick={this.GasFeedToggle_HandleClick}> Gas Feed </button>
                <button id={"HeatInsertToggle"} onClick={this.HeatInsertToggle_HandleClick}> Heat Inserts </button>
            </>,
            document.getElementById('toggleButtonGroup')
        );

        // change the current state, refresh scenario in callback to synchronously update the visuals after the state has changed
        this.setState((state, props) => {
            return { deltastage: eject, scene: newScene };
        }, () => {this.scenarioRefresh()});

    }

    /**
     * getLayer(layer)
     * @param layer layer number which you want to get
     * @returns ctx 2d canvas context for that layer
     */
    getLayer(layer){
        return this.layers[layer];
        // switch (layer) {
        //     case base: return this.ctx0;
        //     case heat: return this.ctx1;
        //     case gas: return this.ctx2;
        //     case keeper: return this.ctx3;
        //     default: console.error("LearningMode.getLayer:: invalid layer provided: ", layer); return null;
        // }
    }


    /**
     * clearCanvas(layer)
     * Clears contents of a given canvas layer
     *
     * @param layer layer to clear
     */
    clearCanvas(layer){
        this.getLayer(layer).clearRect(0, 0, canvas_width, canvas_height);
    }

    /**
     * draw_baseDrawing()
     * Function to draw the base cathode visuals (currently only draws a red square)
     */
    draw_baseDrawing(){
        console.log(base ," draw_baseDrawing called") //:debug

        this.clearCanvas(base);
        const ctx = this.getLayer(base);

        // draw rectangle
        ctx.fillStyle = 'rgba(255,0,0,0.5)'; //set the pen color
        ctx.fillRect(200, 400, 200, 200) //draw a filled in rectangle
    }

    /**
     * draw_baseDrawing_guide()
     * Draws the guide text and tooltips and such for the base drawing for learning mode
     */
    draw_baseDrawing_guide(){
        // console.log(base, " draw_baseDrawing_guide called") //:debug

        // this.clearCanvas(base);
        const ctx = this.getLayer(base);

        // draw text
        ctx.save();
        ctx.font = "30px Arial";
        ctx.fillStyle = 'rgb(255,255,255)';
        ctx.fillText("Base Drawing", canvas_width/2, canvas_height/2 - 60);
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
        ctx.fillText("Heat Insert", canvas_width/2, canvas_height/2 - 30);
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
        ctx.fillText("Internal Plasma", canvas_width/2, canvas_height/2 + 30);
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
        ctx.fillText("Keeper Electrode", canvas_width/2, canvas_height/2 + 30);
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
        ctx.fillText("Eject Plasma", canvas_width/2 + 100, canvas_height/2 - 30);
        ctx.restore();
    }


    render(){
        // console.log("LearningMode.render called") //:debug
        return (
            <>
                <canvas id={"canvas0"} ref={this.canvas0} width={canvas_width} height={canvas_height} deltastage={this.state.deltastage} scene={this.state.scene} > You need a better browser :( </canvas>
                <canvas id={"canvas1"} ref={this.canvas1} width={canvas_width} height={canvas_height} deltastage={this.state.deltastage} scene={this.state.scene} > You need a better browser :( </canvas>
                <canvas id={"canvas2"} ref={this.canvas2} width={canvas_width} height={canvas_height} deltastage={this.state.deltastage} scene={this.state.scene} > You need a better browser :( </canvas>
                <canvas id={"canvas3"} ref={this.canvas3} width={canvas_width} height={canvas_height} deltastage={this.state.deltastage} scene={this.state.scene} > You need a better browser :( </canvas>
                <canvas id={"canvas4"} ref={this.canvas4} width={canvas_width} height={canvas_height} deltastage={this.state.deltastage} scene={this.state.scene} > You need a better browser :( </canvas>
                <canvas id={"canvas5"} ref={this.canvas5} width={canvas_width} height={canvas_height} deltastage={this.state.deltastage} scene={this.state.scene} > You need a better browser :( </canvas>
                <div id={"toggleButtonGroup"}>
                    <button id={"KeeperElectrodeToggle"} onClick={this.KeeperElectrodeToggle_HandleClick}> Keeper Electrode </button>
                    <button id={"GasFeedToggle"} onClick={this.GasFeedToggle_HandleClick}> Gas Feed </button>
                    <button id={"HeatInsertToggle"} onClick={this.HeatInsertToggle_HandleClick}> Heat Inserts </button>
                </div>
            </>
        ) //// 2 - attach ref to node via ref = this.canvas#
    }
}

/**
 * Presentation mode element
 * Should be rendered inside a <div id={"canvasHolder"}>
 * also with props: id={"PresMode"} deltastage={base} scene={[true,false,false,false,false,false]}
 */
class PresMode extends React.Component {
    // Instance variables:
    // (all basically cosmetic) (created in constructor)
    deltastage;
    scene;
    canvas;
    layers; // layers[base = 0, heat = 1, gas = 2, plasma = 3, keeper = 4, eject = 5]; //layers = [ctx0, ctx1, ctx2, ctx3, ctx4, ctx5];

    constructor(props){
        super(); // I don't understand what this line does - Jack

        // initialize canvas instance variables
        this.canvas0 = React.createRef();                              //// 1 - create ref
        this.canvas1 = React.createRef();
        this.canvas2 = React.createRef();
        this.canvas3 = React.createRef();
        this.canvas4 = React.createRef();
        this.canvas5 = React.createRef();

        // bind handler function(s)
        this.nextButton_HandleClick = this.nextButton_HandleClick.bind(this);

        // initialize state
        this.state = { deltastage: props.deltastage, scene: props.scene };

    }

    /**
     * componentDidMount()
     * Called when canvas element is mounted on page (canvas element is unusable up until this point)
     */
    componentDidMount() {

        // initialize instance variables for each canvas element/layer
        const ctx0 = this.canvas0.current.getContext('2d'); // base = 0;
        const ctx1 = this.canvas1.current.getContext('2d'); // heat = 1;
        const ctx2 = this.canvas2.current.getContext('2d'); // gas = 2;
        const ctx3 = this.canvas3.current.getContext('2d'); // plasma = 3;
        const ctx4 = this.canvas4.current.getContext('2d'); // keeper = 4;
        const ctx5 = this.canvas5.current.getContext('2d'); // eject = 5;

        this.layers = [ctx0, ctx1, ctx2, ctx3, ctx4, ctx5];
        //      layers[base = 0, heat = 1, gas = 2, plasma = 3, keeper = 4, eject = 5];

        this.scenarioRefresh();
    }

    /**
     * scenarioRefresh()
     *
     * Populates the canvas based on the current state, is hopefully called whenever a change is made (ex: the onClick functions)
     * You can see the end of this function as the end of the current update/iteration.
     */
    scenarioRefresh() {
        console.log("PresMode.scenarioRefresh() called"); //:debug

        console.log("   scenarioRefresh:: this.state.deltastage", this.state.deltastage); //:debug
        console.log("   scenarioRefresh:: this.state.scene", this.state.scene); //:debug

        // clear all drawings if the user just entered presentation mode or it looped back to the beginning
        if(this.state.scene[base] === true && this.state.scene[heat] === false){
            // clear every layer
            for (let i = base; i < this.state.scene.length; i++) {
                this.clearCanvas(i);
            }
        }

        // if basedrawing is active
        if(this.state.scene[base] === true){
            this.draw_baseDrawing();
        }

        // if heat insert is active
        if(this.state.scene[heat] === true){
            this.draw_csv_Heat_Insert();
        }

        // if gas feed is active
        if(this.state.scene[gas] === true){
            this.draw_csv_gas_feed();
        }

        // if internal plasma is active
        if(this.state.scene[plasma] === true){
            this.draw_csv_internal_plasma();
        }

        // if keeper electrode is active
        if(this.state.scene[keeper] === true){
            this.draw_csv_keeper_electrode();
        }

        // if eject plasma is active
        if(this.state.scene[eject] === true){
            this.draw_csv_eject_plasma();
        }

        console.log("-----------------------------scenarioRefresh (end)-----------------------------"); //:debug
    }

    /**
     * nextButton_HandleClick()
     * Onclick handler for the "next" button, updates the state via appropriate logic
     */
    nextButton_HandleClick() {
        let newdeltastage = this.state.deltastage;
        let newscene = this.state.scene;

        // update the state
        if(this.state.deltastage === this.state.scene.length - 1){
            // special case: loop to beginning         note: this loop intentionally starts at 1 instead of zero
            for (let i = 1; i < this.state.scene.length; i++) {
                newdeltastage = base;
                newscene[i] = false;
            }
        } else {
            // normal case: move to next animation stage
            for (let i = 1; i < this.state.scene.length; i++) {
                if(this.state.scene[i] === false){
                    newdeltastage = i;
                    newscene = this.state.scene;
                    newscene[i] = true;
                    break;
                }
            }
        }


        // change the current state, refresh scenario in callback to synchronously update the visuals after the state has changed
        this.setState((state, props) => {
            return { deltastage: newdeltastage, scene: newscene };
        }, () => {this.scenarioRefresh()});

        // WARNING: code past setState will not be synchronously executed
    }

    /**
     * getLayer(layer)
     * @param layer layer number which you want to get
     * @returns ctx 2d canvas context for that layer
     */
    getLayer(layer){
        return this.layers[layer];
        // switch (layer) {
        //     case base: return this.ctx0;
        //     case heat: return this.ctx1;
        //     case gas: return this.ctx2;
        //     case keeper: return this.ctx3;
        //     default: console.error("LearningMode.getLayer:: invalid layer provided: ", layer); return null;
        // }
    }

    /**
     * clearCanvas(layer)
     * Clears contents of a given canvas layer
     *
     * @param layer layer to clear
     */
    clearCanvas(layer){
        this.getLayer(layer).clearRect(0, 0, canvas_width, canvas_height);
    }

    /**
     * draw_baseDrawing()
     * Function to draw the base cathode visuals (currently only draws a red square)
     */
    draw_baseDrawing(){
        console.log(base, " draw_baseDrawing called") //:debug

        this.clearCanvas(base);
        const ctx = this.getLayer(base);

        // draw rectangle
        ctx.fillStyle = 'rgba(255,0,0,0.5)'; //set the pen color
        ctx.fillRect(200, 400, 200, 200) //draw a filled in rectangle


        // // draw text
        // ctx.save();
        // ctx.font = "30px Arial";
        // ctx.fillStyle = 'rgb(255,255,255)';
        // ctx.fillText("Base Drawing", canvas_width/2, canvas_height/2 - 60);
        // ctx.restore();
    }


    /**
     * draw_csv_Heat_Insert()
     * Function to draw the heat insert visuals (currently only draws an orange square)
     */
    draw_csv_Heat_Insert(){
        console.log(heat, " draw_csv_Heat_Insert called") //:debug

        this.clearCanvas(heat);
        const ctx = this.getLayer(heat);

        // draw rectangle
        ctx.fillStyle = 'rgba(255,136,0,0.5)';
        ctx.fillRect(300, 400, 200, 200);


        // // draw text
        // ctx.save();
        // ctx.font = "30px Arial";
        // ctx.fillStyle = 'rgb(255,255,255)';
        // ctx.fillText("Heat Insert", canvas_width/2, canvas_height/2 - 30);
        // ctx.restore();
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


        // // draw text
        // ctx.save();
        // ctx.font = "30px Arial";
        // ctx.fillStyle = 'rgb(255,255,255)';
        // ctx.fillText("Gas Feed", canvas_width/2, canvas_height/2);
        // ctx.restore();
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

        // // draw text
        // ctx.save();
        // ctx.font = "30px Arial";
        // ctx.fillStyle = 'rgb(255,255,255)';
        // ctx.fillText("Internal Plasma", canvas_width/2, canvas_height/2 + 30);
        // ctx.restore();
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


        // // draw text
        // ctx.save();
        // ctx.font = "30px Arial";
        // ctx.fillStyle = 'rgb(255,255,255)';
        // ctx.fillText("Keeper Electrode", canvas_width/2, canvas_height/2 + 30);
        // ctx.restore();
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

        // // draw text
        // ctx.save();
        // ctx.font = "30px Arial";
        // ctx.fillStyle = 'rgb(255,255,255)';
        // ctx.fillText("Eject Plasma", canvas_width/2 + 100, canvas_height/2 - 30);
        // ctx.restore();
    }

    render(){
        console.log("PresMode.render called") //:debug
        return (
            <>
                <canvas id={"canvas0"} ref={this.canvas0} width={canvas_width} height={canvas_height} deltastage={this.state.deltastage} scene={this.state.scene} > You need a better browser :( </canvas>
                <canvas id={"canvas1"} ref={this.canvas1} width={canvas_width} height={canvas_height} deltastage={this.state.deltastage} scene={this.state.scene} > You need a better browser :( </canvas>
                <canvas id={"canvas2"} ref={this.canvas2} width={canvas_width} height={canvas_height} deltastage={this.state.deltastage} scene={this.state.scene} > You need a better browser :( </canvas>
                <canvas id={"canvas3"} ref={this.canvas3} width={canvas_width} height={canvas_height} deltastage={this.state.deltastage} scene={this.state.scene} > You need a better browser :( </canvas>
                <canvas id={"canvas4"} ref={this.canvas4} width={canvas_width} height={canvas_height} deltastage={this.state.deltastage} scene={this.state.scene} > You need a better browser :( </canvas>
                <canvas id={"canvas5"} ref={this.canvas5} width={canvas_width} height={canvas_height} deltastage={this.state.deltastage} scene={this.state.scene} > You need a better browser :( </canvas>
                <button id={"nextButton"} onClick={this.nextButton_HandleClick}> Next </button>
            </>
        ) //// 2 - attach ref to node via ref = this.canvas#
    }
}