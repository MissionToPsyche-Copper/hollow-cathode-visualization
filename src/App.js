import logo from './logo.svg';
import './App.css';
import React from 'react';


var canvas_height = 750;
var canvas_width = 1600;

function App() {
  return (
    <div className="App">
        <header className="App-header">
            <CanvasExample/>
            <LoggingButton/>
        </header>
    </div>
  );
}

export default App;


class LoggingButton extends React.Component {
    handleClick() {
        console.log('You clicked the button, *this* button:', this);
    }

    render() {
        // This syntax ensures `this` is bound within handleClick // (comment from online guide, idk what he is talking about)
        return (
            <button id={"myButton"} onClick={() => this.handleClick()}>
                Click me
            </button>
        );
    }
}

// this element has it's own canvas element stored
class CanvasExample extends React.Component {
    currentStage; //optional (Created in constructor anyways)
    scene; //optional
    canvas; // optional

    constructor(){
        console.log("CanvasExample.constructor")
        super() // I don't understand what this line does - Jack
        // initialize canvas instance variable
        this.canvas = React.createRef()                              //// 1 - create ref

        // bind handler function(s)
        this.handleClick = this.handleClick.bind(this);
        this.draw_csv_gas_feed = this.draw_csv_gas_feed.bind(this);

        // initialize instance variables
        this.currentStage = 0;
        this.scene = [false, false, false, false, false, false];

        // misc items for testing and learning
        this.moon = new Image();
        this.moon.src = 'moon.png';
        // this.firstRun = true;
        this.myReq = 0;
    }

    // Called when canvas element is mounted on page
    componentDidMount() {
        console.log("CanvasExample.componentDidMount")
        // this.draw_baseDrawing()
    }

    // onclick handler for the canvas element itself
    handleClick() {
        console.log("CanvasExample.handleClick")
        switch (this.currentStage) {
            // case #: this.draw_csv...();
            case 4: this.scene[this.currentStage] = true; this.currentStage = 0; this.clearCanvas(); break; // (stop the moon)
            case 3: this.scene[this.currentStage] = true; this.currentStage = 4; cancelAnimationFrame(this.myReq); break; // (stop the moon)
            case 2: this.scene[this.currentStage] = true; this.currentStage = 3; this.draw_csv_gas_feed(); break; // (start the moon)
            case 1: this.scene[this.currentStage] = true; this.currentStage = 2; this.draw_csv_Heat_Insert(); break;
            case 0: this.scene[this.currentStage] = true; this.currentStage = 1; this.draw_baseDrawing(); break;
            default: console.error("currentStage === weird"); break;
        }
    }

    // clears all drawings from the canvas
    clearCanvas(){
        this.scene = [false, false, false, false, false, false]; // reset the scenes
        console.log("CanvasExample.clearCanvas")
        if(this.scene[this.currentStage] === true){
            console.log("CanvasExample.clearCanvas should not be drawn");
            return null;
        }

        const ctx = this.canvas.current.getContext('2d');     //// 3 - access node using .current
        ctx.clearRect(0,0,1600,750); //clear the canvas
    }

    draw_baseDrawing(){
        console.log("CanvasExample.draw_baseDrawing")
        if(this.scene[this.currentStage] === true){
            console.log("CanvasExample.draw_baseDrawing should not be drawn")
            return null;
        }

        const ctx = this.canvas.current.getContext('2d')     //// 3 - access node using .current

        ctx.fillStyle = 'rgba(255,255,255,0.4)';
        ctx.fillRect(200, 400, 200, 200)
        var myLogo = new Image();
        myLogo.src = logo;
        ctx.drawImage(myLogo, -60, -60); //draw logo
        ctx.save();
    }

    draw_csv_Heat_Insert(){
        console.log("CanvasExample.draw_csv_Heat_Insert")
        if(this.scene[this.currentStage] === true){
            console.log("CanvasExample.draw_csv_Heat_Insert should not be drawn")
            return null;
        }

        const ctx = this.canvas.current.getContext('2d');

        ctx.fillStyle = 'rgba(63,63,63,0.4)';
        ctx.fillRect(300, 400, 200, 200);
    }

