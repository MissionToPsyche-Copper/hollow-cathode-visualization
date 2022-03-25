import {Link} from "react-router-dom";
import React from 'react'

class SummaryAndRefComponent extends React.Component{
    render(){
        return(
            <div>
                <div id={'summaryDiv'} className={"sublabel summaryLabelPos"}>
                    This is a summary
                </div>
                <div id={'referenceDiv'} className={"sublabel referenceLabelPos"}>
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

        );
    }
}

export default SummaryAndRefComponent;