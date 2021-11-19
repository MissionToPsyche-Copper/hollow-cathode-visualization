import logo from './logo.svg';
import './App.css';
import React from 'react';
import ReactDOM from "react-dom";


var canvas_height = 750;
var canvas_width = 1600;

function App() {
  return (
    <div className="App">
        <header className="App-header">
            <div id={"canvasHolder"}>
                <CanvasExampleWithButton id={"CanvasExampleWithButton"} deltastage={0} scene={[true,false,false,false]}/>
            </div>
        </header>
    </div>
  );
}

export default App;

// /**
//  * LoggingButton
//  * Template button that simply logs to console when pressed
//  */
// class LoggingButton extends React.Component {
//     HeatInsertToggle_HandleClick() {
//         console.log('You clicked the button, *this* button:', this);
//     }
//
//     render() {
//         // This syntax ensures `this` is bound within HeatInsertToggle_HandleClick // (comment from online guide, idk what he is talking about)
//         return (
//             <button id={"loggingButton"} onClick={() => this.HeatInsertToggle_HandleClick()}>
//                 Click me
//             </button>
//         );
//     }
// }

// /**
//  * LearningModeButton
//  * Button element for landing page that triggers learning mode
//  */
// class LearningModeButton extends React.Component {
//
//     handleClick() {
//         console.log('You clicked the button, *this* button:', this);
//         // console.log('globalCanvas:', globalCanvas);
//
//
//         // const ctx = this.canvas.current.getContext('2d'); //ctx = the canvas element from react
//         // ctx.draw_baseDrawing()
//     }
//
//     render() {
//         // This syntax ensures `this` is bound within HeatInsertToggle_HandleClick // (comment from online guide, idk what he is talking about)
//         return (
//             <button id={"learningModeStartButton"} onClick={() => this.handleClick()}>
//                 Learning Mode
//             </button>
//         );
//     }
// }

