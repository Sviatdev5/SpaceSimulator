import React from "react"
import Menu from "./Menu"

function Header({isMenuVisible}){
        return(
            <header className="header">
                <h1>Космічний симулятор</h1>
                <Menu/>
            </header>
        )
    }

export default Header