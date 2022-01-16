import React from "react";
import Painter from "./Painter";
import ReactDOM from "react-dom";
import {base, canvas_height, canvas_width, hallThrusterOff} from "./Galactic";
import PresMode from "./PresMode";
import LearningMode from "./LearningMode";

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
        this.LearningMode_HandleClick = this.LearningMode_HandleClick.bind(this);
        this.PresMode_HandleClick = this.PresMode_HandleClick.bind(this);

        // draw some test text
        this.painter.draw_test();

        //draw spacecraft
        this.painter.draw_spacecraft();
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
     * LearningMode_HandleClick()
     * Onclick handler for the learning mode button on the landing page
     */
    LearningMode_HandleClick() {

        // render learning mode
        ReactDOM.render(
            <div id={"canvasHolder"}>
                <LearningMode id={"LearningMode"} deltastage={hallThrusterOff} scene={[false,false,false,false,false,false,true,false]}/>
            </div>,
            document.getElementById('root')
        );
    }

    /**
     * PresMode_HandleClick()
     * Onclick handler for the learning mode button on the landing page
     */
    PresMode_HandleClick() {

        // render learning mode
        ReactDOM.render(
            <div id={"canvasHolder"}>
                <PresMode id={"presMode"} deltastage={base} scene={[true,false,false,false,false,false,false,false]}/>
            </div>,
            document.getElementById('root')
        );
    }

    render() {
        return (
            <>
                <canvas id={"canvas"}
                        className={"canvas grow"}
                        onClick={this.LearningMode_HandleClick}
                        ref={this.canvas}
                        width={canvas_width}
                        height={canvas_height}> You need a better browser :(
                </canvas>

                <button id={"PresModeButton"}
                        className={"button"}
                        onClick={this.PresMode_HandleClick}> Presentation Mode
                </button>
            </>
        )
    }
}

export default LandingPage;