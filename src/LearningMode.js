import React from "react";
import Painter from "./Painter";
import {
    base,
    eject,
    gas,
    hallThrusterOff,
    hallThrusterOn,
    heat,
    keeper,
    plasma,
    heatTitleText,
    heatText,
    gasTitleText2,
    gasText,
    plasmaTitleText,
    plasmaText,
    keeperTitleText,
    keeperText,
    ejectTitleText,
    ejectText,
    heatKeeperErrorTitleText,
    heatKeeperErrorText,
    gasKeeperTitleText,
    gasKeeperErrorText
}from "./Galactic";

import ReactDOM from "react-dom";
import LandingPage from "./LandingPage";

const {promisify} = require('util')
const sleep= promisify(setTimeout)

let canvas_height = 750;
let canvas_width = 1150;

/**
 * Learning mode element
 * Should be rendered inside a <div id={"canvasHolder"}>
 * also with props: id={"LearningMode"} deltastage={base} scene={[true,false,false,false,false,false,false,false]}
 */

var HALL_THRUSTER_ON = false;

export class LearningMode extends React.Component {

    // Instance variables:
    // (all essentially cosmetic) (created in constructor)
    deltastage;
    scene;
    canvas;
    layers; // layers[base = 0, heat = 1, gas = 2, plasma = 3, keeper = 4, eject = 5, thruster off = 6, thruster on = 7]; //layers = [ctx0, ctx1, ctx2, ctx3, ctx4, ctx5, ctx6, ctx7];
    painter;
    thrusterButtonText; // if the thruster is on, this text says "off", and vice versa

    constructor(props){
        super();

        // initialize canvas instance variables

        //Hollow Cathode Canvases:
        this.canvas0 = React.createRef();   //// 1 - create ref
        this.canvas1 = React.createRef();
        this.canvas2 = React.createRef();
        this.canvas3 = React.createRef();
        this.canvas4 = React.createRef();
        this.canvas5 = React.createRef();

        //Hall Thruster Canvases:
        this.canvas6 = React.createRef();   //Hall Thruster OFF
        this.canvas7 = React.createRef();   //Hall Thruster ON

        // bind handler function(s)
        this.HeatInsertToggle_HandleClick = this.HeatInsertToggle_HandleClick.bind(this);
        this.GasFeedToggle_HandleClick = this.GasFeedToggle_HandleClick.bind(this);
        this.KeeperElectrodeToggle_HandleClick = this.KeeperElectrodeToggle_HandleClick.bind(this);
        this.nextButton_plasma_HandleClick = this.nextButton_plasma_HandleClick.bind(this);
        this.nextButton_eject_HandleClick = this.nextButton_eject_HandleClick.bind(this);
        this.hallThrusterToggle_HandleClick = this.hallThrusterToggle_HandleClick.bind(this);
        this.nextButton_hallThruster_HandleClick = this.nextButton_hallThruster_HandleClick.bind(this);
        this.nextButton_end_HandleClick = this.nextButton_end_HandleClick.bind(this);

        // initialize state
        this.state = { deltastage: props.deltastage, scene: props.scene, text:props.text};

        this.state.canvas_height = document.getElementById("root").clientHeight;
        this.state.canvas_width = document.getElementById("root").clientWidth * 0.60;

        // Hall Thruster toggle button text
        if(this.state.scene[hallThrusterOn] === true) {
            this.thrusterButtonText = "Off";
        }
        else {
            this.thrusterButtonText = "On";
        }
    }

    /**
     * Hides the element with the given id
     * @param elementId id of element to hide
     */
    hideElement(elementId){
        //document.getElementById(elementId).style.visibility = 'hidden';
        document.getElementById(elementId).style.display = 'none';
    }
    /**
     * Un-hides the element with the given id
     * @param elementId id of element to show
     */
    showElement(elementId){
        // document.getElementById(elementId).style.visibility = 'visible';
        document.getElementById(elementId).style.display = 'flex';
    }

