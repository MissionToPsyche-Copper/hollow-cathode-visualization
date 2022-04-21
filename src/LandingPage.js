import React from "react";
import Painter from "./Painter";
import {Link} from "react-router-dom";

/// CONSTANTS ///
const path_spacecraft = "/hollow-cathode-visualization/images/spacecraft2.png";
///

/**
 * Site landing page element
 * Should be rendered inside a <div id={"canvasHolder"}>
 */
export class LandingPage extends React.Component {
    constructor(props) {
        super();

        // create a reference to the canvas element
        this.canvas = React.createRef();
    }

    /**
     * componentDidMount()
     * Called when canvas element is mounted on page (canvas element is unusable up until this point)
     */
    componentDidMount() {
        // initialize instance variables for each canvas element/layer
        const ctx0 = this.canvas.current.getContext('2d'); // base = 0;

        this.layers = [ctx0];
        this.painter = new Painter(this.layers);

        this.showElement("landingPageTitleDiv")
        this.showElement("landingPageSubTitleDiv")
        this.showElement("landingPageLModePromptDiv")
    }

    /**
     * @Private
     * getLayer(layer)
     *
     * @param layer layer number which you want to get
     * @returns ctx 2d canvas context for that layer
     */
    getLayer(layer){
        return this.layers[layer];
    }

    /**
     * Hides the element with the given id
     * @param elementId id of element to hide
     */
    hideElement(elementId){
        document.getElementById(elementId).style.display = 'none';
    }
    /**
     * @Private
     * Un-hides the element with the given id
     *
     * @param elementId id of element to show
     */
    showElement(elementId){
        document.getElementById(elementId).style.display = 'flex';
    }

    render() {
        return (
            <div id={'canvasHolder'}>
                <div>
                    <canvas id={"canvas"}
                            onClick={this.LearningMode_HandleClick}
                            ref={this.canvas}
                            className={"unselectable"}
                            hidden={true}> You need a better browser :(
                    </canvas>

                    <Link to={'/learning'}>
                        <img id={'spaceshipImage'} src={path_spacecraft} className={"grow"} alt={"Psyche 16 spacecraft"}/>
                    </Link>

                    <div className={"stackedButtonGroup bottomrightAlign"}>
                        <Link to={'/learning'}>
                            <button id={"LearnModeButton"} className={"button"}>
                                Start Here to Learn
                            </button>
                        </Link>

                        <Link to={'/presentation'}>
                            <button id={"PresModeButton"} className={"button"}>
                                Presentation Mode
                            </button>
                        </Link>
                    </div>

                    <div id={"landingPageTitleDiv"} className={"stackedButtonGroup landingPageTitleAlign"} >
                        <label id={"landingPageTitle"} className={"landingPageTitleLabel"}> Hollow Cathode </label>
                    </div>

                    <div id={"landingPageSubTitleDiv"} className={"stackedButtonGroup landingPageSubTitleAlign"} >
                        <label id={"landingPageSubTitle"} className={"landingPageSubTitleLabel"}> Visualization </label>
                    </div>

                    <div id={"landingPageLModePromptDiv"} className={"stackedButtonGroup landingPageLModePromptAlign"} >
                        <label id={"landingPageLModePrompt"} className={"landingPageLModePromptLabel"}> Click the spacecraft or start button to begin </label>
                    </div>
                </div>
            </div>
        )
    }
}

export default LandingPage;