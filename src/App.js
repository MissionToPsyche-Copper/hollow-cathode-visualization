import logo from './logo.svg';
import './App.css';
import React from 'react';

// primary coding style:
function Welcome(props) {
  switch (props.name) {
    case "Jake": return <h1>Hello {props.name} Smith!</h1>;
    case "Jack": return <h1>Hello {props.name} Blicha!</h1>;
    case "Huy": return <h1>Hello {props.name} Tran!</h1>;
    default: return <h1>Hello {props.name}!</h1>;
  }
}
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
            <Welcome name={"Jack"}/>
            <Welcome name={"World"}/>
            <Welcome name={"Jake"}/>
            <img src={logo} className="App-logo" alt="logo" />
            <a className="App-link" href="https://reactjs.org" target="_blank" rel="noopener noreferrer">
                Learn React
            </a>
            <p>testing paragraph</p>
            <ul>
                <li>testing list items</li>
                <li>testing list items</li>
                <li>testing list items</li>
                <li>testing list items</li>
            </ul>
        </header>
    </div>
  );
}

export default App;