// var globalCanvas;
//
// // this class has it's own canvas element stored
// class CanvasExample extends React.Component {
//     deltaStage; //optional (Created in constructor anyways)
//     scene; //optional
//     canvas; // optional
//
//     constructor(){
//         console.log("CanvasExample.constructor")
//         super() // I don't understand what this line does - Jack
//         // initialize canvas instance variable
//         this.canvas = React.createRef()                              //// 1 - create ref
//         globalCanvas = this.canvas                              //// 1 - create ref
//
//         // bind handler function(s)
//         this.HeatInsertToggle_HandleClick = this.HeatInsertToggle_HandleClick.bind(this);
//         this.draw_csv_gas_feed = this.draw_csv_gas_feed.bind(this);
//
//         // initialize instance variables
//         this.deltaStage = 0;
//         this.scene = [false, false, false, false, false, false];
//
//         // misc items for testing and learning
//         this.moon = new Image();
//         this.moon.src = 'moon.png';
//         // this.firstRun = true;
//         this.myReq = 0;
//     }
//
//     // Called when canvas element is mounted on page
//     componentDidMount() {
//         console.log("CanvasExample.componentDidMount")
//         // this.draw_baseDrawing()
//     }
//
//     // onclick handler for the canvas element itself
//     HeatInsertToggle_HandleClick() {
//         console.log("CanvasExample.HeatInsertToggle_HandleClick")
//         switch (this.deltaStage) {
//             // case #: this.draw_csv...();
//             case 4: this.scene[this.deltaStage] = true; this.deltaStage = 0; this.clearCanvas(); break; // (stop the moon)
//             case 3: this.scene[this.deltaStage] = true; this.deltaStage = 4; cancelAnimationFrame(this.myReq); break; // (stop the moon)
//             case 2: this.scene[this.deltaStage] = true; this.deltaStage = 3; this.draw_csv_gas_feed(); break; // (start the moon)
//             case 1: this.scene[this.deltaStage] = true; this.deltaStage = 2; this.draw_csv_Heat_Insert(); break;
//             case 0: this.scene[this.deltaStage] = true; this.deltaStage = 1; this.draw_baseDrawing(); break;
//             default: console.error("deltaStage === weird"); break;
//         }
//     }
//
//     /**
//      * clearCanvas
//      * Clears all drawings from the canvas.
//       */
//     clearCanvas(){
//         this.scene = [false, false, false, false, false, false]; // reset the scenes
//         console.log("CanvasExample.clearCanvas")
//         if(this.scene[this.deltaStage] === true){
//             console.log("CanvasExample.clearCanvas should not be drawn");
//             return null;
//         }
//
//         const ctx = this.canvas.current.getContext('2d');
//         ctx.clearRect(0,0,1600,750); //clear the canvas
//     }
//
//     /**
//      * draw_baseDrawing()
//      * Function to draw the base cathode (currently only draws a gray square)
//      * @returns {null}
//      */
//     draw_baseDrawing(){
//         console.log("CanvasExample.draw_baseDrawing")
//         if(this.scene[this.deltaStage] === true){
//             console.log("CanvasExample.draw_baseDrawing should not be drawn")
//             return null;
//         }
//
//         const ctx = this.canvas.current.getContext('2d'); //ctx = the canvas element from react
//
//         ctx.fillStyle = 'rgba(255,255,255,0.4)'; //set the pen color
//         ctx.fillRect(200, 400, 200, 200) //draw a filled in rectangle
//
//         // draw the react logo image
//         var myLogo = new Image();
//         myLogo.src = logo;
//         ctx.drawImage(myLogo, -60, -60); //draw react logo image
//         ctx.save();
//     }
//
//     draw_csv_Heat_Insert(){
//         console.log("CanvasExample.draw_csv_Heat_Insert")
//         if(this.scene[this.deltaStage] === true){
//             console.log("CanvasExample.draw_csv_Heat_Insert should not be drawn")
//             return null;
//         }
//
//         const ctx = this.canvas.current.getContext('2d');
//
//         ctx.fillStyle = 'rgba(63,63,63,0.4)';
//         ctx.fillRect(300, 400, 200, 200);
//     }
//
//     draw_csv_gas_feed(){
//         console.log("CanvasExample.draw_csv_gas_feed");
//         if(this.scene[this.deltaStage] === true){
//             console.log("CanvasExample.draw_csv_gas_feed should not be drawn")
//             return null;
//         }
//
//         const ctx = this.canvas.current.getContext('2d');
//
//         // ctx.clearRect(0, 0, 1000, 1000);
//
//         ctx.save(); // push earth (layer 010) to the stack so now it is orbital ring on bottom, earth on top
//             ctx.translate(450, 450)
//             ctx.clearRect(-50, -50, 100,100)
//
//             // Moon ---------- layer 001
//             let time = new Date();
//             ctx.rotate(((2 * Math.PI) / 6) * time.getSeconds() + ((2 * Math.PI) / 6000) * time.getMilliseconds()); // rotate moon around earth
//             // ((2 * Math.PI) / 6000) * time.getMilliseconds() // makes it rotate just 1/4th of the way
//             // ((2 * Math.PI) / 6) * time.getSeconds() + //chooses where that 1/4th rotation starts on an interval
//             ctx.translate(0, 28.5);
//                 ctx.drawImage(this.moon, 10, 10);
//
//         ctx.restore(); // leave the moon layer so that only the moon layer spins (restore layer (010)
//
//         ctx.fillStyle = 'rgba(31,100,84,0.65)';
//         ctx.fillRect(400, 400, 200, 200);
//
//         // request the browser draws/runs this whole function
//         this.myReq = window.requestAnimationFrame(this.draw_csv_gas_feed);
//     }
//
//     draw_csv_keeper_electrode(){
//         console.log("CanvasExample.draw_csv_gas_feed");
//         if(this.scene[this.deltaStage] === true){
//             console.log("CanvasExample.draw_csv_gas_feed should not be drawn")
//             return null;
//         }
//
//         const ctx = this.canvas.current.getContext('2d');
//
//         // ctx.clearRect(0, 0, 1000, 1000);
//
//         ctx.save(); // push earth (layer 010) to the stack so now it is orbital ring on bottom, earth on top
//         ctx.translate(450, 450)
//         ctx.clearRect(-50, -50, 100,100)
//
//         // Moon ---------- layer 001
//         let time = new Date();
//         ctx.rotate(((2 * Math.PI) / 6) * time.getSeconds() + ((2 * Math.PI) / 6000) * time.getMilliseconds()); // rotate moon around earth
//         // ((2 * Math.PI) / 6000) * time.getMilliseconds() // makes it rotate just 1/4th of the way
//         // ((2 * Math.PI) / 6) * time.getSeconds() + //chooses where that 1/4th rotation starts on an interval
//         ctx.translate(0, 28.5);
//         ctx.drawImage(this.moon, 10, 10);
//
//         ctx.restore(); // leave the moon layer so that only the moon layer spins (restore layer (010)
//
//         ctx.fillStyle = 'rgba(31,100,84,0.65)';
//         ctx.fillRect(400, 400, 200, 200);
//
//         // request the browser draws/runs this whole function
//         this.myReq = window.requestAnimationFrame(this.draw_csv_gas_feed);
//     }
//
//     getCanvas(){
//         return this.canvas;
//     }
//
//     render(){
//         console.log("CanvasExample.render")
//         return (
//             <canvas id={"canvas"} ref={this.canvas} width={canvas_width} height={canvas_height} onClick={this.HeatInsertToggle_HandleClick}> You need a better browser :( </canvas>
//         ) //// 2 - attach ref to node
//     }
// }


