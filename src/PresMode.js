import React from "react";
import ReactDOM from "react-dom";

import LandingPage from "./LandingPage.js";
import Painter from "./Painter";

/**
 * Mapping layers via constants
 * These should always be used to reference layers when used as parameters to a function or when interacting with this.state.
 * This allows us to easily add and remove layers.
 */
import {
    base,
    eject,
    gas,
    heat,
    keeper,
    plasma
} from "./Galactic";
import ProtoParticle from "./ProtoParticle";
import {Link} from "react-router-dom";


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
    painter;
    static isAuto = false;

    constructor(props){
        super();

        // initialize canvas instance variables
        this.canvas0 = React.createRef();                              //// 1 - create ref
        this.canvas1 = React.createRef();
        this.canvas2 = React.createRef();
        this.canvas3 = React.createRef();
        this.canvas4 = React.createRef();
        this.canvas5 = React.createRef();

        this.canvas6 = React.createRef();   //Hall Thruster OFF
        this.canvas7 = React.createRef();   //Hall Thruster ON

        // bind handler function(s)
        this.nextButton_HandleClick = this.nextButton_HandleClick.bind(this);
        this.autoToggleButton_HandleClick = this.autoToggleButton_HandleClick.bind(this)

        //sets ID of the autonomous interval to an used value by default
        this.autoID = 0
        this.delay = 5000

        // initialize state
        this.state = { deltastage: props.deltastage, scene: props.scene };

        this.state.canvas_height = document.getElementById("page-container").clientHeight;
        this.state.canvas_width = document.getElementById("page-container").clientWidth;
    }

    /**
     * componentDidMount()
     * Called when canvas element is mounted on page (canvas element is unusable up until this point)
     */
    componentDidMount() {
        // an attempted fix for reloading breaking pages
        // if(this.state.canvas_width === 0 || this.state.canvas_height === 0){
        //     this.state.canvas_height = document.getElementById("page-container").clientHeight;
        //     this.state.canvas_width = document.getElementById("page-container").clientWidth;
        // }

        // initialize instance variables for each canvas element/layer
        const ctx0 = this.canvas0.current.getContext('2d'); // base = 0;
        const ctx1 = this.canvas1.current.getContext('2d'); // heat = 1;
        const ctx2 = this.canvas2.current.getContext('2d'); // gas = 2;
        const ctx3 = this.canvas3.current.getContext('2d'); // plasma = 3;
        const ctx4 = this.canvas4.current.getContext('2d'); // keeper = 4;
        const ctx5 = this.canvas5.current.getContext('2d'); // eject = 5;
        const ctx6 = this.canvas6.current.getContext('2d'); // Hall Thruster OFF = 6;
        const ctx7 = this.canvas7.current.getContext('2d'); // Hall Thruster ON = 7;

        this.layers = [ctx0, ctx1, ctx2, ctx3, ctx4, ctx5, ctx6, ctx7];
        //      layers[base = 0, heat = 1, gas = 2, plasma = 3, keeper = 4, eject = 5, thruster off = 6, thruster on = 7];
        this.painter = new Painter(this.layers);
        this.scenarioRefresh();
        PresMode.isAuto= false;
    }



    /**
     * scenarioRefresh()
     *
     * Populates the canvas based on the current state, is hopefully called whenever a change is made (ex: the onClick functions)
     * You can see the end of this function as the end of the current update/iteration.
     */
    scenarioRefresh() {
        // console.log("PresMode.scenarioRefresh() called"); //:debug

        // console.log("   scenarioRefresh:: this.state.deltastage", this.state.deltastage); //:debug
        // console.log("   scenarioRefresh:: this.state.scene", this.state.scene); //:debug
        // clear all drawings if the user just entered presentation mode or it looped back to the beginning
        if (this.state.scene[base] === true && this.state.scene[heat] === false) {
            // clear every layer, and all particles, and all generators
            this.painter.killProtoParticle();
            for (let i = base; i < this.state.scene.length; i++) {
                this.painter.clearCanvas(i);
            }
        }

        // if basedrawing is active
        if (this.state.scene[base] === true) {
            //this.draw_csv_Base_Drawing();

            //draw base cathode
            this.painter.draw_csv_Base_Drawing();
        }

        // if heat insert is active
        if (this.state.scene[heat] === true) {
            this.painter.draw_csv_Heat_Insert();
        }

        // if gas feed is active
        if (this.state.scene[gas] === true) {
            this.painter.draw_csv_gas_feed();
        }

        // if internal plasma is active
        if (this.state.scene[plasma] === true) {
            this.painter.draw_csv_internal_plasma();
        }

        // if keeper electrode is active
        if (this.state.scene[keeper] === true) {
            this.painter.draw_csv_keeper_electrode();
        }

        // if eject plasma is active
        if (this.state.scene[eject] === true) {
            this.painter.draw_csv_eject_plasma();
        }

        // console.log("-----------------------------scenarioRefresh (end)-----------------------------"); //:debug
    }

    /**
     * nextButton_HandleClick()
     * Onclick handler for the "next" button, updates the state via appropriate logic
     */
    nextButton_HandleClick() {
        let newdeltastage = this.state.deltastage;
        let newscene = this.state.scene;

        // update the state, currently does not show hall thruster information, and skips those steps entirely by design
        if(this.state.deltastage === this.state.scene.length - 3){
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
     * backButton_HandleClick()
     * Onclick handler for the "back" button, reloads the landing page
     */
    // backButton_HandleClick() {
    //     // render learning mode
    //     ReactDOM.render(
    //         <div id={"canvasHolder"}>
    //             <LandingPage id={"landingPage"}/>
    //         </div>,
    //         document.getElementById('root')
    //     );
    // }

    /**
     * autoToggleButton_HandleClick()
     * Onclick handler for the "Autonomous/Manual" button, starts the looping progress
     */
    autoToggleButton_HandleClick() {
        PresMode.isAuto = !PresMode.isAuto;
        console.log(PresMode.isAuto);
        if(PresMode.isAuto){
            //when in auto mode, the next button is hidden, but the handler function for 'next' is run every this.delay (currently 5000) milliseconds
            document.getElementById("nextButton").style.visibility = 'hidden'
            this.autoID = setInterval(()=>{this.nextButton_HandleClick()}, this.delay)
        }
        else{
            //when out of auto mode, the interval is stopped, and the 'next' button is returned
            document.getElementById("nextButton").style.visibility = 'visible'
            clearInterval(this.autoID)
        }
    }

    render(){
        return (
            <div id={'canvasHolder'}>
                <canvas id={"canvas0"} ref={this.canvas0} className={"canvas"} width={this.state.canvas_width} height={this.state.canvas_height} deltastage={this.state.deltastage} scene={this.state.scene} > You need a better browser :( </canvas>
                <canvas id={"canvas1"} ref={this.canvas1} className={"canvas"} width={this.state.canvas_width} height={this.state.canvas_height} deltastage={this.state.deltastage} scene={this.state.scene} > You need a better browser :( </canvas>
                <canvas id={"canvas2"} ref={this.canvas2} className={"canvas"} width={this.state.canvas_width} height={this.state.canvas_height} deltastage={this.state.deltastage} scene={this.state.scene} > You need a better browser :( </canvas>
                <canvas id={"canvas3"} ref={this.canvas3} className={"canvas"} width={this.state.canvas_width} height={this.state.canvas_height} deltastage={this.state.deltastage} scene={this.state.scene} > You need a better browser :( </canvas>
                <canvas id={"canvas4"} ref={this.canvas4} className={"canvas"} width={this.state.canvas_width} height={this.state.canvas_height} deltastage={this.state.deltastage} scene={this.state.scene} > You need a better browser :( </canvas>
                <canvas id={"canvas5"} ref={this.canvas5} className={"canvas"} width={this.state.canvas_width} height={this.state.canvas_height} deltastage={this.state.deltastage} scene={this.state.scene} > You need a better browser :( </canvas>
                <canvas id={"canvas6"} ref={this.canvas6} className={"canvas"} width={this.state.canvas_width} height={this.state.canvas_height} deltastage={this.state.deltastage} scene={this.state.scene} > You need a better browser :( </canvas>
                <canvas id={"canvas7"} ref={this.canvas7} className={"canvas"} width={this.state.canvas_width} height={this.state.canvas_height} deltastage={this.state.deltastage} scene={this.state.scene} > You need a better browser :( </canvas>

                <div className={"stackedButtonGroup bottomleftAlign"}>
                    <Link to={'/hollow-cathode-visualization/'}>
                        <button id={"backButton"} className={"button"}> Back to Landing Page </button>
                    </Link>
                    <button id={"autoToggleButton"} className={"button"} onClick={this.autoToggleButton_HandleClick}> Toggle Mode </button>
                </div>
                <div className={"stackedButtonGroup bottomrightAlign"}>
                    <button id={"nextButton"} className={"button"} onClick={this.nextButton_HandleClick}> Next </button>
                </div>
            </div>
        ) //// 2 - attach ref to node via ref = this.canvas#
    }
}

export default PresMode;