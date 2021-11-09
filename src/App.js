import logo from './logo.svg';
import './App.css';

function Welcome(props) {
  switch (props.name) {
    case "Jake": return <h1>Hello {props.name} Smith!</h1>;
    case "Jack": return <h1>Hello {props.name} Blicha!</h1>;
    case "Huy": return <h1>Hello {props.name} Tran!</h1>;
    default: return <h1>Hello {props.name}!</h1>;
  }
}

function App() {
  return (
    <div className="App">
      <Welcome name={"Jack"}/>
      <Welcome name={"Jake"}/>
      <Welcome name={"World"}/>
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
