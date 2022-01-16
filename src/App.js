import './App.css';
import './landingPage.css';
import React from 'react';
import ReactDOM from "react-dom";

import ProtoParticle from "./ProtoParticle.js"; // Jack's particle system
import LandingPage from "./LandingPage";
import Painter from "./Painter";



function App() {
    return (
        <div>
            <div id={"canvasHolder"}>
                <LandingPage id={"LandingPage"}/>
            </div>
        </div>
    );
}

export default App;