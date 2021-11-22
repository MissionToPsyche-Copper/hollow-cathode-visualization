import logo from './logo.svg';
import './App.css';
import React from 'react';
import ReactDOM from "react-dom";


var canvas_height = 750;
var canvas_width = 1600;

function App() {
  return (
    <div id={"canvasHolder"}>
        <CanvasExampleWithButton id={"CanvasExampleWithButton"} deltastage={0} scene={[true,false,false,false]}/>
    </div>
  );
}

export default App;


// this element has it's own canvas element stored
class CanvasExampleWithButton extends React.Component {
    // Instance variables:
    // (all basically cosmetic) (created in constructor)
    deltastage;
    scene;
    canvas;
    ctx0; //canvas layer 0 - base drawing
    ctx1; //canvas layer 1 - inserts
    ctx2; //canvas layer 2 - gas feed
    ctx3; //canvas layer 3 - keeper electrode

    constructor(props){
        super() // I don't understand what this line does - Jack
        // console.log("CanvasExample.constructor() called") //:debug

        // initialize canvas instance variables
        this.canvas0 = React.createRef()                              //// 1 - create ref
        this.canvas1 = React.createRef()                              //// 1 - create ref
        this.canvas2 = React.createRef()                              //// 1 - create ref
        this.canvas3 = React.createRef()                              //// 1 - create ref

        // bind handler function(s)
        this.HeatInsertToggle_HandleClick = this.HeatInsertToggle_HandleClick.bind(this);
        this.GasFeedToggle_HandleClick = this.GasFeedToggle_HandleClick.bind(this);
        this.KeeperElectrodeToggle_HandleClick = this.KeeperElectrodeToggle_HandleClick.bind(this);

        // initialize instance variables
        this.state = { deltastage: props.deltastage, scene: props.scene };





        // console.log("   constructor:: this.state.scene", this.state.scene)
        // console.log("   constructor:: this.deltastage", this.deltastage) //note: deltastage is undefined here for some reason?

        // misc items for testing and learning
        // TODO get rid of these
        this.myReq = -1;
    }

    /**
     * componentDidMount()
     * Called when canvas element is mounted on page (canvas element is unusable up until this point)
     */
    componentDidMount() {
        // console.log("CanvasExample.componentDidMount() called") //:debug

        // console.log("   componentDidMount:: this.state.scene", this.state.scene);
        // console.log("   componentDidMount:: this.state.deltastage", this.state.deltastage); //note: deltastage is no longer undefined by now

        this.ctx0 = this.canvas0.current.getContext('2d');
        this.ctx1 = this.canvas1.current.getContext('2d');
        this.ctx2 = this.canvas2.current.getContext('2d');
        this.ctx3 = this.canvas3.current.getContext('2d');

        this.scenarioRefresh();
    }

    /**
     * scenarioRefresh()
     *
     * Populates the canvas based on the current state, is hopefully called whenever a change is made (ex: the onClick functions)
     * You can see the end of this function as the end of the current update/iteration.
     */
    scenarioRefresh() {
        console.log("CanvasExample.scenarioRefresh() called") //:debug

        console.log("   scenarioRefresh:: this.state.deltastage", this.state.deltastage); //:debug
        console.log("   scenarioRefresh:: this.state.scene", this.state.scene); //:debug

        // Execute logic based on deltastage and scene
        if(this.state.scene[0] === true){
            this.draw_baseDrawing();

            if(this.state.deltastage === 0 || this.state.deltastage === undefined){
                this.draw_baseDrawing_guide();
            }
        }
        else if (this.state.deltastage === 0){
            // the use deselected this option/layer
            this.clearCanvas(this.state.deltastage);
        }

        if(this.state.scene[1] === true){
            this.draw_csv_Heat_Insert();

            if(this.state.deltastage === 1){
                this.draw_csv_Heat_Insert_guide();
            }
        }
        else if (this.state.deltastage === 1){
            // the use deselected this option/layer
            this.clearCanvas(this.state.deltastage);
        }

        if(this.state.scene[2] === true){
            this.draw_csv_gas_feed();

            if(this.state.deltastage === 2){
                this.draw_csv_gas_feed_guide();
            }
        }
        else if (this.state.deltastage === 2){
            // the use deselected this option/layer
            this.clearCanvas(this.state.deltastage);
        }


        if(this.state.scene[3] === true){
            this.draw_csv_keeper_electrode();

            if(this.state.deltastage === 3){
                this.draw_csv_keeper_electrode_guide();
            }
        }
        else if (this.state.deltastage === 3){
            // the use deselected this option/layer
            this.clearCanvas(this.state.deltastage);
        }

        console.log("-------------------------------------------scenarioRefresh (end)-------------------------------------------------------")
    }

