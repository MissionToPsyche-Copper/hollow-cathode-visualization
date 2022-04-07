import {Link} from 'react-router-dom'
import React from 'react'

class HeaderComponent extends React.Component{

    componentDidMount() {
        document.addEventListener("click", e=>{
            const isDropdownButton= e.target.matches("[data-dropdown-button]")
            if(!isDropdownButton && e.target.closest('[data-dropdown]'!=null))return

            let currentDropdown
            if(isDropdownButton){
                currentDropdown= e.target.closest('[data-dropdown]')
                currentDropdown.classList.toggle('active')
            }

            document.querySelectorAll("[data-dropdown].active").forEach(dropdown=>{
                if(dropdown === currentDropdown) return
                dropdown.classList.remove('active')
            })
        })
    }

    render(){
        return(
            <header className="navbar w-nav" data-animation="default" data-collapse="medium" data-duration="400"
                    data-easing="ease" data-easing2="ease" role="banner">
                <div className="container w-container">
                    <a href="/" className="brand w-nav-brand">
                        <img src="images/psyche.svg" loading="lazy" width="75" alt="Psyche Mission Logo"/>
                    </a>
                    <nav role="navigation" className="nav-menu w-nav-menu">
                        <div className="dropdown" data-dropdown>
                            <button className="text-block" data-dropdown-button>About Us</button>
                            <div className="dropdown-list">
                                <a href="https://psyche.asu.edu/mission/" className="dropdown-link">Missions</a>
                                <a href="https://psyche.asu.edu/events/" className="dropdown-link">Events</a>
                                <a href="https://psyche.asu.edu/get-involved/capstone-projects/capstone-projects-copper-class/hollow-cathode-visualization-penn-state-behrend/"
                                   className="dropdown-link">Projects</a>
                            </div>
                        </div>
                        <div>
                            <a href="https://psyche.asu.edu/contact/" className="nav-menu nav-link">Contact</a>
                        </div>
                    </nav>
                </div>
            </header>
        );
    }
}

export default HeaderComponent;