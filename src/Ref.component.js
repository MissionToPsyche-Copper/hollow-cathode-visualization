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
                    [1]    D. M. Goebel and I. Katz, “Fundamentals of Electric Propulsion: Ion and Hall Thrusters,” <i>JPL Space Science & Technology Series</i>, chapter 1-2, Mar. 2008. Available: <a href={"https://descanso.jpl.nasa.gov/SciTechBook/series1/Goebel__cmprsd_opt.pdf"} className={'reference-link'}>https://descanso.jpl.nasa.gov/SciTechBook/series1/Goebel__cmprsd_opt.pdf.</a> [Accessed: 09-Oct-2021].
                </label>
                <br/>
                <br/>
                <label>
                    [2]    D. M. Goebel and I. Katz, “Fundamentals of Electric Propulsion: Ion and Hall Thrusters,” <i>JPL Space Science & Technology Series</i>, chapter 6, Mar. 2008. Available: <a href={"https://descanso.jpl.nasa.gov/SciTechBook/series1/Goebel__cmprsd_opt.pdf"} className={'reference-link'}>https://descanso.jpl.nasa.gov/SciTechBook/series1/Goebel__cmprsd_opt.pdf.</a> [Accessed: 09-Oct-2021].
                </label>
                <br/>
                <br/>
                <label>
                    [3]    “Glossary,” Glossary | MIT Plasma Science and Fusion Center, 2021. [Online]. Available: <a href={"https://www.psfc.mit.edu/vision/glossary."} className={'reference-link'}>https://www.psfc.mit.edu/vision/glossary.</a> [Accessed: 09-Oct-2021].
                </label>
                <br/>
                <br/>
                <label>
                    [4]    J. D. Frieman, “CHARACTERIZATION OF BACKGROUND NEUTRAL FLOWS IN VACUUM TEST FACILITIES AND IMPACTS ON HALL EFFECT THRUSTER OPERATION,” dissertation, Georgia Institute of Technology, Atlanta, GA, 2017. Available: <a href={"https://mwalker.gatech.edu/papers/FRIEMAN-DISSERTATION-2017.pdf"} className={'reference-link'}>https://mwalker.gatech.edu/papers/FRIEMAN-DISSERTATION-2017.pdf.</a> [Accessed: 09-Oct-2021].
                </label>
                <br/>
                <br/>
                <label style={{"margin-top":"1rem"}}>
                    [5]    S. T. Lai and K. Cahoy, “Spacecraft Charging,” Encyclopedia of Plasma Technology, pp. 1352–1366, Dec. 2016. Available: <a href={"https://www.bc.edu/content/dam/files/research_sites/isr/pdf/2017%20Lai%20%26%20Cahoy%20-%20Encyclo.pdf"} className={'reference-link'}>https://www.bc.edu/content/dam/files/research_sites/isr/pdf/2017%20Lai%20%26%20Cahoy%20-%20Encyclo.pdf.</a> [Accessed: 09-Oct-2021].
                </label>
            </div>
        </div>
        );
    }
}

export default RefComponent;