import React from "react";
import Painter from "./Painter";

import {
    base, cathodeCSVSubText, cathodeCSVText, cathodeCSVTitleText,
    cathodeShellPrimaryText, cathodeShellPrimaryTitleText,
    eject, ejectSubText, ejectText, ejectTitleText,
    gas, gasKeeperErrorSubText, gasKeeperErrorText, gasKeeperErrorTitleText, gasSubText, gasText, gasTitleText,
    hallThrusterOff, hallThrusterPrimaryText, hallThrusterPrimaryTitleText,
    hallThrusterOn, hallThrusterSecondaryOffText, hallThrusterSecondaryOnText, clickHollowCathodeGuideText,
    heat, heatKeeperErrorSubText, heatKeeperErrorText, heatKeeperErrorTitleText, heatSubText, heatText, heatTitleText,
    keeper, keeperSubText, keeperText, keeperTitleText,
    plasma, plasmaSubText, plasmaText, plasmaTitleText,
    recapText,
    path_electron,
    path_ionized_xenon,
    path_lm_csv,
    path_xenon
} from "./Galactic";

import {Link} from "react-router-dom";

/// CONSTANTS ///
// Testing?/unknown //
const {promisify} = require('util')
const sleep = promisify(setTimeout)
const path_landing_page_URL = "/hollow-cathode-visualization";

// Image Paths //
const path_hall_thruster = "/hollow-cathode-visualization/images/big_hall_thruster_off_HDPS125.png";
const path_hall_thruster_on = "/hollow-cathode-visualization/images/big_hall_thruster_ON_HDPS125.png";
// path_lm_csv is in galactic constants since it is also used in Painter.js
//

