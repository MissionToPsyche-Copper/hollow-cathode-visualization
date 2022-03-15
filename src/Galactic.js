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

export const hallThrusterPrimaryText = "The large circular component to the left is a Hall thruster. There are multiple of these on the spacecraft and they’re responsible for propelling the spacecraft through outer space. The Hall thruster produces thrust by ionizing particles and shooting them away from the spacecraft at incredibly high speeds."

export const hallThrusterSecondaryOnText = "The particles are the Hall thruster's propellant. While particles are being stored, they are neutral, so they don't react with electric fields like magnets, and thus are easy to store. When the spacecraft needs to use gas particles, the spacecraft ionizes particles so that they can react to electromagnetic fields. The hall thruster generates an extremely strong magnetic field which attracts the particles from inside the thruster and shoots ions out and away from the spacecraft at hundreds of kilometers a second. This interaction is like trying to stick the wrong ends of two strong magnets together. \n" +
    "\n" +
    "The unit slightly above the Hall thruster is called a hollow cathode. It is responsible for supplying the hall thruster with the plasma needed to ionize its fuel. \n" +
    "\n" +
    "In order to ionize a particle, we need electrons or other ionized particles. For this, we need the hollow cathode. "
export const hallThrusterSecondaryOffText = "The particles are the Hall thruster's propellant. While particles are being stored, they are neutral, so they don't react with electric fields like magnets, and thus are easy to store. When the spacecraft needs to use gas particles, the spacecraft ionizes particles so that they can react to electromagnetic fields. The hall thruster generates an extremely strong magnetic field which attracts the particles from inside the thruster and shoots ions out and away from the spacecraft at hundreds of kilometers a second. This interaction is like trying to stick the wrong ends of two strong magnets together. \n" +
    "\n" +
    "The unit slightly above the Hall thruster is called a hollow cathode. It is responsible for supplying the hall thruster with the plasma needed to ionize its fuel. \n" +
    "\n" +
    "In order to ionize a particle, we need electrons or other ionized particles. For this, we need the hollow cathode. "

export const cathodeShellPrimaryTitleText = "This is a Hollow Cathode"
export const cathodeShellPrimaryText = "This is a hollow cathode; it has two main jobs when it comes to propelling the Psyche spacecraft. Its first job is to emit a stream of electrons which are then pulled in and trapped by the hall thruster’s magnetic fields and used to accelerate propellant in order to make thrust. \n" +
    "\n" +
    "The other job of the hollow cathode is to neutralize the ions ejected by the Hall thruster as they fly away from the spacecraft. \n" +
    "\n" +
    "Without the hollow cathode, when the Hall thruster emits plasma, the Hall thruster is negatively charging the entire rocket. This phenomenon can cause spacecraft erosion and reduce the thrust force. \n" +
    "\n" +
    "Ionized particles react to electromagnetic fields, so if allowed to move freely in space, they may end up sticking to other parts of the spacecraft or interfering with its sensors. Particles sticking to spacecraft can also cause erosion or even reduce the amount of thrust the hall thrusters generate, so this job is equally as important. As particles are ejected from the Hall thruster, the hollow cathode neutralizes them by emitting a stream of electrons and ionized xenon particles which neutralize particles leaving the hall thruster."

export const cathodeCSVTitleText = "Now you can see Inside the Hollow Cathode"
export const cathodeCSVText = "The operation of the hollow cathode can be broken down into 3 main functions, which you can control via the buttons at the bottom right. These functions are labeled “toggle heater”, “toggle gas feed”, and “toggle keeper electrode”. You can enable and disable the three main operations for the hollow cathode by pressing the buttons below.  \n" +
    "\n" +
    "Our end goal is to get the hollow cathode fully operating again. To do this, we first need to make a hot plasma out of electrons and ionized xenon in the cathode tube and then eject it for the Hall thruster. To give a place to start, the cathode inserts are the most important component of the hollow cathode. "

export const heatTitleText = "Heating the Inserts"
export const heatText = "Heaters are coiled around the cathode tube and are responsible for heating up the cathode insert to extreme temperatures of at least at 1200 degrees Celsius (or 2192 degrees Fahrenheit). Heaters are surrounded by a heat shield to trap heat in and protect other electrical components from the extreme heat generated by the inserts. The insert is made of a special material which can emit electrons at high temperatures. The insert is placed inside of the hollow cathode and pushed against the orifice; it is labeled to the left.";

export const gasTitleText2 = "Turning on the Gas Feed"
export const gasText = "The role of the gas feed is to inject Xenon gas into the cathode tube. This Xenon is neutral, meaning it doesn’t react to electric or magnetic fields until the Xenon atom collides and gains electrons, becoming a negatively charged particle. This process is called ionization. Since Xenon becomes a negatively charged particle in this process, it can be attracted by positive voltage or magnetic field.";

export const plasmaTitleText = "Plasma Forms inside the Cathode Tube"
export const plasmaText = "The xenon gas injected near the insert is ionized by the emitted electrons to form an extremely hot plasma containing ions and more electrons.";

export const keeperTitleText = "The Keeper Electrode"
export const keeperText = "A positive voltage is placed on the keeper electrode, which pulls the electrons out of the orifice at the end of the cathode where they can then be used by the Hall thruster. ";

export const ejectTitleText = "Ejecting Plasma via the Keeper Electrode"
export const ejectText = "The plasma is pushed out of the cathode tube. This hot plasma of ions and electrons neutralizes ions as they are ejected from the Hall thruster and many of the electrons are pulled into the Hall thruster and used to ionize its propellant. ";

export const recapTitleText = "A Quick Recap"
export const recapText = "First, a heater heats the cathode insert until it begins to emit electrons. Next, gas is injected near the insert and is ionized by the emitted electrons to form a plasma of ions and even more electrons. Lastly, a positive voltage is placed on the keeper electrode, pulling the electrons particles out of the end of the cathode where they can then be used by the Hall thruster. The hollow cathode is a critical component of the Hall thruster as it provides electrons needed to ionize its propellant and also neutralizes the ionized propellant as it leaves the thruster such that it doesn’t negatively affect the spacecraft. ";

export const linksTitleText = "Learn about Psyche!"
export const linksText = "Sample text for the links page";
export const link1url = "https://psyche.asu.edu/";
export const link2url = "https://psyche.asu.edu/";
export const link3url = "https://psyche.asu.edu/";

export const heatKeeperErrorTitleText = "Heat Keeper Error"
export const heatKeeperErrorText = " Heat Keeper Error Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum";
export const gasKeeperErrorText = " Gas Keeper Error Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum";
