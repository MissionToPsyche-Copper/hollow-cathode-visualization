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
export const plasma = 3;            // ctx3 // scene[plasma]            // LAYER REPURPOSED (constant still used for state-based logic) //
export const labels = 3;            // ctx3 //
export const keeper = 4;            // ctx4 // scene[keeper]            // LAYER DISCONTINUED (constant still used for state-based logic) //
export const eject = 5;             // ctx5 // scene[eject]             // LAYER DISCONTINUED (constant still used for state-based logic) //
export const hallThrusterOff = 6;   // ctx6 // scene[hallThrusterOff]   // LAYER DISCONTINUED (constant still used for state-based logic) //
export const hallThrusterOn = 7;    // ctx7 // scene[hallThrusterOn]    // LAYER DISCONTINUED (constant still used for state-based logic) //

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
export const hallThrusterPrimaryText =
    <div>
        <p>The large circular piece here is a Hall thruster. It moves the Psyche spacecraft through outer space by ionizing particles and shooting them out of the spacecraft. Try turning the Hall thruster on and off.</p>
    </div>

export const hallThrusterSecondaryOnText =
    <div>
        <p>The blue plasma coming out of the Hall thruster propels the spacecraft through outer space. The Hall thruster shoots out small charged particles, called ions, away from the spacecraft at extremely high speeds.</p>
        <p>For the Hall thruster to work, it needs a steady stream of tiny particles called electrons. These electrons charge, or ionize, particles from the Hall thruster so they can shoot out of the spacecraft. To generate the electrons, we need a hollow cathode. The hollow cathode is the component right above the Hall thruster.</p>
        {/*<p><b id={"thrusterGuideText"} className={"thrusterGuideText"}>Click on the hollow cathode above the Hall thruster to learn more about it.</b></p>*/}
    </div>
export const hallThrusterSecondaryOffText =
    <div>
        <p>The blue plasma coming out of the Hall thruster propels the spacecraft through outer space. The Hall thruster shoots out small charged particles, called ions, away from the spacecraft at extremely high speeds.</p>
        <p>For the Hall thruster to work, it needs a steady stream of tiny particles called electrons. These electrons charge, or ionize, particles from the Hall thruster so they can shoot out of the spacecraft. To generate the electrons, we need a hollow cathode. The hollow cathode is the component right above the Hall thruster.</p>
        {/*<p><b id={"thrusterGuideText"} className={"thrusterGuideText"}>Click on the hollow cathode above the Hall thruster to learn more about it.</b></p>*/}
    </div>

export const clickHollowCathodeGuideText = "Click on the hollow cathode to the left to learn more about it"

export const cathodeShellPrimaryTitleText = "This is a Hollow Cathode"
export const cathodeShellPrimaryText =
    <div>
        <p>The hollow cathode has two jobs that both help the Hall thruster work and make sure the Psyche spacecraft reaches its destination. Mainly the hollow cathode emits a stream of electrons.</p>
        <p>The first job helps the Hall thruster propel the spacecraft through outer space. Some of the electrons the hollow cathode emits are pulled into the Hall thruster and used to make the ions it shoots from the spacecraft.</p>
        <p>The second job of the hollow cathode is to provide electrons to neutralize the Hall thruster's ions as they fly away from the spacecraft. Neutralizing an ion makes it so it no longer has a charge, therefore it is no longer affected by the Hall thruster.</p>
        {/*<p><b id={"guideText"} className={"guideText"}>Click on the hollow cathode or press the 'next' button below to explore how the hollow cathode performs its jobs.</b></p>*/}
    </div>
export const cathodeShellGuideText = "Click on the hollow cathode or press 'Next' to explore how the hollow cathode performs its jobs."

export const cathodeCSVTitleText = "Inside the Hollow Cathode"
export const cathodeCSVText =
    <div>
        <p>The hollow cathode has three pieces that help it work: the heaters, the gas feed, and the keeper electrode. You can turn them on and off with the buttons at the bottom of the screen. Let’s try to get the hollow cathode working!</p>
    </div>
export const cathodeCSVSubText =
    "First, let’s toggle the heaters to turn them on. "

