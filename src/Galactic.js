// // Huy's Dimensions
// export const canvas_height = 600; // becoming depreciated
// export const canvas_width = 940; // becoming depreciated
// Jack's Dimensions

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
export const right_of_cathode_constant = 0.53;
export const left_of_cathode_constant = 0.29;
export const top_of_cathode_constant = 0.532;
export const bottom_of_cathode_constant = 0.71;
export const particle_right_bounding_box = 1.00;
//

// Image Paths //
export const path_lm_csv = "/hollow-cathode-visualization/images/cross_sectional_view.png";
export const path_electron = "/hollow-cathode-visualization/images/electron.png";
export const path_xenon = "/hollow-cathode-visualization/images/xenon.png";
export const path_ionized_xenon = "/hollow-cathode-visualization/images/ionized_xenon.png";
//



// Text //
export const hallThrusterPrimaryTitleText = "This is a Hall Thruster"
export const hallThrusterPrimaryText = <div><p>The large circular piece here is a Hall thruster, which propels the spacecraft through outer space by ionizing particles and shooting them out of the spacecraft.</p></div>

// export const hallThrusterSecondaryOnTitleText = "The Hall thruster is On";
export const hallThrusterSecondaryOnText =
    <div>
        <p>The blue plasma coming out of the Hall thruster propels the spacecraft through outer space. The Hall thruster shoots out tiny particles, called ions, out of the spacecraft at very high speeds.</p>
        <p>For the Hall thruster to work, it needs tiny particles called electrons. These electrons charge, or ionize, the ions so they can shoot out of the spacecraft. To generate the electrons, we need a hollow cathode. The hollow cathode is the component right above the hall thruster.</p>
        <p><b id={"guideText"} className={"guideText"}>Click on the hollow cathode above the hall thruster to learn more about it.</b></p>
    </div>
// export const hallThrusterSecondaryOffTitleText = "The Hall thruster is Off";
export const hallThrusterSecondaryOffText =
    <div>
        <p>The blue plasma coming out of the Hall thruster propels the spacecraft through outer space. The Hall thruster shoots out tiny particles, called ions, out of the spacecraft at very high speeds.</p>
        <p>For the Hall thruster to work, it needs tiny particles called electrons. These electrons charge, or ionize, the ions so they can shoot out of the spacecraft. To generate the electrons, we need a hollow cathode. The hollow cathode is the component right above the hall thruster.</p>
        <p><b id={"guideText"} className={"guideText"}>Click on the hollow cathode above the hall thruster to learn more about it.</b></p>
    </div>
export const cathodeShellPrimaryTitleText = "This is a Hollow Cathode"
export const cathodeShellPrimaryText =
    <div>
        <p>The hollow cathode has two jobs that both help the hall thruster work.</p>
        <p>The first job helps the hall thruster propel the spacecraft through outer space. To do this, the hollow cathode lets out some electrons, which are used to make the ions that the hall thruster emits.</p>
        <p>The second job of the hollow cathode is to neutralize the ions that the hall thruster shoots out of the spacecraft.</p>
        <p><b id={"guideText"} className={"guideText"}>Click on the hollow cathode or press the next button below to explore how the hollow cathode performs its jobs.</b></p>
    </div>

export const cathodeCSVTitleText = "Inside the Hollow Cathode"
export const cathodeCSVText =
    <div>
        <p>The hollow cathode has three pieces that help it work: the heaters, the gas feed, and the keeper electrode. You can turn them on and off with the buttons at the bottom of the screen. Let’s try to get the hollow cathode working!</p>
    </div>
export const cathodeCSVSubText =
    "First, let’s toggle the heaters to turn them on. "

export const heatTitleText = "Heating the Inserts"
export const heatText = <p>The heaters are the small white circles around the inner edges of the hollow cathode. They heat the inserts up to extremely high temperatures, causing them to emit electrons.</p>
export const heatSubText = "";

