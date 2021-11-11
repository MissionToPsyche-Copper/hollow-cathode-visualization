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
        this.canvas = React.createRef()                              //// 1 - create ref
    }

    componentDidMount() {
        console.log("CanvasExample.componentDidMount")
        this.baseDrawing()
    }

    baseDrawing(){
        console.log("CanvasExample.baseDrawing")
        const ctx = this.canvas.current.getContext('2d')     //// 3 - access node using .current

        var myLogo = new Image();
        myLogo.src = logo;
        ctx.drawImage(myLogo, -60, -60); //draw logo

        ctx.fillRect(300, 400, 200, 200)
    }

    render(){
        console.log("CanvasExample.render")
        return (
            <div>
                <canvas ref={this.canvas} width={1600} height={750}> You need a better browser :( </canvas>      {/*//// 2 - attach ref to node}*/}
            </div>
        )
    }
}