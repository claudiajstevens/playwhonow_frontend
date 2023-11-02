import React, {useState} from "react";
import { Link, NavLink } from 'react-router-dom';
import playwhonow_logo from "../../assets/playwhonow_logo.svg";
import "./NavBar.css";

function NavBar() {
    const [showMenu, setShowMenu] = useState(false);

    const toggleMenu = () => {
        setShowMenu(!showMenu);
        console.log(showMenu);
    };

    return(
        <div className="banner">
            <nav className={`navBar ${showMenu ? 'expanded' : ''}`}>
                {/* <div className="container"> */}
                    {/* <div className="logo">
                        <h1>PLAY WHO NOW</h1>
                    </div> */}
                    {/* <div className="nav-elements"> */}
                        <div className="brand">
                            <Link to="/" className="title"><img src={playwhonow_logo} alt="logo" />PLAY WHO NOW</Link>
                        </div>
                        <div className={`nav-menu ${showMenu ? 'expanded' : ''}`}>
                            <ul>
                                <li><NavLink to="/festivals">Festivals</NavLink></li>
                                <li><NavLink to="/profile">Profile</NavLink></li>
                                <li><NavLink to="/login">Login</NavLink></li>
                            </ul>
                        </div>

                        <div className="hamburger" onClick={toggleMenu}>
                            <div></div>
                            <div></div>
                            <div></div>
                        </div>
                    {/* </div>                    */}
                {/* </div> */}
            </nav>
        </div>
    );
}

export default NavBar;
