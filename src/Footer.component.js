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
                                <a href="https://behrend.psu.edu/" className="footer-link">Penn State Behrend</a>
                            </li>
                            <li>
                                <a href="https://asu.edu/" className="footer-link">Arizona State University</a>
                            </li>
                            <li>
                                <a href="https://nasa.gov/" className="footer-link">NASA</a>
                            </li>
                        </u1>
                    </div>
                    <div>
                        <h1 className="footer-heading">About</h1>
                        <u1 role="list" className="w-list-unstyled">
                            <li>
                                <a href="https://psyche.asu.edu/get-involved/careers-and-internships/" className="footer-link">Careers</a>
                            </li>
                            <li>
                                <a href={'/ref'} className={'footer-link'}>References</a>
                            </li>
                        </u1>
                    </div>
                    <div>
                        <h1 className="footer-heading">Follow Us:</h1>
                        <u1 role="list" className="w-list-unstyled">
                            <li>
                                <a href="https://www.facebook.com/MissionToPsyche" className="footer-link">Facebook</a>
                            </li>
                            <li>
                                <a href="https://www.instagram.com/accounts/login/?next=/missiontopsyche/" className="footer-link">Instagram</a>
                            </li>
                            <li>
                                <a href="https://twitter.com/MissionToPsyche" className="footer-link">Twitter</a>
                            </li>
                            <li>
                                <a href={'https://www.youtube.com/channel/UC2BGcbPW8mxryXnjQcBqk6A/'} className={'footer-link'}>YouTube</a>
                            </li>
                        </u1>
                    </div>
                </div>
                <div style={{color: '#f5f5f5'}}>
                    Copyright @ 2022 Arizona State University. All rights reserved
                    <br></br>
                    Penn State Behrend | Capstone Course: SWENG 480/481 and CMPSC 484/485
                </div>
            </footer>
        );
    }
}

export default FooterComponent;