import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import './landingPage.css';
import './App.css';
import './index.css';
import {HashRouter} from "react-router-dom";

ReactDOM.render(
    <HashRouter hashType={'hashbang'} basename={'/'}>
        <App />
    </HashRouter>,
  document.getElementById('body')
);