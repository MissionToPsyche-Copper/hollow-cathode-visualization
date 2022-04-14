import {Link} from "react-router-dom";
import React from 'react'
import PresMode from "./PresMode";
import {base, recapText} from "./Galactic";
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

    componentWillUnmount() {
        // prompt user with warning on attempted page refresh - unbind
        window.onbeforeunload = function() {};
    }

    render(){
        // prompt user with warning on attempted page refresh - bind
        window.onbeforeunload = function() {
            return "Refreshing this page returns you to our landing page, are you sure?";
        };

        return(
            <>
                <div>
                    <div className={'summaryTitlePos'}>
                        HOLLOW CATHODE VISUALIZATION SUMMARY
                    </div>
                    <div id={'summaryContent'} className={'summarySubLabel summarySubLabelPos'}>
                        <p>
                            {recapText}
                        </p>
                    </div>
                </div>
                <PresMode id={"presMode"} deltastage={base} scene={[true, false, false, false, false, false, false, false]} onClick={"eventHandle"}/>
            </>

        );
    }
}

export default SummaryPage;