import {Link} from "react-router-dom";
import React from 'react'
import PresMode from "./PresMode";
import {base} from "./Galactic";
import Painter from "./Painter";


class SummaryAndRefComponent extends React.Component{
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
            <div id={''}>
                <div id={'summary'}>
                    <PresMode id={"presMode"} deltastage={base} scene={[true,false,false,false,false,false,false,false]} onClick={"eventHandle"}></PresMode>
                    <div id={''}>
                        <div id={''} className={'summaryTitlePos'}>
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
                </div>


                <div id={''} style={{'margin-bottom':'2rem'}}>
                    <div id={''} className={"summaryTitlePos"}>
                        REFERENCES
                    </div>
                    <div id={''} className={'summarySubLabel summarySubLabelPos'}>
                        <label>
                            “Glossary,” Glossary | MIT Plasma Science and Fusion Center, 2021. [Online]. Available:
                            <a href={"https://www.psfc.mit.edu/vision/glossary."}>https://www.psfc.mit.edu/vision/glossary.</a> [Accessed: 09-Oct-2021].
                        </label>
                        <br></br>
                        <label>
                            J. D. Frieman, “CHARACTERIZATION OF BACKGROUND NEUTRAL FLOWS IN VACUUM TEST FACILITIES AND IMPACTS ON HALL EFFECT THRUSTER OPERATION,” dissertation, Georgia Institute of Technology, Atlanta, GA, 2017.
                        </label>
                    </div>

                </div>
            </div>

        );
    }
}

export default SummaryAndRefComponent;