    isElementShown(elementId){
        if(document.getElementById(elementId).style.display === 'flex') {
            return true;
        }
        else{
            return false;
        }
    }

    /**
     * componentDidMount()
     * Called when canvas element is mounted on page (canvas element is unusable up until this point)
     */
    componentDidMount() {
        // initialize instance variables for each canvas element/layer
        const ctx0 = this.canvas0.current.getContext('2d'); // base = 0;
        const ctx1 = this.canvas1.current.getContext('2d'); // heat = 1;
        const ctx2 = this.canvas2.current.getContext('2d'); // gas = 2;
        const ctx3 = this.canvas3.current.getContext('2d'); // plasma = 3;
        const ctx4 = this.canvas4.current.getContext('2d'); // keeper = 4;
        const ctx5 = this.canvas5.current.getContext('2d'); // eject = 5;
        const ctx6 = this.canvas6.current.getContext('2d'); // Hall Thruster OFF = 6;
        const ctx7 = this.canvas7.current.getContext('2d'); // Hall Thruster ON = 7;

        this.layers = [ctx0, ctx1, ctx2, ctx3, ctx4, ctx5, ctx6, ctx7];
        //      layers[base = 0, heat = 1, gas = 2, plasma = 3, keeper = 4, eject = 5, thruster off = 6, thruster on = 7];
        this.painter = new Painter(this.layers);
        this.scenarioRefresh();
    }

