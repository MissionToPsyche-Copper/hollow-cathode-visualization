import './App.css';
import './landingPage.css';
import React from 'react';
import {
    BrowserRouter as Router,
    Routes,
    Route
} from 'react-router-dom';
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
                        Please increase your window size before continuing.
                    </p>
                </div>
                <div className={"hideWhenTooSmall"}>
                    <Routes>
                        <Route path={'/'} element={<LandingPage id={"LandingPage"}/>}></Route>
                        <Route path={'/learning'} element={<LearningMode id={"LearningMode"} deltastage={hallThrusterOff} scene={[false,false,false,false,false,false,true,false]}/>}></Route>
                        <Route path={'/presentation'} element={<PresMode id={"presMode"} deltastage={base} scene={[true,false,false,false,false,false,false,false]}/>}></Route>
                        <Route path={'/summary'} element={<SummaryPage/>}></Route>
                        <Route path={'/ref'} element={<RefComponent/>}></Route>
                    </Routes>
                </div>
            </Router>
        )
}

export default MyRouter;