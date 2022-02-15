// Huy's Dimensions
export const canvas_height = 600; // becoming depreciated
export const canvas_width = 940; // becoming depreciated
// Jack's Dimensions
// export const canvas_height = 750; // becoming depreciated
// export const canvas_width = 1600; // becoming depreciated

/**
 * Mapping layers via constants
 * These should always be used to reference layers when used as parameters to a function or when interacting with this.state.
 * This allows us to easily add and remove layers.
 */
export const base = 0;              // ctx0 // scene[base]
export const heat = 1;              // ctx1 // scene[heat]
export const gas = 2;               // ctx2 // scene[gas]
export const plasma = 3;            // ctx3 // scene[plasma]
export const keeper = 4;            // ctx4 // scene[keeper]
export const eject = 5;             // ctx5 // scene[eject]
export const hallThrusterOff = 6;   // ctx6 // scene[hallThrusterOff]
export const hallThrusterOn = 7;    // ctx7 // scene[hallThrusterOn]