    /**
     * scenarioRefresh()
     *
     * Populates the canvas based on the current state, is hopefully called whenever a change is made (ex: the onClick functions)
     * You can see the end of this function as the end of the current update/iteration.
     */
    scenarioRefresh() {
        // Execute logic based on deltastage and scene
        this.setState({text: " "})

        if(this.state.scene[hallThrusterOff] === true) {
            this.hideElement("hallThrusterOn-fadeIn")
            this.hideElement("hallThrusterOn-fadeOut")

            this.hideElement("toggleButtonGroup");
            this.painter.draw_Hall_Thruster_Off();

            this.showElement("hallThrusterOffLabelDiv");
            this.showElement("hallThrusterOffSublabelDiv");

            this.hideElement("hallThrusterOnLabelDiv");
            this.hideElement("hallThrusterOnSublabelDiv");
        }
        else
        {
            this.hideElement("hallThrusterButtonGroup");
            this.hideElement("hallThrusterOffLabelDiv");
            this.hideElement("hallThrusterOnLabelDiv");
            this.hideElement("hallThrusterOffSublabelDiv");
            this.hideElement("hallThrusterOnSublabelDiv");
            this.hideElement("hallThrusterNameLabelDiv");
            this.hideElement("hallThrusterNameSublabelDiv");

        }

        if (this.state.scene[hallThrusterOn] === true)
        {
            this.hideElement("toggleButtonGroup");
            this.painter.draw_Hall_Thruster_On();

            this.showElement("hallThrusterOnLabelDiv");
            this.showElement("hallThrusterOnSublabelDiv");

            this.hideElement("hallThrusterOffLabelDiv");
            this.hideElement("hallThrusterOffSublabelDiv");
        }

        // Hall Thruster toggle button text
        // programed backwards because of order of execution

        //If the user turns the hall thruster on
        if(this.state.scene[hallThrusterOn] === true){
            HALL_THRUSTER_ON = true;
            this.showElement("hallThrusterOn-fadeIn")

            this.thrusterButtonText = "Off";

        }
        //If the user turns the hall thruster off after it was just on
        else if(HALL_THRUSTER_ON === true)
        {
            this.showElement("hallThrusterOn-fadeOut")
            this.thrusterButtonText = "On";

            //HALL_THRUSTER_ON = false;
        }
        //If the hall thruster is off
        //Also the first thing to happen in Hall Thruster view
        else
        {
            this.hideElement("hallThrusterOn-fadeIn")
            this.hideElement("hallThrusterOn-fadeOut")

            this.thrusterButtonText = "On";
        }

        if(this.state.scene[hallThrusterOn] === false && this.state.scene[hallThrusterOff] === false)
        {
            this.hideElement("hallThrusterOn-fadeIn")
            this.hideElement("hallThrusterOn-fadeOut")
        }


        if(this.state.scene[hallThrusterOn] === true) {
            this.painter.draw_Hall_Thruster_On();
        } else if (this.state.deltastage === hallThrusterOn) {
            this.painter.clearCanvas(hallThrusterOn);
        }else{
            this.hideElement("hallThrusterOn-fadeOut")
            this.hideElement("hallThrusterOn-fadeIn")
        }

        // if basedrawing is active
        if(this.state.scene[base] === true){
            this.painter.draw_csv_Base_Drawing()
            this.painter.clearCanvas(hallThrusterOn)
            this.painter.clearCanvas(hallThrusterOff)

            // if the user just toggled basedrawing
            if(this.state.deltastage === base || this.state.deltastage === hallThrusterOn || this.deltastage === hallThrusterOff){
                this.painter.draw_csv_Base_Drawing_guide();
            }
        }
        // the user deselected this option/layer
        else if (this.state.deltastage === base){
            this.painter.clearCanvas(this.state.deltastage);
        }

        // if heat insert is active
        if(this.state.scene[heat] === true){
            this.painter.draw_csv_Heat_Insert();

            // if the user just toggled heat insert
            if(this.state.deltastage === heat)
            {
                this.setState({text: heatText})
            }
        }
        // if the user deselected this option/layer
        else if (this.state.deltastage === heat){
            this.painter.killElectronGenerator();
            this.painter.clearCanvas(this.state.deltastage);
        }

        // if gas feed is active
        if(this.state.scene[gas] === true){
            this.painter.draw_csv_gas_feed();

            // if the user just toggled the gas feed
            if(this.state.deltastage === gas){
                this.setState({text: gasText})
            }
        }
        // if the user deselected this option/layer
        else if (this.state.deltastage === gas){
            this.painter.killXenonGenerator();
            this.painter.clearCanvas(this.state.deltastage);
        }

        // INTERNAL PLASMA // -----------
        // if internal plasma is true
        if(this.state.scene[plasma]){
            if(this.state.scene[heat] && this.state.scene[gas]){
                this.painter.draw_csv_internal_plasma();

                // if the user  just triggered the internal plasma
                if(this.state.deltastage === plasma){
                    this.setState({text: plasmaText})
                }
            } else {
                // plasma shouldn't exist
                let newScene = this.state.scene;
                newScene[plasma] = false;

                // change the current state, refresh scenario in callback to synchronously update the visuals after the state has changed
                this.setState((state, props) => {
                    return { deltastage: plasma, scene: newScene };
                }, () => {this.scenarioRefresh()});
            }
        }

        // if both heat and gas are true but internal plasma isn't
        else if (this.state.scene[heat] && this.state.scene[gas]){
            // there probably should be internal plasma?

            // see if plasma should be required to be next in line
            if(this.state.deltastage === heat || this.state.deltastage === gas){
                // show next button (restrict user mobility)
                this.painter.clearCanvas(plasma);
                this.hideElement("toggleButtonGroup");
                this.showElement("nextButton");
                document.getElementById("nextButton").onclick = this.nextButton_plasma_HandleClick;
            }
        }
        // if plasma is false and deltastage is plasma
        else if (this.state.deltastage === plasma){
            // the user deselected this option/layer
            this.painter.clearCanvas(this.state.deltastage);

            // if internal plasma stops because ___ call ___ explanation
            if(!this.state.scene[heat]){
                this.painter.draw_csv_internal_plasma_off_heat_guide();
            } else if(!this.state.scene[gas]){
                this.painter.draw_csv_internal_plasma_off_gas_guide();
            }
        }

        // if keeper electrode is active
        if(this.state.scene[keeper] === true){
            this.painter.draw_csv_keeper_electrode();

            // if the user just toggled the keeper electrode
            if(this.state.deltastage === keeper){
                this.setState({text: keeperText})
            }
        }
        // if the user deselected this option/layer
        else if (this.state.deltastage === keeper){
            this.painter.clearCanvas(this.state.deltastage);
        }

        // EJECT PLASMA // -----------
        if(this.state.scene[eject]){
            if(this.state.scene[heat] && this.state.scene[gas] && this.state.scene[plasma] && this.state.scene[keeper]){
                this.painter.draw_csv_eject_plasma();

                // if the user just triggered eject plasma
                if(this.state.deltastage === eject){
                    this.setState({text: ejectText})
                }
            } else {
                // plasma shouldn't eject
                let newScene = this.state.scene;
                newScene[eject] = false;

                // change the current state, refresh scenario in callback to synchronously update the visuals after the state has changed
                this.setState((state, props) => {
                    return { deltastage: eject, scene: newScene };
                }, () => {this.scenarioRefresh()});
            }
        }
        else if (this.state.scene[heat] && this.state.scene[gas] && this.state.scene[plasma] && this.state.scene[keeper]){
            // there probably should be ejecting plasma?

            // see if eject should be required to be next in line
            if(this.state.deltastage === keeper){
                // show next button (restrict user mobility)
                this.painter.clearCanvas(eject);
                this.hideElement("toggleButtonGroup");
                this.showElement("nextButton");
                document.getElementById("nextButton").onclick = this.nextButton_eject_HandleClick;
            }
        }
        // if eject is false and deltastage is plasma
        else if (this.state.deltastage === eject){
            // the user deselected this option/layer
            this.painter.clearCanvas(this.state.deltastage);

            // if ejecting plasma stops bcz ___ call ___ explanation
            // if(!this.state.scene[heat]){
            //     this.painter.draw_csv_eject_plasma_off_heat_guide();
            // } else if(!this.state.scene[gas]){
            //     this.painter.draw_csv_eject_plasma_off_gas_guide();
            // } else if(!this.state.scene[plasma]){
            //     this.painter.draw_csv_eject_plasma_off_plasma_guide();
            // } else if(!this.state.scene[keeper]){
            //     this.painter.draw_csv_eject_plasma_off_keeper_guide();
            // }
        }
        //GAS ON, KEEPER ON, NO PLASMA
        if(this.state.scene[gas] === true  && this.state.scene[keeper] === true && this.state.scene[plasma] === false && (this.deltastage === gas || this.deltastage === keeper)) {
            this.setState({text: gasKeeperErrorText})
        }
        //HEAT ON, KEEPER ON, NO PLASMA
        if(this.state.scene[heat] && this.state.scene[keeper] && !this.state.scene[plasma] && (this.deltastage === heat || this.deltastage === keeper)) {
            this.setState({text: heatKeeperErrorText})
        }

        //TODO this is a bad solution for checking the user has completed learning mode
        if(this.state.scene[base] === true
            && this.state.scene[heat] === true
            && this.state.scene[gas] === true
            && this.state.scene[plasma] === true
            && this.state.scene[keeper] === true
            && this.state.scene[eject] === true){
            this.hideElement("toggleButtonGroup");
            this.showElement("nextButton");
            document.getElementById("nextButton").onclick = this.nextButton_end_HandleClick;
        }
    }

