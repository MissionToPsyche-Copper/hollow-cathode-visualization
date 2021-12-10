import React from "react";
import ReactDOM from "react-dom";
import Painter from "../Painter/painter";
import LandingPage from "../LandingPage/landing";

const base = 0; // ctx0 // scene[base]
const heat = 1; // ctx1 // scene[heat]
const gas = 2; // ctx2 // scene[gas]
const plasma = 3; // ctx3 // scene[plasma]
const keeper = 4; // ctx4 // scene[keeper]
const eject = 5; // ctx5 // scene[eject]

export default class LearningMode extends React.Component {
    // Instance variables:
    // (all essentially cosmetic) (created in constructor)
    deltastage;
    scene;
    canvas;
    layers; // layers[base = 0, heat = 1, gas = 2, plasma = 3, keeper = 4, eject = 5]; //layers = [ctx0, ctx1, ctx2, ctx3, ctx4, ctx5];
    painter;
    canvas_height='600';
    canvas_width='940';

    constructor(props){
        super();
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
        this.painter = new Painter(this.layers, this.canvas_height, this.canvas_width);
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
            this.painter.draw_csv_Base_Drawing()
            // if the user just toggled basedrawing
            if(this.state.deltastage === base || this.state.deltastage === undefined){
                this.painter.draw_csv_Base_Drawing_guide();
            }
        }
        else if (this.state.deltastage === base){
            // the user deselected this option/layer
            this.painter.clearCanvas(this.state.deltastage);
        }

        // if heat insert is active
        if(this.state.scene[heat] === true){
            this.painter.draw_csv_Heat_Insert();

            // if the user just toggled heat insert
            if(this.state.deltastage === heat){
                this.painter.draw_csv_Heat_Insert_guide();
            }
        }
        else if (this.state.deltastage === heat){
            // the user deselected this option/layer
            this.painter.clearCanvas(this.state.deltastage);
        }

        // if gas feed is active
        if(this.state.scene[gas] === true){
            this.painter.draw_csv_gas_feed();

            // if the user just toggled the gas feed
            if(this.state.deltastage === gas){
                this.painter.draw_csv_gas_feed_guide();
            }
        }
        else if (this.state.deltastage === gas){
            // the user deselected this option/layer
            this.painter.clearCanvas(this.state.deltastage);
        }

        // if internal plasma is true
        if(this.state.scene[heat] & this.state.scene[gas] === true){
            this.painter.draw_csv_internal_plasma();

            // if the user just triggered the internal plasma
            if(this.state.deltastage === plasma){
                this.painter.draw_csv_internal_plasma_guide();
            }
        }
        else if (this.state.scene[plasma]===false && this.state.deltastage===plasma){
            // the user deselected this option/layer
            this.painter.clearCanvas(plasma);
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
            this.painter.draw_csv_keeper_electrode();

            // if the user just toggled the keeper electrode
            if(this.state.deltastage === keeper){
                this.painter.draw_csv_keeper_electrode_guide();
            }
        }
        else if (this.state.deltastage === keeper){
            // the user deselected this option/layer
            this.painter.clearCanvas(this.state.deltastage);
        }

        // if eject plasma is true
        if(this.state.scene[eject] === true){
            this.painter.draw_csv_eject_plasma();

            // if the user just triggered eject plasma
            if(this.state.deltastage === eject){
                this.painter.draw_csv_eject_plasma_guide();
            }
        }
        else if (this.state.deltastage === eject){
            // the user deselected this option/layer
            this.painter.clearCanvas(this.state.deltastage);
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
        if(newScene[heat]===false){
            newScene[plasma] = false
            this.painter.clearCanvas(plasma)
            newScene[eject]=false
            this.painter.clearCanvas(eject)
        }
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
        if(newScene[gas]===false){
            newScene[plasma] = false
            this.painter.clearCanvas(plasma)
            newScene[eject]=false
            this.painter.clearCanvas(eject)
        }
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
        if(newScene[keeper]===false){
            newScene[eject] = false
            this.painter.clearCanvas(eject)
        }
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
     * backButton_HandleClick()
     * Onclick handler for the "back" button, reloads the landing page
     */
    backButton_HandleClick() {
        // render learning mode
        ReactDOM.render(
            <div id={"canvasHolder"}>
                <LandingPage id={"landingPage"} canvas_height={'600'} canvas_width={'940'}/>
            </div>,
            document.getElementById('root')
        );
    }


    render(){
        // console.log("LearningMode.render called") //:debug
        return (
            <>
                <canvas id={"canvas0"} ref={this.canvas0} width={this.canvas_width} height={this.canvas_height} deltastage={this.state.deltastage} scene={this.state.scene} > You need a better browser :( </canvas>
                <canvas id={"canvas1"} ref={this.canvas1} width={this.canvas_width} height={this.canvas_height} deltastage={this.state.deltastage} scene={this.state.scene} > You need a better browser :( </canvas>
                <canvas id={"canvas2"} ref={this.canvas2} width={this.canvas_width} height={this.canvas_height} deltastage={this.state.deltastage} scene={this.state.scene} > You need a better browser :( </canvas>
                <canvas id={"canvas3"} ref={this.canvas3} width={this.canvas_width} height={this.canvas_height} deltastage={this.state.deltastage} scene={this.state.scene} > You need a better browser :( </canvas>
                <canvas id={"canvas4"} ref={this.canvas4} width={this.canvas_width} height={this.canvas_height} deltastage={this.state.deltastage} scene={this.state.scene} > You need a better browser :( </canvas>
                <canvas id={"canvas5"} ref={this.canvas5} width={this.canvas_width} height={this.canvas_height} deltastage={this.state.deltastage} scene={this.state.scene} > You need a better browser :( </canvas>
                <button id={"backButton"} onClick={this.backButton_HandleClick}> Back to Landing Page </button>
                <div id={"toggleButtonGroup"}>
                    <button id={"KeeperElectrodeToggle"} onClick={this.KeeperElectrodeToggle_HandleClick}> Keeper Electrode </button>
                    <button id={"GasFeedToggle"} onClick={this.GasFeedToggle_HandleClick}> Gas Feed </button>
                    <button id={"HeatInsertToggle"} onClick={this.HeatInsertToggle_HandleClick}> Heat Inserts </button>
                </div>
            </>
        ) //// 2 - attach ref to node via ref = this.canvas#
    }
}