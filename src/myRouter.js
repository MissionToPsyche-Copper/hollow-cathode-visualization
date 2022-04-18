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
        <div>
            <div className={"showWhenTooSmall"}>
                <p>
                    Your window size is too small for this visualization.
                    Please set your window size to full screen before continuing.
                </p>
            </div>
            <div className={"hideWhenTooSmall"}>
                <Routes>
                    <Route path={'/'} element={<LandingPage id={"LandingPage"}/>}/>

                    <Route path={'/learning'} element={<LearningMode id={"LearningMode"} deltastage={hallThrusterOff}
                                                                              scene={[false, false, false, false, false, false, true, false]}/>}/>
                    <Route path={'/presentation'} element={<PresMode id={"presMode"} deltastage={base}
                                                                              scene={[true, false, false, false, false, false, false, false]}/>}/>
                    <Route path={'/summary'} element={<SummaryPage/>}/>
                    <Route path={'/ref'} element={<RefComponent/>}/>
                    <Route path={'/*'} element={<LandingPage id={"LandingPage"}/>}/>
                </Routes>
            </div>
        </div>
    )
}

export default MyRouter;