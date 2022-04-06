import Link from 'react-router-dom'
import React from 'react'
import './App.css'

class FooterComponent extends React.Component{
    render(){
        return(
            <footer className="footer wf-section" role="footer">

                <div className="wf-container footer-flex-container">
                    <a href="https://psyche.asu.edu/" className="footer-logo-link"><img src="images/psyche.svg"
                                                                                        loading="lazy"
                                                                                        alt="Psyche Mission Logo"
                                                                                        className="footer-image"/></a>
                    <div>
                        <h1 className="footer-heading">Partnership</h1>
                        <u1 role="list" className="w-list-unstyled">
                            <li>
                                <a href="https://behrend.psu.edu/" className="footer-link-1">Penn State Behrend</a>
                            </li>
                            <li>
                                <a href="https://asu.edu/" className="footer-link-1">Arizona State University</a>
                            </li>
                            <li>
                                <a href="https://nasa.gov/" className="footer-link-1">NASA</a>
                            </li>
                        </u1>
                    </div>
                    <div>
                        <h1 className="footer-heading">About</h1>
                        <u1 role="list" className="w-list-unstyled">
                            <li>
                                <a href="https://psyche.asu.edu/get-involved/careers-and-internships/" className="footer-link-1">Careers</a>
                            </li>
                            <li>
                                <a href={'/ref'} className={'footer-link-1'}>References</a>
                            </li>
                        </u1>
                    </div>
                    <div>
                        <h1 className="footer-heading">Follow Us:</h1>
                        <u1 role="list" className="w-list-unstyled">
                            <li>
                                <a href="https://www.facebook.com/MissionToPsyche" className="footer-link-1">Facebook</a>
                            </li>
                            <li>
                                <a href="https://www.instagram.com/accounts/login/?next=/missiontopsyche/" className="footer-link-1">Instagram</a>
                            </li>
                            <li>
                                <a href="https://twitter.com/MissionToPsyche" className="footer-link-1">Twitter</a>
                            </li>
                            <li>
                                <a href={'https://www.youtube.com/channel/UC2BGcbPW8mxryXnjQcBqk6A/'} className={'footer-link-1'}>YouTube</a>
                            </li>
                        </u1>
                    </div>
                </div>
                <div className={'footer-disclaimer'}>
                    Disclaimer: This work was created in partial fulfillment of Penn State University
                    Capstone Course SWENG 480/481 and CMPSC 484/485. The work is a result of the Psyche
                    Student Collaborations component of NASA’s Psyche Mission <a href={'https://psyche.asu.edu/'} className={'footer-link-2'}>(https://psyche.asu.edu/)</a>. “Psyche: A Journey to a Metal World” [Contract
                    number NNM16AA09C] is part of the NASA Discovery Program mission to
                    solar system targets. Trade names and trademarks of ASU and NASA are
                    used in this work for identification only. Their usage does not constitute an
                    official endorsement, either expressed or implied, by Arizona State
                    University or National Aeronautics and Space Administration. The content
                    is solely the responsibility of the authors and does not necessarily
                    represent the official views of ASU or NASA.
                    </div>
            </footer>
        );
    }
}

export default FooterComponent;