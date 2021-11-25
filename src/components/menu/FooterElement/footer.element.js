import {} from './footer.element.css'
import {ReactComponent as Logo} from "../assets/psyche.svg";

const Footer = () =>{
    return(
        <footer className="footer wf-section" role="footer">
            <div className="wf-container footer-flex-container">
                <a href="https://psyche.asu.edu/" className="footer-logo-link">
                    <Logo width={"75px"}></Logo>
                </a>
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
                <div>
                    Copyright @ 2020 [My Company]. All rights reserved
                </div>
            </div>
        </footer>
    )
}
export default Footer