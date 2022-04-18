import './App.css';
import './landingPage.css';
import React from 'react';
import {BrowserRouter as Router, Route, Routes,} from 'react-router-dom';
import LandingPage from "./LandingPage";
import LearningMode from "./LearningMode";
import PresMode from "./PresMode";
import SummaryPage from "./SummaryPage";
import RefComponent from "./Ref.component";
import {base, hallThrusterOff} from "./Galactic";

function MyRouter(){
    return(
        <Router>
            <div className={"showWhenTooSmall"}>
                <p>
                    Your window size is too small for this visualization.
                    Please set your window size to full screen before continuing.
                </p>
            </div>
            <div className={"hideWhenTooSmall"}>
                <Routes>
                    <Route path={'/hollow-cathode-visualization/'} element={<LandingPage id={"LandingPage"}/>}/>
                    <Route path={'/hollow-cathode-visualization/learning'} element={<LearningMode id={"LearningMode"} deltastage={hallThrusterOff}
                                                                              scene={[false, false, false, false, false, false, true, false]}/>}/>
                    <Route path={'/hollow-cathode-visualization/presentation'} element={<PresMode id={"presMode"} deltastage={base}
                                                                              scene={[true, false, false, false, false, false, false, false]}/>}/>
                    <Route path={'/hollow-cathode-visualization/summary'} element={<SummaryPage/>}/>
                    <Route path={'/hollow-cathode-visualization/ref'} element={<RefComponent/>}/>
                    <Route path={'*'} element={<LandingPage id={"LandingPage"}/>}/>
                </Routes>
            </div>
        </Router>
    )
}

export default MyRouter;