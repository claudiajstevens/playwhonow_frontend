import React from "react";
import { Link, NavLink } from 'react-router-dom';
import playwhonow_logo from "../../assets/playwhonow_logo.svg";
import "./NavBar.css";

function NavBar() {

    return(
        <div className="banner">
            <nav className="navBar">
                {/* <div className="container"> */}
                    {/* <div className="logo">
                        <h1>PLAY WHO NOW</h1>
                    </div> */}
                    {/* <div className="nav-elements"> */}
                        <Link to="/" className="title"><img src={playwhonow_logo} alt="logo" />PLAY WHO NOW</Link>
                        <ul>
                            <li><NavLink to="/festivals">Festivals</NavLink></li>
                            <li><NavLink to="/profile">Profile</NavLink></li>
                            <li><NavLink to="/login">Login</NavLink></li>
                        </ul>
                    {/* </div>                    */}
                {/* </div> */}
            </nav>
        </div>
    );
}

export default NavBar;