/**
 * Learning mode element
 * Should be rendered inside a <div id={"canvasHolder"}>
 * also with props: id={"LearningMode"} deltastage={base} scene={[true,false,false,false,false,false,false,false]}
 */
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
        // this.canvas4 = React.createRef();
        // this.canvas5 = React.createRef();
        //
        // //Hall Thruster Canvases:
        // this.canvas6 = React.createRef();   //Hall Thruster OFF
        // this.canvas7 = React.createRef();   //Hall Thruster ON

        // bind handler function(s)
        this.HeatInsertToggle_HandleClick = this.HeatInsertToggle_HandleClick.bind(this);
        this.GasFeedToggle_HandleClick = this.GasFeedToggle_HandleClick.bind(this);
        this.KeeperElectrodeToggle_HandleClick = this.KeeperElectrodeToggle_HandleClick.bind(this);
        this.nextButton_plasma_HandleClick = this.nextButton_plasma_HandleClick.bind(this);
        this.nextButton_eject_HandleClick = this.nextButton_eject_HandleClick.bind(this);
        this.hallThrusterToggle_HandleClick = this.hallThrusterToggle_HandleClick.bind(this);
        this.nextButton_hallThrusterToShell_HandleClick = this.nextButton_hallThrusterToShell_HandleClick.bind(this);
        this.nextButton_shellToLearningModeCore_HandleClick = this.nextButton_shellToLearningModeCore_HandleClick.bind(this);
        this.nextButton_end_HandleClick = this.nextButton_end_HandleClick.bind(this);


        // initialize state
        this.state = { deltastage: props.deltastage, scene: props.scene, titleText:hallThrusterPrimaryTitleText, text: hallThrusterPrimaryText, thrusterButtonText: "On"};

        // MANUAL OVERRIDE //
        let newScene = this.state.scene;
        newScene[hallThrusterOn] = false;
        this.state = { deltastage: props.deltastage, scene: newScene, titleText:hallThrusterPrimaryTitleText, text: hallThrusterPrimaryText, thrusterButtonText: "On"};

        // reload page bug temporary fix
        try{
            this.state.canvas_height = document.getElementById("page-container").clientHeight;
            this.state.canvas_width = document.getElementById("page-container").clientWidth;
        }catch(exception){
            document.location.href=path_landing_page_URL;
        }


        window.addEventListener('resize', () => {
            this.painter.killProtoParticle();

            this.setState({
                canvas_height: window.innerHeight * 0.8,
                canvas_width: window.innerWidth
            }, this.scenarioRefresh);
        });
    }

    componentWillUnmount() {
        this.hideElement("hallThrusterOn-fadeIn");
        this.hideElement("hallThrusterOn-fadeOut");

        window.removeEventListener('resize', () => {
            this.painter.killProtoParticle();

            this.setState({
                canvas_height: window.innerHeight * 0.8,
                canvas_width: window.innerWidth
            }, this.scenarioRefresh);
        });
        this.painter.killProtoParticle();
    }



    /**
     * Hides the element with the given id
     * @param elementId id of element to hide
     */
    hideElement(elementId){
        document.getElementById(elementId).style.display = 'none';
    }
    /**
     * Shows the element with the given id
     * @param elementId id of element to show
     */
    showElement(elementId){
        document.getElementById(elementId).style.display = 'flex';
    }

    /**
     * //:unused?
     *
     * @param elementId
     * @returns {boolean}
     */
    isElementShown(elementId){
        if(document.getElementById(elementId).style.display === 'flex') {
            return true;
        }
        else{
            return false;
        }
    }

    delay(time) {
        return new Promise(resolve => setTimeout(resolve, time));
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
        const ctx3 = this.canvas3.current.getContext('2d'); // labels = 3;
        // const ctx4 = this.canvas4.current.getContext('2d'); // keeper = 4;
        // const ctx5 = this.canvas5.current.getContext('2d'); // eject = 5;
        // const ctx6 = this.canvas6.current.getContext('2d'); // Hall Thruster OFF = 6;
        // const ctx7 = this.canvas7.current.getContext('2d'); // Hall Thruster ON = 7;

        document.getElementById("HallThrusterNext").onclick = this.nextButton_hallThrusterToShell_HandleClick;
        document.getElementById("HallThrusterNext_Accessible").onclick = this.nextButton_hallThrusterToShell_HandleClick;

        // this.layers = [ctx0, ctx1, ctx2, ctx3, ctx4, ctx5, ctx6, ctx7]; // layers[base = 0, heat = 1, gas = 2, plasma = 3, keeper = 4, eject = 5, thruster off = 6, thruster on = 7];
        this.layers = [ctx0, ctx1, ctx2, ctx3]; // layers[base = 0, heat = 1, gas = 2, labels = 3; (new)
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

        //**// hallThrusterOff tells us it is this scene
        //**// hallThrusterOn toggles the thruster


        /*// Learning Mode Intro first slide/stage/scene //*/
        if(this.state.scene[hallThrusterOff] === true && this.state.deltastage === hallThrusterOff){
            this.hideElement("toggleButtonGroup");
            this.hideElement("summaryButton_");
        }

        // did the user just turn ON the thrusters?
        if(this.state.scene[hallThrusterOn] === true && this.state.deltastage === hallThrusterOn){
            this.showElement("hallThrusterOn-fadeIn");
            this.hideElement("hallThrusterOn-fadeOut");

            this.showElement("hallThrusterOnLabelDiv");
            this.showElement("clickHollowCathodeGuideText");
            this.hideElement("hallThrusterOffLabelDiv");

            this.setState({thrusterButtonText: "Off"});
        }

        // did the user just turn OFF the thrusters?
        if(this.state.scene[hallThrusterOn] === false && this.state.deltastage === hallThrusterOn){
            this.hideElement("hallThrusterOn-fadeIn");
            this.showElement("hallThrusterOn-fadeOut");

            this.hideElement("hallThrusterOnLabelDiv");
            this.showElement("hallThrusterOffLabelDiv");
            this.showElement("clickHollowCathodeGuideText");

            this.setState({thrusterButtonText: "On"});
        }



        /*// Learning Mode core first stage/scene //*/
        // if basedrawing is active
        if(this.state.scene[base] === true){
            this.painter.draw_csv_Base_Drawing()
            // this.painter.clearCanvas(hallThrusterOn)
            // this.painter.clearCanvas(hallThrusterOff)


            // if the user just toggled basedrawing
            if(this.state.deltastage === base || this.state.deltastage === hallThrusterOn || this.deltastage === hallThrusterOff){
                // this.painter.draw_csv_Base_Drawing_guide();
                this.setState({titleText: cathodeCSVTitleText, text: cathodeCSVText, subText: cathodeCSVSubText})
            }

            this.hideElement("hallThruster")
            this.showElement("particleKey")

        }
        //hide some elements that shouldn't be seen outside cross-sectional view
        else if(this.state.scene[base] === false)
        {
            this.hideElement("baseCathode-fadeIn");
            this.hideElement("baseCathode-fadeOut");
            this.hideElement("thrusterAndCathode-fadeOut");
            this.hideElement("baseCathode")

            // the user deselected this option/layer
            if (this.state.deltastage === base){
                this.painter.clearCanvas(this.state.deltastage);

                this.setState({titleText: "", text: "", subText: ""})
            }
        }

        // if keeper electrode is active
        if(this.state.scene[keeper] === true){
            this.painter.draw_csv_keeper_electrode();
            let t = document.getElementById("GasFeedToggle")
            if(t.classList.contains("disabled"))
                t.classList.remove("disabled")
            t = document.getElementById("HeatInsertToggle")
            if(t.classList.contains("disabled"))
                t.classList.remove("disabled")
            t = document.getElementById("KeeperElectrodeToggle")
            if(t.classList.contains("disabled"))
                t.classList.remove("disabled")
            // if the user just toggled the keeper electrode
            if(this.state.deltastage === keeper){

                this.setState({titleText: keeperTitleText, text: keeperText, subText: keeperSubText})
            }
        }
        // if the user deselected this option/layer
        else if (this.state.deltastage === keeper){
            this.painter.clearCanvas(this.state.deltastage);
            this.painter.stopEjecting();

            this.setState({titleText: "", text: "", subText: ""}); // clear text
        }

        // if heat insert is active
        if(this.state.scene[heat] === true){
            let t = document.getElementById("GasFeedToggle")
            if(t.classList.contains("disabled"))
                t.classList.remove("disabled")
            t = document.getElementById("HeatInsertToggle")
            if(t.classList.contains("disabled"))
                t.classList.remove("disabled")
            t = document.getElementById("KeeperElectrodeToggle")
            if(t.classList.contains("disabled"))
                t.classList.remove("disabled")
            this.painter.draw_csv_Heat_Insert();

            // if the user just toggled heat insert
            if(this.state.deltastage === heat) {

                this.setState({titleText: heatTitleText, text: heatText, subText: heatSubText})
            }
        }
        // if the user deselected this option/layer
        else if (this.state.deltastage === heat){

            this.painter.killElectronGenerator();
            this.painter.clearCanvas(this.state.deltastage);

            this.setState({titleText: "", text: "", subText: ""})
        }

        // if gas feed is active
        if(this.state.scene[gas] === true){
            this.painter.draw_csv_gas_feed();
            let t = document.getElementById("GasFeedToggle")
            if(t.classList.contains("disabled"))
                t.classList.remove("disabled")
            t = document.getElementById("HeatInsertToggle")
            if(t.classList.contains("disabled"))
                t.classList.remove("disabled")
            t = document.getElementById("KeeperElectrodeToggle")
            if(t.classList.contains("disabled"))
                t.classList.remove("disabled")

            // if the user just toggled the gas feed
            if(this.state.deltastage === gas){

                this.setState({titleText: gasTitleText, text: gasText, subText: gasSubText})
            }
        }
        // if the user deselected this option/layer
        else if (this.state.deltastage === gas){
            this.painter.killXenonGenerator();
            this.painter.clearCanvas(this.state.deltastage);

            this.setState({titleText: "", text: "", subText: ""})
        }

        // INTERNAL PLASMA // -----------
        // if internal plasma is true
        if(this.state.scene[plasma]){
            if(this.state.scene[heat] && this.state.scene[gas]){
                this.painter.draw_csv_internal_plasma();

                // if the user  just triggered the internal plasma
                if(this.state.deltastage === plasma){
                    this.setState({titleText: plasmaTitleText, text: plasmaText, subText: plasmaSubText})
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
                // this.painter.clearCanvas(plasma);
                this.hideElement("toggleButtonGroup");
                this.showElement("nextButton");
                document.getElementById('nextButton').style.display='block';
                document.getElementById("nextButton").onclick = this.nextButton_plasma_HandleClick;
            }
        }
        // if plasma is false and deltastage is plasma
        else if (this.state.deltastage === plasma){
            // the user deselected this option/layer
            // this.painter.clearCanvas(this.state.deltastage);
            this.painter.stopIonizing();

            this.setState({titleText: "", text: "", subText: ""})
        }

        // EJECT PLASMA // -----------
        if(this.state.scene[eject]){
            if(this.state.scene[heat] && this.state.scene[gas] && this.state.scene[plasma] && this.state.scene[keeper]){
                // this.painter.draw_csv_eject_plasma();

                // if the user just triggered eject plasma
                if(this.state.deltastage === eject){
                    this.setState({titleText: ejectTitleText, text: ejectText, subText: ejectSubText})
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
                // this.painter.clearCanvas(eject);
                this.hideElement("toggleButtonGroup");
                this.showElement("nextButton");
                this.nextButton_eject_HandleClick(); // skip eject
            }
        }
        // if eject is false and deltastage is plasma
        else if (this.state.deltastage === eject){
            // the user deselected this option/layer
            // this.painter.clearCanvas(this.state.deltastage);
            this.painter.stopEjecting();

            this.setState({titleText: "", text: "", subText: ""})
        }
        //GAS ON, KEEPER ON, NO PLASMA
        if (this.state.scene[gas] === true  && this.state.scene[keeper] === true && this.state.scene[plasma] === false && (this.state.deltastage === gas || this.state.deltastage === keeper)) {
            if(this.state.deltastage === keeper){
                let t = document.getElementById("HeatInsertToggle")
                t.classList.add("disabled")
                t = document.getElementById("GasFeedToggle")
                t.classList.add("disabled")
            }
            else{
                let t = document.getElementById("HeatInsertToggle")
                t.classList.add("disabled")
                t = document.getElementById("KeeperElectrodeToggle")
                t.classList.add("disabled")

            }
            this.setState({titleText: gasKeeperErrorTitleText, text: gasKeeperErrorText, subText: gasKeeperErrorSubText});

        }

        //HEAT ON, KEEPER ON, NO PLASMA
        if(this.state.scene[heat] && this.state.scene[keeper] && !this.state.scene[plasma] && (this.state.deltastage === heat || this.state.deltastage === keeper)) {
            this.setState({titleText: heatKeeperErrorTitleText, text: heatKeeperErrorText, subText: heatKeeperErrorSubText})
            if(this.state.deltastage === keeper){
                let t = document.getElementById("HeatInsertToggle")
                t.classList.add("disabled")
                t = document.getElementById("GasFeedToggle")
                t.classList.add("disabled")
            }
            else{
                let t = document.getElementById("GasFeedToggle")
                t.classList.add("disabled")
                t = document.getElementById("KeeperElectrodeToggle")
                t.classList.add("disabled")

            }
        }

        //TODO this is likely not a good solution for checking the user has completed learning mode
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

        if(newScene[heat] === true){
            document.getElementById("HeatInsertToggle").classList.replace("notActive", "active");
        } else {
            document.getElementById("HeatInsertToggle").classList.replace("active", "notActive");
        }

        // change the current state, refresh scenario in callback to synchronously update the visuals after the state has changed
        this.setState((state, props) => {
            return { deltastage: heat, scene: newScene };
        }, () => {this.scenarioRefresh()});
    }

    /**
     * GasFeedToggle_HandleClick()
     * Onclick handler for the gas feed toggle button
     */
    GasFeedToggle_HandleClick() {
        let newScene = this.state.scene;
        newScene[gas] = !newScene[gas];

        if(newScene[gas] === true){
            document.getElementById("GasFeedToggle").classList.replace("notActive", "active");
        } else {
            document.getElementById("GasFeedToggle").classList.replace("active", "notActive");
        }

        // change the current state, refresh scenario in callback to synchronously update the visuals after the state has changed
        this.setState((state, props) => {
            return { deltastage: gas, scene: newScene };
        }, () => {this.scenarioRefresh()});
    }

    /**
     * KeeperElectrodeToggle_HandleClick()
     * Onclick handler for the keeper electrode toggle button
     */
    KeeperElectrodeToggle_HandleClick() {
        let newScene = this.state.scene;
        newScene[keeper] = !newScene[keeper];

        if(newScene[keeper] === true){
            document.getElementById("KeeperElectrodeToggle").classList.replace("notActive", "active");
        } else {
            document.getElementById("KeeperElectrodeToggle").classList.replace("active", "notActive");
        }

        // change the current state, refresh scenario in callback to synchronously update the visuals after the state has changed
        this.setState((state, props) => {
            return { deltastage: keeper, scene: newScene };
        }, () => {this.scenarioRefresh()});
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
     * nextButton_shellToLearningModeCore_HandleClick() //:unused?
     */
    async triggerZoom() {

    }
    async nextButton_shellToLearningModeCore_HandleClick() {

        // trigger zoom animation
        document.getElementById("shellToCrossZoom").classList.add("shellToCrossZoomAnimationClass");
        this.hideElement("hallThruster");
        this.showElement("shellToCrossZoom");

        await this.delay(1300);

        this.hideElement("shellToCrossZoom");
        this.showElement("shellFadeOut");

        this.hideElement("hallThrusterButtonGroup");
        this.showElement("toggleButtonGroup");

        this.hideElement("hallThrusterButtonGroup");

        this.hideElement("HallThrusterNext");

        this.hideElement("hallThrusterOn-fadeIn")
        this.hideElement("hallThrusterOn-fadeOut")

        this.setState((state, props) => {
            return { deltastage: base, scene: [true,false,false,false,false,false,false,false] };
        }, () => {this.scenarioRefresh()});
    }

    /**
     * nextButton_hallThrusterToShell_HandleClick()
     */
    nextButton_hallThrusterToShell_HandleClick() {
        this.hideElement("hallThrusterOffLabelDiv");
        this.hideElement("hallThrusterOnLabelDiv");
        this.hideElement("clickHollowCathodeGuideText");

        // transition out of "on" state before zooming
        this.hideElement("hallThrusterOn-fadeIn");
        this.hideElement("hallThrusterOn-fadeOut");

        let nextButton = document.getElementById("HallThrusterNext");
        let nextButton_Accessible = document.getElementById("HallThrusterNext_Accessible");


        nextButton.classList.replace("CathodeHitBox_zoomed_out", "CathodeHitBox_zoomed_in");
        nextButton.onclick = this.nextButton_shellToLearningModeCore_HandleClick;
        nextButton_Accessible.onclick = this.nextButton_shellToLearningModeCore_HandleClick;

        // trigger zoom animation
        document.getElementById("hallThruster").classList.add("hallThrusterToCathodeZoom");

        this.hideElement("HallThrusterToggle");

        this.setState((state, props) => {
            return { deltastage: hallThrusterOff, scene: [false,false,false,false,false,false,false,false], titleText: cathodeShellPrimaryTitleText, text: cathodeShellPrimaryText};
        }, () => {this.scenarioRefresh()});
    }

    hallThrusterToggle_HandleClick() {
        let newScene = this.state.scene;
        newScene[hallThrusterOn] = !newScene[hallThrusterOn];

        let newThrusterButtonText = "";

        // did the user just turn ON the thrusters?
        if(newScene[hallThrusterOn] === true){
            newThrusterButtonText = "Off";
        }

        // did the user just turn OFF the thrusters?
        if(newScene[hallThrusterOn] === false){
            newThrusterButtonText = "On";
        }

        this.setState((state, props) => {
            return { deltastage: hallThrusterOn, scene: newScene, thrusterButtonText: newThrusterButtonText };
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
        this.showElement("summaryButton_")


        newScene[eject] = !newScene[eject];
        this.hideElement('nextButton');
        this.showElement('summaryButton');

        this.setState((state, props) => {
            return { deltastage: eject, scene: newScene };
        }, () => {this.scenarioRefresh()});
    }

    /**
     * nextButton_end_HandleClick()
     * Onclick handler for the "next" button for the eject plasma scene's ending
     * this leads to the view were we show them some links to follow and such
     */
    /**
     * LINK TO SUMMARY PAGE HERE!!!! //:debug?
     */
    nextButton_end_HandleClick() {
        this.hideElement('nextButton');
        this.showElement('summaryButton');

        this.setState({text: recapText})
    }

    /**
     * getLayer(layer)
     * @param layer layer number which you want to get
     * @returns ctx 2d canvas context for that layer
     */
    getLayer(layer){
        return this.layers[layer];
    }

    render(){
        return (
            <div id={'canvasHolder'}>
                <canvas id={"canvas0"} ref={this.canvas0} className={"canvas unselectable"} width={this.state.canvas_width} height={this.state.canvas_height} deltastage={this.state.deltastage} scene={this.state.scene} > This webapp is not supported on your current browser, please try again with a different browser. </canvas>
                <canvas id={"canvas1"} ref={this.canvas1} className={"canvas unselectable"} width={this.state.canvas_width} height={this.state.canvas_height} deltastage={this.state.deltastage} scene={this.state.scene} > </canvas>
                <canvas id={"canvas2"} ref={this.canvas2} className={"canvas unselectable"} width={this.state.canvas_width} height={this.state.canvas_height} deltastage={this.state.deltastage} scene={this.state.scene} > </canvas>
                <canvas id={"canvas3"} ref={this.canvas3} className={"canvas unselectable"} width={this.state.canvas_width} height={this.state.canvas_height} deltastage={this.state.deltastage} scene={this.state.scene} > </canvas>
                {/*<canvas id={"canvas4"} ref={this.canvas4} className={"canvas unselectable"} width={this.state.canvas_width} height={this.state.canvas_height} deltastage={this.state.deltastage} scene={this.state.scene} > </canvas>*/}
                {/*<canvas id={"canvas5"} ref={this.canvas5} className={"canvas unselectable"} width={this.state.canvas_width} height={this.state.canvas_height} deltastage={this.state.deltastage} scene={this.state.scene} > </canvas>*/}
                {/*<canvas id={"canvas6"} ref={this.canvas6} className={"canvas unselectable"} width={this.state.canvas_width} height={this.state.canvas_height} deltastage={this.state.deltastage} scene={this.state.scene} > </canvas>*/}
                {/*<canvas id={"canvas7"} ref={this.canvas7} className={"canvas unselectable"} width={this.state.canvas_width} height={this.state.canvas_height} deltastage={this.state.deltastage} scene={this.state.scene} > </canvas>*/}

                <img id={"hallThruster"} src={path_hall_thruster} className={" "} alt={"Hall Thruster Off"}/>

                <img id={"hallThrusterOn-fadeIn"} src={path_hall_thruster_on} className={"fade-in  "} alt={"Hall Thruster On: Fade In"}/>
                <img id={"hallThrusterOn-fadeOut"} src={path_hall_thruster_on} className={"fade-out  "} alt={"Hall Thruster On: Fade Out"}/>

                <img id={"shellToCrossZoom"} src={path_hall_thruster} className={"shellToCrossZoomAnimation"} alt={"Cathode shell to cathode cross section zoom"}/>
                <img id={"shellFadeOut"} src={path_hall_thruster} className={" shell-fade-out"} alt={"Cathode shell fade out"}/>

                <img id={"baseCathode-fadeIn"} src={path_lm_csv} className={"fade-in"} alt={"Hollow Cathode: Fade In"}/>
                <img id={"baseCathode-fadeOut"} src={path_lm_csv} className={"fade-out"} alt={"Hollow Cathode: Fade Out"}/>
                <img id={"thrusterAndCathode-fadeOut"} src={path_hall_thruster} className={"fade-out"} alt={"Thruster and Cathode: Fade Out"}/>
                <img id={"baseCathode"} src={path_lm_csv} alt={"Base Hollow Cathode"}/>

                <button id={"HallThrusterNext"}
                        className={"CathodeHitBox_zoomed_out"}>
                </button>

                <div id={"backToLandingPageButtonDiv"} className={"stackedButtonGroup bottomleftAlign"} >
                    <Link to={'/hollow-cathode-visualization/'}>
                        <button id={"backButton"} className={"button"}> Back to Landing Page </button>
                    </Link>
                </div>

                <div id={"hallThrusterButtonGroup"} className={"stackedButtonGroup bottomrightAlign"}>
                    <button id={"HallThrusterNext_Accessible"}
                            className={"button"}> Next
                    </button>
                    <button id={"HallThrusterToggle"}
                            className={"button"}
                            onClick={this.hallThrusterToggle_HandleClick}> Turn Power {this.state.thrusterButtonText}
                    </button>
                </div>

                {/*Hall thruster powered on label/title text*/}
                <div id={"hallThrusterOffLabelDiv"}>
                    <label id={"hallThrusterOffLabel"}
                           className={"titleLabel hallThrusterOffTitleLabelPos  "}> The Hall Thruster Is Off
                    </label>
                    <label id={"hallThrusterOffSublabel"}
                           className={"sublabel hallThrusterOffSublabelPos  "}>
                        {hallThrusterSecondaryOffText}
                    </label>
                </div>

                {/*Hall thruster powered on label/title text*/}
                <div id={"hallThrusterOnLabelDiv"}>
                    <label id={"hallThrusterOnLabel"}
                           className={"titleLabel hallThrusterOffTitleLabelPos  "}> The Hall Thruster Is On
                    </label>
                    <label id={"hallThrusterOnSublabel"}
                           className={"sublabel hallThrusterOffSublabelPos  "}>
                        {hallThrusterSecondaryOnText}
                    </label>
                </div>


                <div id={"hallThrusterNameLabelDiv"}>
                    <label id={"hallThrusterNameLabel"}
                           className={"titleLabel hallThrusterNameTitleLabelPos"}> {this.state.titleText}
                    </label>
                    <label id={"hallThrusterNameSublabel"}
                           className={"sublabel hallThrusterNameSublabelPos"}>
                        {this.state.text}
                        <p><b className={"thrusterGuideText"}>{this.state.subText}</b></p>
                    </label>
                </div>

                <label id={"clickHollowCathodeGuideText"}
                       className={"clickHollowCathodeGuideText clickHollowCathodeGuideTextPos  "}>
                    {clickHollowCathodeGuideText}
                </label>

                <div id={"toggleButtonGroup"} className={"stackedButtonGroup bottomrightAlign  "}>

                    <div id={"particleKey"} className={"mrow"}>
                        <div className={"mmrow"}>
                            <img src={path_electron} alt={"Electron image alt text"} className={"keyImage electronKey"}/>
                            <p className={"keyLabel"}>Electron</p>
                        </div>
                        <div className={"mmrow"}>
                            <img src={path_xenon} alt={"Xenon image alt text"} className={"keyImage xenonKey"}/>
                            <p className={"keyLabel"}>Xenon</p>
                        </div>
                        <div className={"mmrow"}>
                            <img src={path_ionized_xenon} alt={"Ionized Xenon image alt text"} className={"keyImage xenonKey"}/>
                            <p className={"keyLabel"}>Ionized Xenon</p>
                        </div>
                    </div>

                    <button id={"HeatInsertToggle"}
                            className={"button notActive"}
                            onClick={this.HeatInsertToggle_HandleClick}> Toggle Heaters
                    </button>
                    <button id={"GasFeedToggle"}
                            className={"button notActive"}
                            style={{display: "block"}}
                            onClick={this.GasFeedToggle_HandleClick}> Toggle Gas Feed
                    </button>
                    <button id={"KeeperElectrodeToggle"}
                            className={"button notActive"}
                            onClick={this.KeeperElectrodeToggle_HandleClick}> Toggle Keeper Electrode
                    </button>
                </div>
                <button id={"nextButton"}
                        className={"button stackedButtonGroup bottomrightAlign"}
                        style={{display: "none"}}> Next
                </button>

                <Link to={'/summary'} id={'summaryButton'}>
                    <button id={'summaryButton_'} className={"button stackedButtonGroup bottomCenterAlign"} hidden={true}>
                        Summary
                    </button>
                </Link>
            </div>
        )
    }
}

export default LearningMode;