// this element has it's own canvas element stored
class CanvasExampleWithButton extends React.Component {
    deltaStage; //optional (Created in constructor anyways)
    scene; //optional
    canvas; // optional

    constructor(props){
        console.log("CanvasExample.constructor")
        super() // I don't understand what this line does - Jack

        // initialize canvas instance variables
        this.canvas = React.createRef()                              //// 1 - create ref

        // bind handler function(s)
        this.HeatInsertToggle_HandleClick = this.HeatInsertToggle_HandleClick.bind(this);
        this.GasFeedToggle_HandleClick = this.GasFeedToggle_HandleClick.bind(this);
        this.KeeperElectrodeToggle_HandleClick = this.KeeperElectrodeToggle_HandleClick.bind(this);
        // this.draw_csv_Heat_Insert = this.draw_csv_Heat_Insert.bind(this);
        // this.draw_csv_gas_feed = this.draw_csv_gas_feed.bind(this);

        // initialize instance variables
        this.deltaStage = props.deltastage;
        this.scene = props.scene;





        // this.deltaStage = 1; //delta stage
        // this.scene = [true, false, false, false];
        // this.scene = [base, inserts, gas, keeper];


        // misc items for testing and learning
        this.moon = new Image();
        this.moon.src = 'moon.png';
        // this.firstRun = true;
    }

    /**
     * componentDidMount()
     * Called when canvas element is mounted on page (canvas element is unusable up until this point)
     * Do scenario logic here
     */
    componentDidMount() {
        console.log("CanvasExample.componentDidMount")
        // this.draw_baseDrawing()

        console.log("this.deltaStage", this.deltaStage)
        console.log("this.scene", this.scene)


        //do logic based on deltaStage and scene
        if(this.scene[0] === true){
            this.draw_baseDrawing();
        }
        if(this.scene[1] === true){
            this.draw_csv_Heat_Insert();
        }
        if(this.scene[2] === true){
            this.draw_csv_gas_feed();
        }
        if(this.scene[3] === true){
            this.draw_csv_keeper_electrode();
        }
    }

    /**
     * HeatInsertToggle_HandleClick()
     * Onclick handler for the heat insert toggle button
     */
    HeatInsertToggle_HandleClick() {
        console.log("CanvasExample.HeatInsertToggle_HandleClick")
        // switch (this.deltaStage) {
        //     // case #: this.draw_csv...();
        //     case 4: this.scene[this.deltaStage] = true; this.deltaStage = 0; this.clearCanvas(); break; // (stop the moon)
        //     case 3: this.scene[this.deltaStage] = true; this.deltaStage = 4; cancelAnimationFrame(this.myReq); break; // (stop the moon)
        //     case 2: this.scene[this.deltaStage] = true; this.deltaStage = 3; this.draw_csv_gas_feed(); break; // (start the moon)
        //     case 1: this.scene[this.deltaStage] = true; this.deltaStage = 2; this.draw_csv_Heat_Insert(); break;
        //     case 0: this.scene[this.deltaStage] = true; this.deltaStage = 1; this.draw_baseDrawing(); break;
        //     default: console.error("deltaStage === weird"); break;
        // }

        // this.scene[1] = !this.scene[1];
        this.scene[1] = true;
        this.deltaStage = 1;


        // this.render();
        ReactDOM.render(
            <CanvasExampleWithButton id={"CanvasExampleWithButton"} deltastage={this.deltaStage} scene={this.scene}/>,
            document.getElementById('canvasHolder')
        );
        this.forceUpdate();
        this.setState(this.state);
    }

    /**
     * GasFeedToggle_HandleClick()
     * Onclick handler for the gas feed toggle button
     */
    GasFeedToggle_HandleClick() {
        console.log("CanvasExample.GasFeedToggle_HandleClick")

        // this.scene[2] = !this.scene[2];
        this.scene[2] = true;
        this.deltaStage = 2;


        // this.render();
        ReactDOM.render(
            <CanvasExampleWithButton id={"CanvasExampleWithButton"} deltastage={this.deltaStage} scene={this.scene}/>,
            document.getElementById('canvasHolder')
        );
        this.forceUpdate();
        this.setState(this.state);
    }

    /**
     * KeeperElectrodeToggle_HandleClick()
     * Onclick handler for the keeper electrode toggle button
     */
    KeeperElectrodeToggle_HandleClick() {
        console.log("CanvasExample.KeeperElectrodeToggle_HandleClick")

        // this.scene[3] = !this.scene[3];
        this.scene[3] = true;
        this.deltaStage = 3;


        // this.render();
        ReactDOM.render(
            <CanvasExampleWithButton id={"CanvasExampleWithButton"} deltastage={this.deltaStage} scene={this.scene}/>,
            document.getElementById('canvasHolder')
        );
        this.forceUpdate();
        this.setState(this.state);
    }

