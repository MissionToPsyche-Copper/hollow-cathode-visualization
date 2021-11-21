document.addEventListener('click', e=>{
    /*
    *  This event listener checks whether the mouse clicks the dropdown button
    * If yes, the dropdown stays still and does it thing
    * Otherwise, the dropdown is closed
    * */
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