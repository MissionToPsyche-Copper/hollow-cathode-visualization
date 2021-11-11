import logo from './logo.svg';
import './App.css';
import React from 'react';

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

function App() {
  return (
    <div className="App">
        <header className="App-header">
            {/*<Welcome name={"Jack"}/>*/}
            {/*<Welcome name={"World"}/>*/}
            {/*<Welcome name={"Jake"}/>*/}
            {/*<img src={logo} className="App-logo" alt="logo" />*/}
            <CanvasExample/>
            {/*<LandingPage/>*/}
            <LoggingButton/>
        </header>
    </div>
  );
}

export default App;

class LandingPage extends React.Component {
    handleClick() {
        console.log('You clicked the button, *this* button:', this);
    }

    render() {
        return (
            <div>
                <button onClick={() => this.handleClick()}>
                    Click me
                </button>
            </div>
        );
    }
}

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
    constructor(){
        console.log("CanvasExample.constructor")
        super()
        this.currentStage = 0;
        this.canvas = React.createRef()                              //// 1 - create ref
        this.handleClick = this.handleClick.bind(this);
    }

    componentDidMount() {
        console.log("CanvasExample.componentDidMount")
        this.draw_baseDrawing()
    }

    draw_baseDrawing(){
        console.log("CanvasExample.draw_baseDrawing")
        this.currentStage = 1;
        const ctx = this.canvas.current.getContext('2d')     //// 3 - access node using .current

        ctx.fillStyle = 'rgba(255,255,255,0.4)';
        ctx.fillRect(200, 400, 200, 200)
        var myLogo = new Image();
        myLogo.src = logo;
        ctx.drawImage(myLogo, -60, -60); //draw logo
        ctx.save();
    }

    handleClick() {
        console.log("CanvasExample.handleClick")
        switch (this.currentStage) {
            // case 2: this.draw_csv...();
            case 2: this.draw_csv2(); break;
            case 1: this.draw_csv1(); break;
            case 0: this.draw_baseDrawing(); break;
            default: console.error("currentStage === weird"); break;
        }
    }

    draw_csv1(){
        console.log("CanvasExample.draw_csv1")
        this.currentStage = 2;
        const ctx = this.canvas.current.getContext('2d');

        ctx.fillStyle = 'rgba(63,63,63,0.4)';
        ctx.fillRect(300, 400, 200, 200);
    }

    draw_csv2(){
        this.currentStage = 3;
        console.log("CanvasExample.draw_csv2");
        const ctx = this.canvas.current.getContext('2d');

        ctx.fillStyle = 'rgba(83,220,183,0.4)';
        ctx.fillRect(400, 400, 200, 200);
    }


    render(){
        console.log("CanvasExample.render")
        return (
            <div>
                <canvas ref={this.canvas} width={1600} height={750} onClick={this.handleClick}> You need a better browser :( </canvas>      {/*//// 2 - attach ref to node}*/}
            </div>
        )
    }
}
