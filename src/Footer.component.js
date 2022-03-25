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
                                <a href="#" className="footer-link">Our Products</a>
                            </li>
                            <li>
                                <a href="#" className="footer-link">Careers</a>
                            </li>
                        </u1>
                    </div>
                    <div>
                        <h1 className="footer-heading">Follow Us:</h1>
                        <u1 role="list" className="w-list-unstyled">
                            <li>
                                <a href="#" className="footer-link">Facebook</a>
                            </li>
                            <li>
                                <a href="#" className="footer-link">Instagram</a>
                            </li>
                            <li>
                                <a href="#" className="footer-link">LinkedIn</a>
                            </li>
                        </u1>
                    </div>
                </div>
                <div>
                    Copyright @ 2021 [My Company]. All rights reserved
                </div>
            </footer>
        );
    }
}

export default FooterComponent;