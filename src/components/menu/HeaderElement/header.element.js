import {} from './header.element.css'
import {ReactComponent as Logo} from '../assets/psyche.svg'

const Header = () => {

    function showDropdown(e) {
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
    }

    return(
        <header className="navbar w-nav" data-animation="default" data-collapse="medium" data-duration="400"
                data-easing="ease" data-easing2="ease" role="banner">
            <div className="container w-container">
                <a href="https://psyche.asu.edu" className="brand w-nav-brand">
                    <Logo width={"75px"}></Logo>
                </a>
                <nav role="navigation" className="nav-menu w-nav-menu">
                    <div className="dropdown" data-dropdown>
                        <button className="text-block" data-dropdown-button onClick={(e)=> showDropdown(e)}>About Us</button>
                        <div className="dropdown-list">
                            <a href="https://psyche.asu.edu/mission/" className="dropdown-link">Missions</a>
                            <a href="https://psyche.asu.edu/events/" className="dropdown-link">Events</a>
                            <a href="https://psyche.asu.edu/projects/" className="dropdown-link">Projects</a>
                        </div>
                    </div>
                    <div><a href="https://psyche.asu.edu/contact/" className="nav-link">Contact</a></div>
                </nav>
            </div>
        </header>
    )
}
export default Header;