    draw_csv_gas_feed(){
        console.log("CanvasExample.draw_csv_gas_feed");
        if(this.scene[this.currentStage] === true){
            console.log("CanvasExample.draw_csv_gas_feed should not be drawn")
            return null;
        }

        const ctx = this.canvas.current.getContext('2d');

        // ctx.clearRect(0, 0, 1000, 1000);

        ctx.save(); // push earth (layer 010) to the stack so now it is orbital ring on bottom, earth on top
            ctx.translate(450, 450)
            ctx.clearRect(-50, -50, 100,100)

            // Moon ---------- layer 001
            let time = new Date();
            ctx.rotate(((2 * Math.PI) / 6) * time.getSeconds() + ((2 * Math.PI) / 6000) * time.getMilliseconds()); // rotate moon around earth
            // ((2 * Math.PI) / 6000) * time.getMilliseconds() // makes it rotate just 1/4th of the way
            // ((2 * Math.PI) / 6) * time.getSeconds() + //chooses where that 1/4th rotation starts on an interval
            ctx.translate(0, 28.5);
            // if (this.firstRun === true){
                ctx.drawImage(this.moon, 10, 10);
            //     this.firstRun = false;
            // }

        ctx.restore(); // leave the moon layer so that only the moon layer spins (restore layer (010)

        ctx.fillStyle = 'rgba(31,100,84,0.65)';
        ctx.fillRect(400, 400, 200, 200);

        // request the browser draws/runs this whole function
        this.myReq = window.requestAnimationFrame(this.draw_csv_gas_feed);
    }

    draw_csv_keeper_electrode(){
        console.log("CanvasExample.draw_csv_gas_feed");
        if(this.scene[this.currentStage] === true){
            console.log("CanvasExample.draw_csv_gas_feed should not be drawn")
            return null;
        }

        const ctx = this.canvas.current.getContext('2d');

        // ctx.clearRect(0, 0, 1000, 1000);

        ctx.save(); // push earth (layer 010) to the stack so now it is orbital ring on bottom, earth on top
        ctx.translate(450, 450)
        ctx.clearRect(-50, -50, 100,100)

        // Moon ---------- layer 001
        let time = new Date();
        ctx.rotate(((2 * Math.PI) / 6) * time.getSeconds() + ((2 * Math.PI) / 6000) * time.getMilliseconds()); // rotate moon around earth
        // ((2 * Math.PI) / 6000) * time.getMilliseconds() // makes it rotate just 1/4th of the way
        // ((2 * Math.PI) / 6) * time.getSeconds() + //chooses where that 1/4th rotation starts on an interval
        ctx.translate(0, 28.5);
        // if (this.firstRun === true){
        ctx.drawImage(this.moon, 10, 10);
        // this.firstRun = false;
        // }

        ctx.restore(); // leave the moon layer so that only the moon layer spins (restore layer (010)

        ctx.fillStyle = 'rgba(31,100,84,0.65)';
        ctx.fillRect(400, 400, 200, 200);

        // request the browser draws/runs this whole function
        this.myReq = window.requestAnimationFrame(this.draw_csv_gas_feed);
    }


    render(){
        console.log("CanvasExample.render")
        return (
            <div>
                <canvas ref={this.canvas} width={canvas_width} height={canvas_height} onClick={this.handleClick}> You need a better browser :( </canvas>      {/*//// 2 - attach ref to node}*/}
            </div>
        )
    }
}








// // primary coding style:
// function Welcome(props) {
//   switch (props.name) {
//     case "Jake": return <h1>Hello {props.name} Smith!</h1>;
//     case "Jack": return <h1>Hello {props.name} Blicha!</h1>;
//     case "Huy": return <h1>Hello {props.name} Tran!</h1>;
//     default: return <h1>Hello {props.name}!</h1>;
//   }
// }
// // alternative: ES6 class
// class Welcome extends React.Component {
//     render() {
//         switch (this.props.name) {
//             case "Jake": return <h1>Hello {this.props.name} Smith!</h1>;
//             case "Jack": return <h1>Hello {this.props.name} Blicha!</h1>;
//             case "Huy": return <h1>Hello {this.props.name} Tran!</h1>;
//             default: return <h1>Hello {this.props.name}!</h1>;
//         }
//     }
// }