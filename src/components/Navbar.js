import React from 'react';
import "../style/navbar.css";
import {Link} from "react-router-dom";


const Navbar = () => {
    return (
        <nav className="wd-navbar">
            <ul className="wd-navbar-menu">
                <Link to="/" className="wd-link-no-decoration">
                    <li className="wd-navbar-menu-item">
                        <i className="bi bi-house-door-fill"></i>
                        <span className="ms-3 d-none d-xl-inline">Home</span>
                    </li>
                </Link>
                <Link to="/search" className="wd-link-no-decoration">
                    <li className="wd-navbar-menu-item">
                        <i className="bi bi-search"></i>
                        <span className="ms-3 d-none d-xl-inline">Search</span>
                    </li>
                </Link>
                <Link to="/login" className="wd-link-no-decoration">
                    <li className="wd-navbar-menu-item">
                        <i className="bi bi-person-circle"></i>ç
                        <span className="ms-3 d-none d-xl-inline">Sign in</span>
                    </li>
                </Link>
            </ul>
        </nav>
    );
};

export default Navbar;