    /**
     * HeatInsertToggle_HandleClick()
     * Onclick handler for the heat insert toggle button
     */
    HeatInsertToggle_HandleClick() {
        let newScene = this.state.scene;
        newScene[heat] = !newScene[heat];

        // change the current state, refresh scenario in callback to synchronously update the visuals after the state has changed
        this.setState((state, props) => {
            return { deltastage: heat, scene: newScene };
        }, () => {this.scenarioRefresh()});

        // WARNING: code past setState will not be synchronously executed
    }

    /**
     * GasFeedToggle_HandleClick()
     * Onclick handler for the gas feed toggle button
     */
    GasFeedToggle_HandleClick() {
        let newScene = this.state.scene;
        newScene[gas] = !newScene[gas];

        // change the current state, refresh scenario in callback to synchronously update the visuals after the state has changed
        this.setState((state, props) => {
            return { deltastage: gas, scene: newScene };
        }, () => {this.scenarioRefresh()});

        // WARNING: code past setState will not be synchronously executed
    }

    /**
     * KeeperElectrodeToggle_HandleClick()
     * Onclick handler for the keeper electrode toggle button
     */
    KeeperElectrodeToggle_HandleClick() {
        let newScene = this.state.scene;
        newScene[keeper] = !newScene[keeper];

        // change the current state, refresh scenario in callback to synchronously update the visuals after the state has changed
        this.setState((state, props) => {
            return { deltastage: keeper, scene: newScene };
        }, () => {this.scenarioRefresh()});

        // WARNING: code past setState will not be synchronously executed
    }

