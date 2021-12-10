import React from "react";
import ReactDOM from "react-dom";
import Painter from "../Painter/painter";
import LearningMode from "../LearningMode/learn";
import PresMode from "../PresentationMode/present";

export default class LandingPage extends React.Component {
    canvas_height='600';
    canvas_width='940';
    constructor(props) {
        super();
        this.canvas_width=props.canvas_width
        this.canvas_height=props.canvas_height
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
        this.painter = new Painter(this.layers, this.canvas_height, this.canvas_width);
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
                <LearningMode id={"LearningMode"} deltastage={0} scene={[true,false,false,false,false,false]}/>
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
                <PresMode id={"presMode"} deltastage={0} scene={[true,false,false,false,false,false]} canvas_height={'600'} canvas_width={'940'}/>
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
                        width={this.canvas_width}
                        height={this.canvas_height}> You need a better browser :(
                </canvas>

                <button id={"PresModeButton"}
                        onClick={this.PresMode_HandleClick}> Presentation Mode
                </button>
            </>
        )
    }
}