import './App.css';
import './landingPage.css';
import React from 'react';

import LandingPage from "./LandingPage";

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