    /**
     * nextButton_plasma_HandleClick()
     * Onclick handler for the "next" button for the internal plasma scene, updates the state and DOM via appropriate logic
     */
    nextButton_plasma_HandleClick() {
        let newScene = this.state.scene;
        newScene[plasma] = true;

        // update DOM buttons (replace next with toggles)
        this.hideElement("nextButton");
        this.showElement("toggleButtonGroup");

        // change the current state, refresh scenario in callback to synchronously update the visuals after the state has changed
        this.setState((state, props) => {
            return { deltastage: plasma, scene: newScene };
        }, () => {this.scenarioRefresh()});

    }

    /**
     * nextButton_hallThruster_HandleClick()
     */
    nextButton_hallThruster_HandleClick() {
        // trigger zoom animation
        document.getElementById("hallThruster").classList.add("hallThrusterToCathodeZoom")
        // add listener for end of animation
        document.getElementById("hallThruster")
            .addEventListener("animationend", () => { console.log("cathode zoom animation has finished") }, false);

        document.getElementById("HallThrusterNext").classList.replace("CathodeHitBox_zoomed_out", "CathodeHitBox_zoomed_in")

        this.hideElement("hallThrusterButtonGroup");
        this.showElement("toggleButtonGroup");
        this.hideElement("hallThrusterButtonGroup");
        this.hideElement("hallThrusterOffLabelDiv");
        this.hideElement("hallThrusterOnLabelDiv");
        this.hideElement("hallThrusterOffSublabelDiv");
        this.hideElement("hallThrusterOnSublabelDiv");
        this.hideElement("hallThrusterNameLabelDiv");
        this.hideElement("hallThrusterNameSublabelDiv");
        this.hideElement("HallThrusterNext");

        this.setState((state, props) => {
            return { deltastage: base, scene: [true,false,false,false,false,false,false,false] };
        }, () => {this.scenarioRefresh()});
    }

    hallThrusterToggle_HandleClick() {
        let newScene = this.state.scene;
        newScene[hallThrusterOn] = !newScene[hallThrusterOn];

        this.setState((state, props) => {
            return { deltastage: hallThrusterOn, scene: newScene };
        }, () => {this.scenarioRefresh()});
    }

    /**
     * nextButton_eject_HandleClick()
     * Onclick handler for the "next" button for the eject plasma scene, updates the state and DOM via appropriate logic
     */
    nextButton_eject_HandleClick() {
        let newScene = this.state.scene;
        newScene[eject] = !newScene[eject];

        // update DOM buttons (replace next with normal toggles)
        this.hideElement("nextButton");
        this.showElement("toggleButtonGroup");

        // change the current state, refresh scenario in callback to synchronously update the visuals after the state has changed
        this.setState((state, props) => {
            return { deltastage: eject, scene: newScene };
        }, () => {this.scenarioRefresh()});
    }

