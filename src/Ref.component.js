import React from "react";

class RefComponent extends React.Component{
    constructor() {
        super();
    }

    componentDidMount() {
        /* I moved this inline styling into its class (referenceDiv) */
    }

    render(){
        return(
        <div id={'ref'} className={"referenceDiv"}> {/* I moved the inline styling into its class (referenceDiv) */}
            <div className={"summaryTitlePos"}>
                REFERENCES
            </div>
            <div className={'referenceSubLabel referenceSubLabelPos'}>
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

export default RefComponent;