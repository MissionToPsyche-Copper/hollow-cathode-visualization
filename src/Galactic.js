// Huy's Dimensions
export const canvas_height = 600;
export const canvas_width = 940;
// Jack's Dimensions
// export const canvas_height = 750;
// export const canvas_width = 1600;

/**
 * Mapping layers via constants
 * These should always be used to reference layers when used as parameters to a function or when interacting with this.state.
 * This allows us to easily add and remove layers.
 */
export const base = 0;          // ctx0 // scene[base]
export const heat = 0;          // ctx1 // scene[heat]
export const gas = 0;           // ctx2 // scene[gas]
export const plasma = 0;        // ctx3 // scene[plasma]
export const keeper = 0;        // ctx4 // scene[keeper]
export const eject = 0;         // ctx5 // scene[eject]