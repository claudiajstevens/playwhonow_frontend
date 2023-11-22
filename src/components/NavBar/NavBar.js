import React, {useContext, useEffect, useState} from "react";
import { Link, NavLink } from 'react-router-dom';
import AuthContext from "../../context/AuthProvider";
import useAuth from "../../hooks/useAuth";
import playwhonow_logo from "../../assets/playwhonow_logo.svg";
import "./NavBar.css";
import axios from "../../api/axios";
import useLogout from "../../hooks/useLogout";

function NavBar() {
    const [showMenu, setShowMenu] = useState(false);
    const logout = useLogout();
    const { auth } = useAuth();
    // const { setAuth } = useContext(AuthContext);
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    const toggleMenu = () => {
        setShowMenu(!showMenu);
    };

    const signOut = async () => {
        await logout();
        console.log(auth);
    }

    useEffect(() => {
        console.log( auth );
        if (auth.roles) {
            console.log("Signed in");
            setIsLoggedIn(true);
            // return <li><NavLink to="/login" onClick={toggleMenu}>Login</NavLink></li>
        } else {
            console.log("No one signed in");
            setIsLoggedIn(false);
            // return <li onClick={logout}>Sign Out</li>
        }

    }, [auth]);
    

    
    // useEffect( () => {
    //     setShowMenu(false);
    // }, []);

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
                                <li><NavLink to="/admin">Admin</NavLink></li>
                                <li><NavLink to="/festivals">Festivals</NavLink></li>
                                <li><NavLink to="/profile" onClick={toggleMenu}>Profile</NavLink></li>
                                { isLoggedIn ? <li><NavLink to="/login" onClick={signOut}>Sign Out</NavLink></li>
                                            : <li><NavLink to="/login" onClick={toggleMenu}>Login</NavLink></li>
                                }
                                {/* <li><NavLink to="/login" onClick={toggleMenu}>Login</NavLink></li> */}
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
