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
            <div className={'summarySubLabel summarySubLabelPos'}>
                <label>
                [1]    D. M. Goebel and I. Katz, “Fundamentals of Electric Propulsion: Ion and Hall Thrusters,” JPL Space Science & Technology Series, pp. 3–6, Mar. 2008.
                </label>
                <br></br>
                <br></br>
                <label>
                [2]    “Glossary,” Glossary | MIT Plasma Science and Fusion Center, 2021. [Online]. Available: <a href={"https://www.psfc.mit.edu/vision/glossary."}>https://www.psfc.mit.edu/vision/glossary.</a> [Accessed: 09-Oct-2021].
                </label>
                <br></br>
                <br></br>
                <label>
                [3]    J. D. Frieman, “CHARACTERIZATION OF BACKGROUND NEUTRAL FLOWS IN VACUUM TEST FACILITIES AND IMPACTS ON HALL EFFECT THRUSTER OPERATION,” dissertation, Georgia Institute of Technology, Atlanta, GA, 2017.
                </label>
                <br></br>
                <br/>
                <label style={{"margin-top":"1rem"}}>
                [4]    S. T. Lai and K. Cahoy, “Spacecraft Charging,” Encyclopedia of Plasma Technology, pp. 1352–1366, Dec. 2016.
                </label>
            </div>
        </div>
        );
    }
}

export default RefComponent;