    /**
     * HeatInsertToggle_HandleClick()
     * Onclick handler for the heat insert toggle button
     */
    HeatInsertToggle_HandleClick() {
        console.log("CanvasExample.HeatInsertToggle_HandleClick()")


        // change the current state, refresh scenario in callback to synchronously update the visuals after the state has changed
        this.setState((state, props) => {
            return { deltastage: 1, scene: [state.scene[0], !state.scene[1], state.scene[2], state.scene[3]] };
        }, () => {this.scenarioRefresh()});

        // WARNING: code past setState will not be synchronously executed
    }

    /**
     * GasFeedToggle_HandleClick()
     * Onclick handler for the gas feed toggle button
     */
    GasFeedToggle_HandleClick() {
        console.log("CanvasExample.GasFeedToggle_HandleClick")

        // change the current state, refresh scenario in callback to synchronously update the visuals after the state has changed
        this.setState((state, props) => {
            return { deltastage: 2, scene: [state.scene[0], state.scene[1], !state.scene[2], state.scene[3]] };
        }, () => {this.scenarioRefresh()});

        // WARNING: code past setState will not be synchronously executed
    }

    /**
     * KeeperElectrodeToggle_HandleClick()
     * Onclick handler for the keeper electrode toggle button
     */
    KeeperElectrodeToggle_HandleClick() {
        console.log("CanvasExample.KeeperElectrodeToggle_HandleClick()")

        // change the current state, refresh scenario in callback to synchronously update the visuals after the state has changed
        this.setState((state, props) => {
            return { deltastage: 3, scene: [state.scene[0], state.scene[1], state.scene[2], !state.scene[3]] };
        }, () => {this.scenarioRefresh()});

        // WARNING: code past setState will not be synchronously executed
    }

    /**
     * clearCanvas(layer)
     * Clears contents of a given canvas layer
     *
     * @param layer layer to clear
     */
    clearCanvas(layer){
        console.log("----clearing layer " + layer) //:debug

        switch (layer) {
            case 0: this.ctx0.clearRect(0, 0, canvas_width, canvas_height); break;
            case 1: this.ctx1.clearRect(0, 0, canvas_width, canvas_height); break;
            case 2: this.ctx2.clearRect(0, 0, canvas_width, canvas_height); break;
            case 3: this.ctx3.clearRect(0, 0, canvas_width, canvas_height); break;
            default: console.error("clearCanvas(layer): Invalid layer = " + layer); return;
        }
    }

    /**
     * draw_baseDrawing()
     * Function to draw the base cathode (currently only draws a gray square)
     */
    draw_baseDrawing(){
        console.log("0 draw_baseDrawing called") //:debug

        // check if this layer is already drawn
        // if(this.state.scene[this.state.deltastage] === false){
        //     console.log("CanvasExample.draw_baseDrawing should not be drawn")
        //     return null;
        // }

        this.clearCanvas(0);

        // draw rectangle
        this.ctx0.fillStyle = 'rgba(255,255,255,0.4)'; //set the pen color
        this.ctx0.fillRect(200, 400, 200, 200) //draw a filled in rectangle


        // console.log("-------------------------------------------draw_baseDrawing (end)-------------------------------------------------------")
    }

    /**
     * draw_baseDrawing_guide()
     * Draws the guide text and tooltips and such for the base drawing for learning mode
     */
    draw_baseDrawing_guide(){
        console.log("0 draw_baseDrawing_guide called") //:debug

        // this.clearCanvas(0);

        // draw text
        this.ctx0.save();
        this.ctx0.font = "30px Arial";
        this.ctx0.fillStyle = 'rgb(255,255,255)';
        this.ctx0.fillText("Base Drawing", canvas_width/2, canvas_height/2 - 60);
        this.ctx0.restore();
    }

