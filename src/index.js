import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

ReactDOM.render(
    <App />,
  document.getElementById('root')
);

// // basic sample
// const element = <Welcome name="Jake" />;
// ReactDOM.render(
//     element,
//     document.getElementById('root')
// );

let tickvar = 0;
function tick() {
    const element = (
        <div>
            <h2>It is {new Date().toLocaleTimeString()}.</h2>
            <p id={"tick_paragraph"}>{tickvar}</p>
            {tickvar = tickvar+1}
            <p> a </p>
            <p> a </p>
        </div>
    );
    ReactDOM.render(element, document.getElementById('root'));
}

// setInterval(tick, 1000);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