    // /**
    //  * clearCanvas
    //  * Clears all drawings from the canvas.
    //  */
    // clearCanvas(){
    //     this.scene = [false, false, false, false, false, false]; // reset the scenes
    //     console.log("CanvasExample.clearCanvas")
    //     if(this.scene[this.deltaStage] === true){
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
     * @returns {null}
     */
    draw_baseDrawing(){
        console.log("CanvasExample.draw_baseDrawing")
        if(this.scene[this.deltaStage] === false){
            console.log("CanvasExample.draw_baseDrawing should not be drawn")
            return null;
        }

        const ctx = this.canvas.current.getContext('2d'); //ctx = the canvas element from react

        ctx.fillStyle = 'rgba(255,255,255,0.4)'; //set the pen color
        ctx.fillRect(200, 400, 200, 200) //draw a filled in rectangle

        // draw the react logo image
        // var myLogo = new Image();
        // myLogo.src = logo;
        // ctx.drawImage(myLogo, -60, -60); //draw react logo image
        ctx.save();
        ctx.save();
        ctx.font = "30px Arial";
        ctx.fillStyle = 'rgb(255,255,255)';
        ctx.fillText("Base Drawing", canvas_width/2 + 200, canvas_height/2 + 200);
        ctx.restore();

        console.log("-------------------------------------------draw_baseDrawing-------------------------------------------------------")
    }

    draw_csv_Heat_Insert(){
        console.log("CanvasExample.draw_csv_Heat_Insert")
        if(this.scene[this.deltaStage] === false){
            console.log("CanvasExample.draw_csv_Heat_Insert should not be drawn")
            return null;
        }

        const ctx = this.canvas.current.getContext('2d');

        ctx.fillStyle = 'rgba(63,63,63,0.4)';
        ctx.fillRect(300, 400, 200, 200);

        ctx.save();
        ctx.font = "30px Arial";
        ctx.fillStyle = 'rgb(255,255,255)';
        ctx.fillText("Heat Insert", canvas_width/2, canvas_height/2);
        ctx.restore();

        console.log("-------------------------------------------draw_csv_Heat_Insert-------------------------------------------------------")
    }

    draw_csv_gas_feed(){
        console.log("CanvasExample.draw_csv_gas_feed");
        if(this.scene[this.deltaStage] === false){
            console.log("CanvasExample.draw_csv_gas_feed should not be drawn")
            return null;
        }

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

        ctx.fillStyle = 'rgba(31,100,84,0.65)';
        ctx.fillRect(400, 400, 200, 200);

        // // request the browser draws/runs this whole function
        // this.myReq = window.requestAnimationFrame(this.draw_csv_gas_feed);

        ctx.save();
        ctx.font = "30px Arial";
        ctx.fillStyle = 'rgb(255,255,255)';
        ctx.fillText("Gas Feed", canvas_width/2, canvas_height/2);
        ctx.restore();

        console.log("-------------------------------------------draw_csv_gas_feed-------------------------------------------------------")
    }

    draw_csv_keeper_electrode(){
        console.log("CanvasExample.draw_csv_keeper_electrode");
        if(this.scene[this.deltaStage] === false){
            console.log("CanvasExample.draw_csv_keeper_electrode should not be drawn")
            return null;
        }

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

        ctx.fillStyle = 'rgba(31,100,84,0.65)';
        ctx.fillRect(400, 400, 200, 200);

        // // request the browser draws/runs this whole function
        // this.myReq = window.requestAnimationFrame(this.draw_csv_keeper_electrode);

        ctx.save();
        ctx.font = "30px Arial";
        ctx.fillStyle = 'rgb(255,255,255)';
        ctx.fillText("Keeper Electrode", canvas_width/2, canvas_height/2 + 160);
        ctx.restore();

        console.log("-------------------------------------------draw_csv_keeper_electrode-------------------------------------------------------")
    }

    render(){
        console.log("CanvasExample.render")
        return (
            <>
                <canvas id={"canvas"} ref={this.canvas} width={canvas_width} height={canvas_height} deltastage={this.deltaStage} scene={this.scene} > You need a better browser :( </canvas>
                <button id={"HeatInsertToggle"} onClick={this.HeatInsertToggle_HandleClick}> Heat Inserts </button>
                <button id={"GasFeedToggle"} onClick={this.GasFeedToggle_HandleClick}> Gas Feed </button>
                <button id={"KeeperElectrodeToggle"} onClick={this.KeeperElectrodeToggle_HandleClick}> Keeper Electrode </button>
            </>
        ) //// 2 - attach ref to node
    }
}