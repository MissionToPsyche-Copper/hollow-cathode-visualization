import {Link} from "react-router-dom";
import React from 'react'
import PresMode from "./PresMode";
import {base} from "./Galactic";
import Painter from "./Painter";


class SummaryPage extends React.Component{
    constructor() {
        super();

    }

    componentDidMount() {
        PresMode.isAuto = false;
        console.log(PresMode.isAuto);
        if (PresMode.isAuto === false){
            console.log("Summary toggle result: "+PresMode.isAuto);
            document.getElementById('autoToggleButton').click();
        }
        document.getElementById('autoToggleButton').style.display='none';
        document.getElementById('nextButton').display= 'none';
    }

    render(){
        return(
            <>
                <div>
                    <div className={'summaryTitlePos'}>
                        HOLLOW CATHODE VISUALIZATION SUMMARY
                    </div>
                    <div id={'summaryContent'} className={'summarySubLabel summarySubLabelPos'}>
                        <p>
                            First, a heater heats the cathode insert until it begins to emit electrons. Next, gas is
                            injected near the insert and is ionized by the emitted electrons to form a hot plasma of
                            ions and even more electrons. Lastly, a positive voltage is placed on the keeper electrode,
                            pulling the electrons out of the end of the cathode where they can then be used by the Hall
                            thruster. The hollow cathode is a critical component of the Hall thruster as it provides
                            electrons needed to ionize its propellant and also neutralize the ionized propellant as it
                            leaves the thruster such that they don’t negatively affect the spacecraft.
                        </p>
                    </div>
                </div>
                <PresMode id={"presMode"} deltastage={base} scene={[true, false, false, false, false, false, false, false]} onClick={"eventHandle"}/>
            </>

        );
    }
}

export default SummaryPage;