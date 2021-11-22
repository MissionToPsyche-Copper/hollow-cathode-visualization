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
    deltastage; //optional (Created in constructor anyways)
    scene; //optional
    canvas; // optional

    constructor(props){
        super() // I don't understand what this line does - Jack
        console.log("CanvasExample.constructor() called")

        // initialize canvas instance variables
        this.canvas = React.createRef()                              //// 1 - create ref

        // bind handler function(s)
        this.HeatInsertToggle_HandleClick = this.HeatInsertToggle_HandleClick.bind(this);
        this.GasFeedToggle_HandleClick = this.GasFeedToggle_HandleClick.bind(this);
        this.KeeperElectrodeToggle_HandleClick = this.KeeperElectrodeToggle_HandleClick.bind(this);

        // initialize instance variables
        this.state = { deltastage: props.deltastage, scene: props.scene };



        console.log("   constructor:: this.state.scene", this.state.scene)
        console.log("   constructor:: this.deltastage", this.deltastage)

        // misc items for testing and learning
        this.moon = new Image();
        this.moon.src = 'moon.png';
    }

    /**
     * componentDidMount()
     * Called when canvas element is mounted on page (canvas element is unusable up until this point)
     */
    componentDidMount() {
        console.log("CanvasExample.componentDidMount() called")

        console.log("   componentDidMount:: this.state.deltastage", this.state.deltastage);
        console.log("   componentDidMount:: this.state.scene", this.state.scene);

        this.scenarioRefresh();
    }

    /**
     * scenarioRefresh()
     *
     * Populates the canvas based on the current state, is hopefully called whenever a change is made (ex: the onClick functions)
     * You can see the end of this function as the end of the current update/iteration.
     */
    scenarioRefresh() {
        console.log("CanvasExample.scenarioRefresh() called")

        console.log("   scenarioRefresh:: this.state.deltastage", this.state.deltastage);
        console.log("   scenarioRefresh:: this.state.scene", this.state.scene);

        //do logic based on deltastage and scene
        if(this.state.scene[0] === true){
            this.draw_baseDrawing();
            if(this.state.deltastage === 0 || this.state.deltastage === undefined){
                this.draw_baseDrawing_guide();
            }
        }
        if(this.state.scene[1] === true){
            this.draw_csv_Heat_Insert();
            if(this.state.deltastage === 1){
                this.draw_csv_Heat_Insert_guide();
            }
        }
        if(this.state.scene[2] === true){
            this.draw_csv_gas_feed();
            if(this.state.deltastage === 2){
                this.draw_csv_gas_feed_guide();
            }
        }
        if(this.state.scene[3] === true){
            this.draw_csv_keeper_electrode();
            if(this.state.deltastage === 3){
                this.draw_csv_keeper_electrode_guide();
            }
        }

        console.log("-------------------------------------------scenarioRefresh (end)-------------------------------------------------------")
    }

    /**
     * HeatInsertToggle_HandleClick()
     * Onclick handler for the heat insert toggle button
     */
    HeatInsertToggle_HandleClick() {
        console.log("CanvasExample.HeatInsertToggle_HandleClick()")


        // change the current state, scenarioRefresh() as a callback ensures the system synchronously calls scenarioRefresh AFTER the state has been updated
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

        // change the current state, scenarioRefresh() as a callback ensures the system synchronously calls scenarioRefresh AFTER the state has been updated
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

        // change the current state, scenarioRefresh() as a callback ensures the system synchronously calls scenarioRefresh AFTER the state has been updated
        this.setState((state, props) => {
            return { deltastage: 3, scene: [state.scene[0], state.scene[1], state.scene[2], !state.scene[3]] };
        }, () => {this.scenarioRefresh()});

        // WARNING: code past setState will not be synchronously executed
    }

    // /**
    //  * clearCanvas
    //  * Clears all drawings from the canvas.
    //  */
    // clearCanvas(){
    //     this.scene = [false, false, false, false]; // reset the scenes
    //     console.log("CanvasExample.clearCanvas")
    //     if(this.scene[this.deltastage] === true){
    //         console.log("CanvasExample.clearCanvas should not be drawn");
    //         return null;
    //     }
    //
    //     const ctx = this.canvas.current.getContext('2d');
    //     ctx.clearRect(0,0,1600,750); //clear the canvas
    // }

    /**
     * draw_baseDrawing()
     * Function to draw the base cathode (currently only draws a gray square)
     */
    draw_baseDrawing(){
        console.log("draw_baseDrawing called")

        // check if this layer is already drawn
        // if(this.state.scene[this.state.deltastage] === false){
        //     console.log("CanvasExample.draw_baseDrawing should not be drawn")
        //     return null;
        // }

        const ctx = this.canvas.current.getContext('2d'); //ctx = the canvas element from react

        // draw rectangle
        ctx.fillStyle = 'rgba(255,255,255,0.4)'; //set the pen color
        ctx.fillRect(200, 400, 200, 200) //draw a filled in rectangle

        // draw the react logo image
        // var myLogo = new Image();
        // myLogo.src = logo;
        // ctx.drawImage(myLogo, -60, -60); //draw react logo image
        // ctx.save();


        // console.log("-------------------------------------------draw_baseDrawing (end)-------------------------------------------------------")
    }

    /**
     * draw_baseDrawing_guide()
     * Draws the guide text and tooltips and such for the base drawing for learning mode
     */
    draw_baseDrawing_guide(){
        console.log("draw_baseDrawing called")

        const ctx = this.canvas.current.getContext('2d'); //ctx = the canvas element from react

        // draw text
        ctx.save();
        ctx.font = "30px Arial";
        ctx.fillStyle = 'rgb(255,255,255)';
        ctx.fillText("Base Drawing", canvas_width/2, canvas_height/2 - 60);
        ctx.restore();
    }

    /**
     * draw_csv_Heat_Insert()
     * Currently draws a dark grey square along with the text "Heat Insert"
     */
    draw_csv_Heat_Insert(){
        console.log("draw_csv_Heat_Insert called")

        // check if this layer is already drawn
        // if(this.state.scene[this.state.deltastage] === false){
        //     console.log("CanvasExample.draw_csv_Heat_Insert should not be drawn")
        //     return null;
        // }

        const ctx = this.canvas.current.getContext('2d');

        // draw rectangle
        ctx.fillStyle = 'rgba(63,63,63,0.4)';
        ctx.fillRect(300, 400, 200, 200);



        // console.log("-------------------------------------------draw_csv_Heat_Insert (end)-------------------------------------------------------")
    }

    /**
     * draw_csv_Heat_Insert_guide()
     * Draws the guide text and tooltips and such for the draw_csv_Heat_Insert for learning mode
     */
    draw_csv_Heat_Insert_guide(){
        console.log("draw_csv_Heat_Insert_guide called")

        const ctx = this.canvas.current.getContext('2d'); //ctx = the canvas element from react

        // draw text
        ctx.save();
        ctx.font = "30px Arial";
        ctx.fillStyle = 'rgb(255,255,255)';
        ctx.fillText("Heat Insert", canvas_width/2, canvas_height/2 - 30);
        ctx.restore();
    }


    draw_csv_gas_feed(){
        console.log("draw_csv_gas_feed called");

        // check if this layer is already drawn
        // if(this.scene[this.deltastage] === false){
        //     console.log("CanvasExample.draw_csv_gas_feed should not be drawn")
        //     return null;
        // }

        const ctx = this.canvas.current.getContext('2d');

        // // ctx.clearRect(0, 0, 1000, 1000);
        //
        // ctx.save(); // push earth (layer 010) to the stack so now it is orbital ring on bottom, earth on top
        // ctx.translate(450, 450)
        // ctx.clearRect(-50, -50, 100,100)
        //
        // // Moon ---------- layer 001
        // let time = new Date();
        // ctx.rotate(((2 * Math.PI) / 6) * time.getSeconds() + ((2 * Math.PI) / 6000) * time.getMilliseconds()); // rotate moon around earth
        // // ((2 * Math.PI) / 6000) * time.getMilliseconds() // makes it rotate just 1/4th of the way
        // // ((2 * Math.PI) / 6) * time.getSeconds() + //chooses where that 1/4th rotation starts on an interval
        // ctx.translate(0, 28.5);
        // ctx.drawImage(this.moon, 10, 10);
        //
        // ctx.restore(); // leave the moon layer so that only the moon layer spins (restore layer (010)

        // draw rectangle
        ctx.fillStyle = 'rgba(31,100,84,0.65)';
        ctx.fillRect(400, 400, 200, 200);

        // // request the browser draws/runs this whole function
        // this.myReq = window.requestAnimationFrame(this.draw_csv_gas_feed);



        // console.log("-------------------------------------------draw_csv_gas_feed (end)-------------------------------------------------------")
    }

    /**
     * draw_csv_gas_feed_guide()
     * Draws the guide text and tooltips and such for the draw_csv_gas_feed for learning mode
     */
    draw_csv_gas_feed_guide(){
        console.log("draw_csv_gas_feed_guide called")

        const ctx = this.canvas.current.getContext('2d'); //ctx = the canvas element from react

        // draw text
        ctx.save();
        ctx.font = "30px Arial";
        ctx.fillStyle = 'rgb(255,255,255)';
        ctx.fillText("Gas Feed", canvas_width/2, canvas_height/2);
        ctx.restore();
    }


    draw_csv_keeper_electrode(){
        console.log("draw_csv_keeper_electrode called");

        // check if this layer is already drawn
        // if(this.scene[this.deltastage] === false){
        //     console.log("CanvasExample.draw_csv_keeper_electrode should not be drawn")
        //     return null;
        // }

        const ctx = this.canvas.current.getContext('2d');

        // ctx.clearRect(0, 0, 1000, 1000);

        // ctx.save(); // push earth (layer 010) to the stack so now it is orbital ring on bottom, earth on top
        // ctx.translate(450, 450)
        // ctx.clearRect(-50, -50, 100,100)
        //
        // // Moon ---------- layer 001
        // let time = new Date();
        // ctx.rotate(((2 * Math.PI) / 6) * time.getSeconds() + ((2 * Math.PI) / 6000) * time.getMilliseconds()); // rotate moon around earth
        // // ((2 * Math.PI) / 6000) * time.getMilliseconds() // makes it rotate just 1/4th of the way
        // // ((2 * Math.PI) / 6) * time.getSeconds() + //chooses where that 1/4th rotation starts on an interval
        // ctx.translate(0, 28.5);
        // ctx.drawImage(this.moon, 10, 10);
        //
        // ctx.restore(); // leave the moon layer so that only the moon layer spins (restore layer (010)

        // draw rectangle
        ctx.fillStyle = 'rgba(0,9,7,0.65)';
        ctx.fillRect(500, 400, 200, 200);

        // // request the browser draws/runs this whole function
        // this.myReq = window.requestAnimationFrame(this.draw_csv_keeper_electrode);



        // console.log("-------------------------------------------draw_csv_keeper_electrode (end)-------------------------------------------------------")
    }

    /**
     * draw_csv_keeper_electrode_guide()
     * Draws the guide text and tooltips and such for the draw_csv_keeper_electrode for learning mode
     */
    draw_csv_keeper_electrode_guide(){
        console.log("draw_csv_keeper_electrode_guide called")

        const ctx = this.canvas.current.getContext('2d'); //ctx = the canvas element from react

        // draw text
        ctx.save();
        ctx.font = "30px Arial";
        ctx.fillStyle = 'rgb(255,255,255)';
        ctx.fillText("Keeper Electrode", canvas_width/2, canvas_height/2 + 30);
        ctx.restore();
    }


    render(){
        console.log("CanvasExample.render called")
        return (
            <>
                <canvas id={"canvas"} ref={this.canvas} width={canvas_width} height={canvas_height} deltastage={this.state.deltastage} scene={this.state.scene} > You need a better browser :( </canvas>
                <button id={"HeatInsertToggle"} onClick={this.HeatInsertToggle_HandleClick}> Heat Inserts </button>
                <button id={"GasFeedToggle"} onClick={this.GasFeedToggle_HandleClick}> Gas Feed </button>
                <button id={"KeeperElectrodeToggle"} onClick={this.KeeperElectrodeToggle_HandleClick}> Keeper Electrode </button>
            </>
        ) //// 2 - attach ref to node
    }
}