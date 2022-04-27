import React from 'react'
import PresMode from "./PresMode";
import {base, link1url, link2url, link3url, recapText} from "./Galactic";


class SummaryPage extends React.Component{
    componentDidMount() {
        PresMode.isAuto = false;

        if (PresMode.isAuto === false){
            // console.log("Summary toggle result: "+PresMode.isAuto);
            document.getElementById('autoToggleButton').click();
        }

        document.getElementById('autoToggleButton').style.display='none';
        document.getElementById('nextButton').display= 'none';
    }

    render(){
        return(
            <>
                <div className={"summaryPageContainer"}>
                    <div className={'summaryTitleLabel summaryTitlePos'}>
                        Let's go over what you learned.
                    </div>

                    <div id={'summaryContent'} className={'summarySubLabel summarySubLabelPos'}>
                        {recapText}
                    </div>

                    <div className={"stackedButtonGroup bottomrightAlign"}>
                        <a href={link1url}>
                            <button
                                className={"button notActive"}> Hall Thrusters
                            </button>
                        </a>
                        <a href={link2url}>
                            <button
                                    className={"button notActive"}
                                    style={{display: "block"}}> The Psyche Mission
                            </button>
                        </a>
                        {/*<a href={link3url}>*/}
                        {/*    <button*/}
                        {/*            className={"button notActive"}> ???*/}
                        {/*    </button>*/}
                        {/*</a>*/}
                    </div>
                </div>
                <PresMode id={"presMode"} className={"presMode"} deltastage={base} scene={[true, false, false, false, false, false, false, false]} onClick={"eventHandle"}/>
            </>

        );
    }
}

export default SummaryPage;