    /**
     * nextButton_end_HandleClick()
     * Onclick handler for the "next" button for the eject plasma scene's ending
     * this leads to the view were we show them some links to follow and such
     */
    nextButton_end_HandleClick() {
        this.hideElement("nextButton");
    }

    /**
     * getLayer(layer)
     * @param layer layer number which you want to get
     * @returns ctx 2d canvas context for that layer
     */
    getLayer(layer){
        return this.layers[layer];
    }

    /**
     * backButton_HandleClick()
     * Onclick handler for the "back" button, reloads the landing page
     */
    backButton_HandleClick() {

        HALL_THRUSTER_ON = false;
        // render learning mode
        ReactDOM.render(
            <div id={"canvasHolder"}>
                <LandingPage id={"landingPage"}/>
            </div>,
            document.getElementById('root')
        );
    }


    render(){
        return (
            <>
                {/*<img id={"hallThruster"} src={"/images/HallThrusterMockup.png"} className={""} alt={"Base Cathode"}/>*/}
                <img id={"hallThruster"} src={"/images/thrusterAndCathode.png"} className={""} alt={"Base Cathode"}/>
                <canvas id={"canvas0"} ref={this.canvas0} className={"canvas"} width={this.state.canvas_width} height={this.state.canvas_height} deltastage={this.state.deltastage} scene={this.state.scene} > You need a better browser :( </canvas>
                <canvas id={"canvas1"} ref={this.canvas1} className={"canvas"} width={this.state.canvas_width} height={this.state.canvas_height} deltastage={this.state.deltastage} scene={this.state.scene} > You need a better browser :( </canvas>
                <canvas id={"canvas2"} ref={this.canvas2} className={"canvas"} width={this.state.canvas_width} height={this.state.canvas_height} deltastage={this.state.deltastage} scene={this.state.scene} > You need a better browser :( </canvas>
                <canvas id={"canvas3"} ref={this.canvas3} className={"canvas"} width={this.state.canvas_width} height={this.state.canvas_height} deltastage={this.state.deltastage} scene={this.state.scene} > You need a better browser :( </canvas>
                <canvas id={"canvas4"} ref={this.canvas4} className={"canvas"} width={this.state.canvas_width} height={this.state.canvas_height} deltastage={this.state.deltastage} scene={this.state.scene} > You need a better browser :( </canvas>
                <canvas id={"canvas5"} ref={this.canvas5} className={"canvas"} width={this.state.canvas_width} height={this.state.canvas_height} deltastage={this.state.deltastage} scene={this.state.scene} > You need a better browser :( </canvas>
                <canvas id={"canvas6"} ref={this.canvas6} className={"canvas"} width={this.state.canvas_width} height={this.state.canvas_height} deltastage={this.state.deltastage} scene={this.state.scene} > You need a better browser :( </canvas>
                <canvas id={"canvas7"} ref={this.canvas7} className={"canvas"} width={this.state.canvas_width} height={this.state.canvas_height} deltastage={this.state.deltastage} scene={this.state.scene} > You need a better browser :( </canvas>

                <img id={"hallThrusterOn-fadeIn"} src={"/images/hallThrusterOn.png"} className={"fade-in"} alt={"Hall Thruster On: Fade In"}/>
                <img id={"hallThrusterOn-fadeOut"} src={"/images/hallThrusterOn.png"} className={"fade-out"} alt={"Hall Thruster On: Fade Out"}/>

                <button id={"HallThrusterNext"}
                        className={"CathodeHitBox_zoomed_out"}
                        onClick={this.nextButton_hallThruster_HandleClick}>
                </button>

                <div id={"backToLandingPageButtonDiv"} className={"stackedButtonGroup bottomleftAlign"} >
                    <button id={"backButton"} className={"button"} onClick={this.backButton_HandleClick}> Back to Landing Page </button>
                </div>

                <div id={"hallThrusterButtonGroup"} className={"stackedButtonGroup bottomrightAlign"}>
                    <button id={"HallThrusterToggle"}
                            className={"button"}
                            onClick={this.hallThrusterToggle_HandleClick}> Turn Power {this.thrusterButtonText}
                    </button>
                </div>

                <div id={"hallThrusterOffLabelDiv"}>
                    <label id={"hallThrusterOffLabel"}
                           className={"titleLabel hallThrusterOffTitleLabelPos"}> The Hall Thruster Is Off
                    </label>
                </div>

                <div id={"hallThrusterOffSublabelDiv"}>
                    <label id={"hallThrusterOffSublabel"}
                           className={"sublabel hallThrusterOffSublabelPos"}>
                        The hollow cathode is a component of the Hall thruster. Its key role is to emit electronic
                        plasma to pull the positive plasma inside the cabin of the Hall thruster, known as the internal
                        plasma. Another role of the hollow cathode, which is not least significant, is to neutralize the
                        rocket. Without the hollow cathode, when Hall thruster emits plasma, the Hall thruster is
                        negatively charging the entire rocket. This phenomenon can cause spacecraft erosion and reduce
                        the thrust force.
                    </label>
                </div>

                <div id={"hallThrusterOnLabelDiv"}>
                    <label id={"hallThrusterOnLabel"}
                           className={"titleLabel hallThrusterOffTitleLabelPos"}> The Hall Thruster Is On
                    </label>
                </div>

                <div id={"hallThrusterOnSublabelDiv"}>
                    <label id={"hallThrusterOnSublabel"}
                           className={"sublabel hallThrusterOffSublabelPos"}>
                        The hollow cathode has two primary functions, it provides electrons for the Hall thruster, and
                        neutralizes ions ejected by the Hall thruster. The hollow cathode can be seen above the Hall
                        thruster, both emitting blue plasma.
                        <p><b id={"guideText"}>Click on the cathode to learn more about it</b></p>
                    </label>
                </div>

                <div id={"hallThrusterNameLabelDiv"}>
                    <label id={"hallThrusterNameLabel"}
                           className={"titleLabel hallThrusterNameTitleLabelPos"}> Hall Thruster
                    </label>
                </div>

                <div id={"hallThrusterNameSublabelDiv"}>
                    <label id={"hallThrusterNameSublabel"}
                           className={"sublabel hallThrusterNameSublabelPos"}>
                        Hall thruster is advanced electric propulsion used in electric rockets. This technology is
                        replacing the old chemical thruster since the Hall thruster consumes less energy but produces
                        an incredibly <i>specific impulse</i> (the amount of force generated for an interval of time) and
                        significantly reduces the payload mass.
                    </label>
                </div>

                <div id={"learningModeGuide"} className={"sublabel"}>{this.state.text}</div>

                <div id={"toggleButtonGroup"} className={"stackedButtonGroup bottomrightAlign"} style={{display: "block"}}>
                    <button id={"KeeperElectrodeToggle"}
                            className={"button"}
                            style={{display: "block"}}
                            onClick={this.KeeperElectrodeToggle_HandleClick}> Keeper Electrode
                    </button>
                    <button id={"GasFeedToggle"}
                            className={"button"}
                            style={{display: "block"}}
                            onClick={this.GasFeedToggle_HandleClick}> Gas Feed
                    </button>
                    <button id={"HeatInsertToggle"}
                            className={"button"}
                            style={{display: "block"}}
                            onClick={this.HeatInsertToggle_HandleClick}> Heat Inserts
                    </button>
                </div>
                <button id={"nextButton"}
                        className={"button stackedButtonGroup bottomrightAlign"}
                        style={{display: "none"}}> Next
                </button>
            </>
        )
    }
}

export default LearningMode;