export const gasTitleText = "Injecting Xenon Gas"
export const gasText = <p>The gas feed lets tiny particles called Xenon into the hollow cathode and lets them make plasma. Whenever a Xenon particle hits an electron, the Xenon gets charged, or ionized. You can see that happen when the Xenon particles turn from purple to bright blue.</p>
export const gasSubText =
    "Click Next to learn what happens when Xenon from the gas feed meets electrons."

export const plasmaTitleText = "Plasma Forms"
export const plasmaText = <p>Plasma Forms inside the Cathode Tube. The Xenon particles are ionized to make a steady source of plasma for the Hall thruster to work with. When this happens, more electrons are let into the hollow cathode for the Hall thruster to use. But first, all those electrons need to be pushed out of the hollow cathode so the Hall thruster can access them.</p>
export const plasmaSubText =
    "To do this, let’s turn on the keeper electrode."

/** START HEREEEE **/

export const keeperTitleText = "The Keeper Electrode"
export const keeperText = <p>You’ve turned on the keeper electrode. Doing this pulls electrons out of the hollow cathode so the hall thruster can use them.</p>
export const keeperSubText = "";

export const ejectTitleText = "Ejecting Plasma"
export const ejectText = <p>You’ve just ejected the plasma! The keeper electrode just pulled all the electrons out of the hollow cathode for the hall thruster to use, while the ionized Xenon particles stay in the hollow cathode so they can be re-used.</p>
export const ejectSubText = "";

export const recapTitleText = "A Quick Recap"
export const recapText =
    <div>
        <p>Congratulations, you got the hollow cathode working! Let’s talk about everything you just did.</p>
        <p>First, you learned that the hollow cathode is an important piece of the Psyche spacecraft, as it lets the hall thruster do its job of propelling the spacecraft through outer space.</p>
        <p>Then, you got the hollow cathode working. To do this, you used the heaters to heat the hollow cathode’s inserts until they generated electrons. Next, you used the gas feed to make electrons ionize the Xenon particles, forming plasma.</p>
        <p>Lastly, you used the keeper electrode to pull all the electrons out of the hollow cathode so the hall thruster could use them.</p>
    </div>

export const linksTitleText = "Learn about Psyche!"
export const linksText = "Sample text for the links page";
export const link1url = "https://asu-hall-thruster-visualization.netlify.app/Home/";
export const link2url = "https://psyche.asu.edu/";
export const link3url = "https://psyche.asu.edu/";

/// Error texts ///
export const heatKeeperErrorTitleText = "!"
export const heatKeeperErrorText =
    <div>
        <p>You’ve turned on the keeper electrode too early!</p>
        <p>Turning on the keeper electrode at the right time pulls enough electrons out of the hollow cathode for the hall thruster to use. Right now, there’s not very many electrons being pulled out of the hollow cathode, so the hall thruster doesn’t have enough electrons to do its job.</p>
    </div>
export const heatKeeperErrorSubText =
    "Try turning off the keeper electrode and using the gas feed to produce more electrons before ejecting them."

export const gasKeeperErrorTitleText = "!"
export const gasKeeperErrorText =
    <div>
        <p>You’ve turned on the keeper electrode too early!</p>
        <p>Turning on the keeper electrode at the right time uses ionized Xenon to help pull electrons out of the hollow cathode so the hall thruster can use them. Right now the Xenon is not ionized, so the keeper electrode cannot pull electrons out of the hollow cathode.</p>
    </div>
export const gasKeeperErrorSubText =
    "Try turning off the keeper electrode and trying something else.";
///

export const hallThusterOffText = "                        The hollow cathode is a component of the Hall thruster. Its key role is to emit electronic\n" +
    "                        plasma to pull the positive plasma inside the cabin of the Hall thruster, known as the internal\n" +
    "                        plasma. Another role of the hollow cathode, which is not least significant, is to neutralize the\n" +
    "                        rocket. Without the hollow cathode, when Hall thruster emits plasma, the Hall thruster is\n" +
    "                        negatively charging the entire rocket. This phenomenon can cause spacecraft erosion and reduce\n" +
    "                        the thrust force."