    /**
     * draw_csv_Heat_Insert()
     * Currently draws a dark grey square along with the text "Heat Insert"
     */
    draw_csv_Heat_Insert(){
        console.log("1 draw_csv_Heat_Insert called") //:debug

        // check if this layer is already drawn
        // if(this.state.scene[this.state.deltastage] === false){
        //     console.log("CanvasExample.draw_csv_Heat_Insert should not be drawn")
        //     return null;
        // }

        this.clearCanvas(1);

        // draw rectangle
        this.ctx1.fillStyle = 'rgba(63,63,63,0.4)';
        this.ctx1.fillRect(300, 400, 200, 200);



        // console.log("-------------------------------------------draw_csv_Heat_Insert (end)-------------------------------------------------------"); //:debug
    }

    /**
     * draw_csv_Heat_Insert_guide()
     * Draws the guide text and tooltips and such for the draw_csv_Heat_Insert for learning mode
     */
    draw_csv_Heat_Insert_guide(){
        console.log("1 draw_csv_Heat_Insert_guide called") //:debug

        // this.clearCanvas(1);

        // draw text
        this.ctx1.save();
        this.ctx1.font = "30px Arial";
        this.ctx1.fillStyle = 'rgb(255,255,255)';
        this.ctx1.fillText("Heat Insert", canvas_width/2, canvas_height/2 - 30);
        this.ctx1.restore();
    }


    draw_csv_gas_feed(){
        console.log("2 draw_csv_gas_feed called"); //:debug


        this.clearCanvas(2);

        // draw rectangle
        this.ctx2.fillStyle = 'rgba(31,100,84,0.65)';
        this.ctx2.fillRect(400, 400, 200, 200);


        // console.log("-------------------------------------------draw_csv_gas_feed (end)-------------------------------------------------------"); //:debug
    }

    /**
     * draw_csv_gas_feed_guide()
     * Draws the guide text and tooltips and such for the draw_csv_gas_feed for learning mode
     */
    draw_csv_gas_feed_guide(){
        console.log("2 draw_csv_gas_feed_guide called"); //:debug

        // this.clearCanvas(2);

        // draw text
        this.ctx2.save();
        this.ctx2.font = "30px Arial";
        this.ctx2.fillStyle = 'rgb(255,255,255)';
        this.ctx2.fillText("Gas Feed", canvas_width/2, canvas_height/2);
        this.ctx2.restore();
    }


    draw_csv_keeper_electrode(){
        console.log("3 draw_csv_keeper_electrode called"); //:debug


        this.clearCanvas(3);


        // draw rectangle
        this.ctx3.fillStyle = 'rgba(0,9,7,0.65)';
        this.ctx3.fillRect(500, 400, 200, 200);


        // console.log("-------------------------------------------draw_csv_keeper_electrode (end)-------------------------------------------------------"); //:debug
    }

    /**
     * draw_csv_keeper_electrode_guide()
     * Draws the guide text and tooltips and such for the draw_csv_keeper_electrode for learning mode
     */
    draw_csv_keeper_electrode_guide(){
        console.log("3 draw_csv_keeper_electrode_guide called"); //:debug

        // this.clearCanvas(3);

        // draw text
        this.ctx3.save();
        this.ctx3.font = "30px Arial";
        this.ctx3.fillStyle = 'rgb(255,255,255)';
        this.ctx3.fillText("Keeper Electrode", canvas_width/2, canvas_height/2 + 30);
        this.ctx3.restore();
    }


    render(){
        // console.log("CanvasExample.render called") //:debug
        return (
            <>
                <canvas id={"canvas0"} ref={this.canvas0} width={canvas_width} height={canvas_height} deltastage={this.state.deltastage} scene={this.state.scene} > You need a better browser :( </canvas>
                <canvas id={"canvas1"} ref={this.canvas1} width={canvas_width} height={canvas_height} deltastage={this.state.deltastage} scene={this.state.scene} > You need a better browser :( </canvas>
                <canvas id={"canvas2"} ref={this.canvas2} width={canvas_width} height={canvas_height} deltastage={this.state.deltastage} scene={this.state.scene} > You need a better browser :( </canvas>
                <canvas id={"canvas3"} ref={this.canvas3} width={canvas_width} height={canvas_height} deltastage={this.state.deltastage} scene={this.state.scene} > You need a better browser :( </canvas>
                <button id={"KeeperElectrodeToggle"} onClick={this.KeeperElectrodeToggle_HandleClick}> Keeper Electrode </button>
                <button id={"GasFeedToggle"} onClick={this.GasFeedToggle_HandleClick}> Gas Feed </button>
                <button id={"HeatInsertToggle"} onClick={this.HeatInsertToggle_HandleClick}> Heat Inserts </button>
            </>
        ) //// 2 - attach ref to node
    }
}