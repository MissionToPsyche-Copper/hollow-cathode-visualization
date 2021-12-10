import React from "react";
import ReactDOM from "react-dom";
import Painter from '../Painter/painter'
import LandingPage from "../LandingPage/landing";

const base = 0; // ctx0 // scene[base]
const heat = 1; // ctx1 // scene[heat]
const gas = 2; // ctx2 // scene[gas]
const plasma = 3; // ctx3 // scene[plasma]
const keeper = 4; // ctx4 // scene[keeper]
const eject = 5; // ctx5 // scene[eject]

export default class PresMode extends React.Component {
    // Instance variables:
    // (all basically cosmetic) (created in constructor)
    deltastage;
    scene;
    canvas;
    layers; // layers[base = 0, heat = 1, gas = 2, plasma = 3, keeper = 4, eject = 5]; //layers = [ctx0, ctx1, ctx2, ctx3, ctx4, ctx5];
    painter;
    canvas_height='600';
    canvas_width='940';
    constructor(props){
        super();
        this.base_cathode = new Image();
        this.painter = new Painter();
        this.base_cathode.src = "/images/base_cathode.png";
        this.canvas_height=props.canvas_height;
        this.canvas_width=props.canvas_width;
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
        console.log("PresMode.scenarioRefresh() called"); //:debug

        console.log("   scenarioRefresh:: this.state.deltastage", this.state.deltastage); //:debug
        console.log("   scenarioRefresh:: this.state.scene", this.state.scene); //:debug

        // clear all drawings if the user just entered presentation mode or it looped back to the beginning
        if(this.state.scene[base] === true && this.state.scene[heat] === false){
            // clear every layer
            for (let i = base; i < this.state.scene.length; i++) {
                this.painter.clearCanvas(i);
            }
        }

        // if basedrawing is active
        if(this.state.scene[base] === true){
            //this.draw_csv_Base_Drawing();

            //draw base cathode
            this.painter.draw_csv_Base_Drawing();
        }

        // if heat insert is active
        if(this.state.scene[heat] === true){
            this.painter.draw_csv_Heat_Insert();
        }

        // if gas feed is active
        if(this.state.scene[gas] === true){
            this.painter.draw_csv_gas_feed();
        }

        // if internal plasma is active
        if(this.state.scene[plasma] === true){
            this.painter.draw_csv_internal_plasma();
        }

        // if keeper electrode is active
        if(this.state.scene[keeper] === true){
            this.painter.draw_csv_keeper_electrode();
        }

        // if eject plasma is active
        if(this.state.scene[eject] === true){
            this.painter.draw_csv_eject_plasma();
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
        console.log("PresMode.render called") //:debug
        return (
            <>
                <canvas id={"canvas0"} ref={this.canvas0} width={this.canvas_width} height={this.canvas_height} deltastage={this.state.deltastage} scene={this.state.scene} > You need a better browser :( </canvas>
                <canvas id={"canvas1"} ref={this.canvas1} width={this.canvas_width} height={this.canvas_height} deltastage={this.state.deltastage} scene={this.state.scene} > You need a better browser :( </canvas>
                <canvas id={"canvas2"} ref={this.canvas2} width={this.canvas_width} height={this.canvas_height} deltastage={this.state.deltastage} scene={this.state.scene} > You need a better browser :( </canvas>
                <canvas id={"canvas3"} ref={this.canvas3} width={this.canvas_width} height={this.canvas_height} deltastage={this.state.deltastage} scene={this.state.scene} > You need a better browser :( </canvas>
                <canvas id={"canvas4"} ref={this.canvas4} width={this.canvas_width} height={this.canvas_height} deltastage={this.state.deltastage} scene={this.state.scene} > You need a better browser :( </canvas>
                <canvas id={"canvas5"} ref={this.canvas5} width={this.canvas_width} height={this.canvas_height} deltastage={this.state.deltastage} scene={this.state.scene} > You need a better browser :( </canvas>
                <button id={"backButton"} onClick={this.backButton_HandleClick}> Back to Landing Page </button>
                <button id={"nextButton"} onClick={this.nextButton_HandleClick}> Next </button>
            </>
        ) //// 2 - attach ref to node via ref = this.canvas#
    }
}