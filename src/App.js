import './App.css';
import './landingPage.css';
import React from 'react';
import {
    BrowserRouter as Router,
    Routes,
    Route, Switch
} from 'react-router-dom';
import LandingPage from "./LandingPage";
import HeaderComponent from "./Header.component.";
import FooterComponent from "./Footer.component";
import LearningMode from "./LearningMode";
import PresMode from "./PresMode";
import SummaryAndRefComponent from "./SummaryAndRef.component";
import {base, hallThrusterOff} from "./Galactic";

function App() {
    return (
        <Router>
            <div className={'App App-header'}>
                <HeaderComponent/>
                {/*<div id={"canvasHolder"}>*/}
                    <Routes>
                        <Route path={'/'} element={<LandingPage/>}></Route>
                        <Route path={'/learning'} element={<LearningMode id={"LearningMode"} deltastage={hallThrusterOff} scene={[false,false,false,false,false,false,true,false]}/>}></Route>
                        <Route path={'/presentation'} element={<PresMode id={"presMode"} deltastage={base} scene={[true,false,false,false,false,false,false,false]}/>}></Route>
                        <Route path={'/summary'} element={<SummaryAndRefComponent/>}></Route>
                    </Routes>
                </div>
                <FooterComponent/>
            {/*</div>*/}
        </Router>
    );
}

export default App;