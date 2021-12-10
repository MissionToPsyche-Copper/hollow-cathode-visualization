import logo from './logo.svg';
import './App.css';
import './landingPage.css';
import React from 'react';
import ReactDOM from "react-dom";
import LandingPage from "./components/LandingPage/landing";

// Huy's Dimensions
//const canvas_height = '600';
//const canvas_width = '940';
// Jack's Dimensions
// const canvas_height = 750;
// const canvas_width = 1600;

/**
 * Mapping layers via constants
 * These should always be used to reference layers when used as parameters to a function or when interacting with this.state.
 * This allows us to easily add and remove layers.
 */
/*const base = 0; // ctx0 // scene[base]
const heat = 1; // ctx1 // scene[heat]
const gas = 2; // ctx2 // scene[gas]
const plasma = 3; // ctx3 // scene[plasma]
const keeper = 4; // ctx4 // scene[keeper]
const eject = 5; // ctx5 // scene[eject]
*/
function App() {
    return (
        <div>
            <div id={"canvasHolder"}>
                <LandingPage id={"LandingPage"} canvas_height={'600'} canvas_width={'940'}/>
            </div>
        </div>
//>>>>>>> master
    );
}

export default App;

/**
 * Site landing page element
 * Should be rendered inside a <div id={"canvasHolder"}>
 */





/**
 * Learning mode element
 * Should be rendered inside a <div id={"canvasHolder"}>
 * also with props: id={"LearningMode"} deltastage={base} scene={[true,false,false,false,false,false]}
 */


/**
 * Presentation mode element
 * Should be rendered inside a <div id={"canvasHolder"}>
 * also with props: id={"PresMode"} deltastage={base} scene={[true,false,false,false,false,false]}
 */

