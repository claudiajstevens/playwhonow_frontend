import React from "react";
import { Link } from 'react-router-dom';
import "./NavBar.css";

function NavBar() {

    return(
        <header className="NavBar">
            <nav>
                <ul>
                    <li>
                        <Link to="/">Home</Link>
                    </li>
                    <li>
                        <Link to="/profile">Profile</Link>
                    </li>
                </ul>
            </nav>
        </header>
    );
}

export default NavBar;