import React from "react";

class RefComponent extends React.Component{
    constructor() {
        super();
    }

    componentDidMount() {
        document.getElementById('ref').style.height= '40vh';
    }

    render(){
        return(
        <div id={'ref'} style={{'margin-bottom':'2rem'}}>
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
        );
    }
}

export default RefComponent;