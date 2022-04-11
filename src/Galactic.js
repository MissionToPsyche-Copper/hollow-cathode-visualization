// // Huy's Dimensions
// export const canvas_height = 600; // becoming depreciated
// export const canvas_width = 940; // becoming depreciated
// Jack's Dimensions
export const canvas_height = 750; // hopefully completely depreciated
export const canvas_width = 1600; // hopefully completely depreciated

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

// Relative Dimensions //
// cathode tube relative position modifiers (how we place the box on the screen relative to the canvas size
// size/location of the ______ relative to the width/height of the window
export const right_of_cathode_constant = 0.35;
export const left_of_cathode_constant = 0.20;
export const top_of_cathode_constant = 0.39;
export const bottom_of_cathode_constant = 0.49;
export const particle_right_bounding_box = 1.00;
//

// Image Paths //
export const path_lm_csv = "/hollow-cathode-visualization/images/cross_sectional_view.png";
//



// Text //
export const hallThrusterPrimaryText = "The large circular piece here is a Hall thruster, which propels the spacecraft through outer space by ionizing particles and shooting them out of the spacecraft."

export const hallThrusterSecondaryOnText = "The blue plasma coming out of the Hall thruster propels the spacecraft through outer space. The Hall thruster shoots out tiny particles, called ions, out of the spacecraft at very high speeds.\n" +
    "\n" +
    "For the Hall thruster to work, it needs tiny particles called electrons. These electrons charge, or ionize, the ions so they can shoot out of the spacecraft. To generate the electrons, we need a hollow cathode. The hollow cathode is the component right above the hall thruster.\n" +
    "\n" +
    "Click on the hollow cathode above the hall thruster to learn more about it. "
export const hallThrusterSecondaryOffText = "The blue plasma coming out of the Hall thruster propels the spacecraft through outer space. The Hall thruster shoots out tiny particles, called ions, out of the spacecraft at very high speeds.\n" +
    "\n" +
    "For the Hall thruster to work, it needs tiny particles called electrons. These electrons charge, or ionize, the ions so they can shoot out of the spacecraft. To generate the electrons, we need a hollow cathode. The hollow cathode is the component right above the hall thruster.\n" +
    "\n" +
    "Click on the hollow cathode above the hall thruster to learn more about it. "
export const cathodeShellPrimaryTitleText = "This is a Hollow Cathode"
export const cathodeShellPrimaryText = "The hollow cathode has two jobs that both help the hall thruster work.\n" +
    "\n" +
    "The first job helps the hall thruster propel the spacecraft through outer space. To do this, the hollow cathode lets out some electrons, which are used to make the ions that the hall thruster emits." +
    "\n" +
    "The second job of the hollow cathode is to neutralize the ions that the hall thruster shoots out of the spacecraft.\n" +
    "\n" +
    "Click on the hollow cathode or press the next button below to explore how the hollow cathode performs its jobs."

export const cathodeCSVTitleText = "Inside the Hollow Cathode"
export const cathodeCSVText = "The hollow cathode has three pieces that help it work: the heaters, the gas feed, and the keeper electrode. You can turn them on and off with the buttons at the bottom of the screen.\n"
    +"\n"+
    "Let’s try to get the hollow cathode working! \n"
    +"\n"+
    "First, let’s toggle the heaters to turn them on. "

export const heatTitleText = "Heating the Inserts"
export const heatText = "The heaters are the small white circles around the inner edges of the hollow cathode. They heat the inserts up to extremely high temperatures, which helps them produce electrons."

export const gasTitleText2 = "Turning on the Gas Feed"
export const gasText = "The gas feed lets tiny particles called Xenon into the hollow cathode and lets them make plasma. Whenever a Xenon particle hits an electron, the Xenon gets charged, or ionized. You can see that happen when the Xenon particles turn from purple to bright blue.\n"
    +"\n"+
    "Click Next to learn what happens when Xenon from the gas feed meets electrons."

export const plasmaTitleText = "Plasma Forms inside the Cathode Tube"
export const plasmaText = "The Xenon particles are ionized to make a steady source of plasma for the Hall thruster to work with. When this happens, more electrons are let into the hollow cathode for the Hall thruster to use. But first, all those electrons need to be pushed out of the hollow cathode so the Hall thruster can access them.\n"
    +"\n"+
    "To do this, let’s turn on the keeper electrode."

/** START HEREEEE **/

export const keeperTitleText = "The Keeper Electrode"
export const keeperText = "A positive voltage is placed on the keeper electrode, which pulls the electrons out of the orifice at the end of the cathode where they can then be used by the Hall thruster [2]. ";

export const ejectTitleText = "Ejecting Plasma via the Keeper Electrode"
export const ejectText = "The plasma is pushed out of the cathode tube. This hot plasma of ions and electrons neutralizes ions as they are ejected from the Hall thruster and many of the electrons are pulled into the Hall thruster and used to ionize its propellant. ";

export const recapTitleText = "A Quick Recap"
export const recapText = "First, a heater heats the cathode insert until it begins to emit electrons. Next, gas is injected near the insert and is ionized by the emitted electrons to form a plasma of ions and even more electrons. Lastly, a positive voltage is placed on the keeper electrode, pulling the electrons particles out of the end of the cathode where they can then be used by the Hall thruster. The hollow cathode is a critical component of the Hall thruster as it provides electrons needed to ionize its propellant and also neutralizes the ionized propellant as it leaves the thruster such that it doesn’t negatively affect the spacecraft. ";

export const linksTitleText = "Learn about Psyche!"
export const linksText = "Sample text for the links page";
export const link1url = "https://psyche.asu.edu/";
export const link2url = "https://psyche.asu.edu/";
export const link3url = "https://psyche.asu.edu/";

export const heatKeeperErrorText = " Heat Keeper Error Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum";
export const gasKeeperErrorText = " Gas Keeper Error Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum";
export const hallThusterOffText = "                        The hollow cathode is a component of the Hall thruster. Its key role is to emit electronic\n" +
    "                        plasma to pull the positive plasma inside the cabin of the Hall thruster, known as the internal\n" +
    "                        plasma. Another role of the hollow cathode, which is not least significant, is to neutralize the\n" +
    "                        rocket. Without the hollow cathode, when Hall thruster emits plasma, the Hall thruster is\n" +
    "                        negatively charging the entire rocket. This phenomenon can cause spacecraft erosion and reduce\n" +
    "                        the thrust force."