export const heatTitleText = "Heating the Inserts"
export const heatText = <p>The heaters are coiled around the cathode tube. They heat the insert up to an extremely high temperature, causing it to emit electrons. While our goal is to generate electrons for the Hall thruster, the insert alone doesn't produce enough and would be inefficient as our primary source of electrons. Although, electrons can be used to ionize neutral particles to produce even more electrons. The gas feed can be used to inject neutral particles into the cathode tube.</p>
export const heatSubText = "";

export const gasTitleText = "Injecting Xenon Gas"
export const gasText = <p>The gas feed lets tiny particles called Xenon into the cathode tube. Whenever a Xenon particle hits an electron, the Xenon gets charged, or ionized. An ionized particle loses some of its electrons which leaves more usable elections in the cathode tube!</p>
export const gasSubText =
    "Click Next to see what happens when Xenon from the gas feed meets electrons."

export const plasmaTitleText = "Plasma Forms"
export const plasmaText = <p>An incredibly hot plasma of electrons and ionized Xenon forms inside the cathode tube. As electrons run into the Xenon particles, more electrons break free from the Xenon, this is called ionization. You can see the Xenon ionizing when they turn from purple to bright blue. Ionizing xenon gives us a steady source of lots of electrons in the hollow cathode! Now we just need to get the electrons from the cathode tube out to the Hall thruster. </p>
export const plasmaSubText =
    "To do this, let’s turn on the keeper electrode."

export const keeperTitleText = "The Keeper Electrode"
export const keeperText = <p>You’ve turned on the keeper electrode, it creates an electric field inside the cathode. You are probably familiar with magnetic fields from trying to stick the same ends of two magnets together, electric fields behave similarly, they pull negative particles and push positive particles. The keeper electrode pulls electrons (negatively charged) out of the hollow cathode so the Hall thruster can use them, it also pushes the ionized xenon (positively charged) to the back of the cathode.</p>
export const keeperSubText = "";

export const ejectTitleText = "Ejecting Plasma"
export const ejectText = <p>You’ve just ejected the plasma! The keeper electrode just pulled all the electrons out of the hollow cathode for the Hall thruster to use.</p>
export const ejectSubText = "";

export const recapTitleText = "A Quick Recap"
export const recapText =
    <div>
        <p>Congratulations, you got the hollow cathode working! Let’s talk about everything you just did.</p>
        <p>First, you learned that the hollow cathode is an important piece of the Psyche spacecraft, as it lets the Hall thruster do its job of propelling the spacecraft through outer space.</p>
        <p>Then, you got the hollow cathode working. To do this, you used the heaters to heat the hollow cathode’s inserts until they generated electrons. Next, using the gas feed you injected some Xenon gas into the cathode tube which ionized, forming a hot plasma of even more electrons. Lastly, you used the keeper electrode to pull all the electrons out of the hollow cathode so the Hall thruster could use them.</p>
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
        <p>Turning on the keeper electrode at the right time pulls enough electrons out of the hollow cathode for the Hall thruster to use. Right now, there’s not very many electrons being pulled out of the hollow cathode, so the Hall thruster doesn’t have enough electrons to do its job.</p>
    </div>
export const heatKeeperErrorSubText =
    "Try going back and turning off the keeper electrode and using the gas feed to produce more electrons before ejecting them."

export const gasKeeperErrorTitleText = "!"
export const gasKeeperErrorText =
    <div>
        <p>You’ve turned on the keeper electrode too early!</p>
        <p>The Xenon particles currently in the cathode tube are neutral, so the electric field generated by the keeper electrode has no affect on them. Additionally, there are no electrons in the cathode tube to ionize the Xenon particles so there aren't electrons are being produced yet for the Hall thruster to use.</p>
    </div>
export const gasKeeperErrorSubText =
    "Try going back and turning off the keeper electrode and trying something else.";
///

export const hallThusterOffText = "                        The hollow cathode is a component of the Hall thruster. Its key role is to emit electronic\n" +
    "                        plasma to pull the positive plasma inside the cabin of the Hall thruster, known as the internal\n" +
    "                        plasma. Another role of the hollow cathode, which is not least significant, is to neutralize the\n" +
    "                        rocket. Without the hollow cathode, when Hall thruster emits plasma, the Hall thruster is\n" +
    "                        negatively charging the entire rocket. This phenomenon can cause spacecraft erosion and reduce\n" +
    "                        the thrust force."
