import React from 'react';
import "../style/navbar.css";
import {Link} from "react-router-dom";
import {useNavigate} from "react-router";
import {useDispatch, useSelector} from "react-redux";

import {logoutThunk} from "../services/auth/auth-thunks";

const Navbar = () => {

    const { currentUser } = useSelector((state) => state.user);

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const navigateBack = () => {
        navigate(-1);
    };


    const handleLogout = () => {
        // Remove the currentUser object from sessionStorage
        sessionStorage.removeItem("currentUser");

        dispatch(logoutThunk());
        navigate("/");
    }


    return (
        <nav className="wd-navbar d-flex flex-column">

            <ul className="wd-navbar-menu">
                {
                    currentUser &&
                    <li className="wd-navbar-username mb-3">
                        <i className="bi bi-boombox-fill"></i>
                        <span className="ms-3 d-none d-xl-inline">{currentUser.name}</span>
                    </li>
                }

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

                {
                    !currentUser &&
                    <Link to="/login" className="wd-link-no-decoration">
                        <li className="wd-navbar-menu-item">
                            <i className="bi bi-box-arrow-in-right"></i>
                            <span className="ms-3 d-none d-xl-inline">Sign in</span>
                        </li>
                </Link>}

                {
                    currentUser &&
                    <Link to="/profile" className="wd-link-no-decoration">
                        <li className="wd-navbar-menu-item">
                            <i className="bi bi-person-circle"></i>
                            <span className="ms-3 d-none d-xl-inline">Profile</span>
                        </li>
                    </Link>
                }

                {
                    currentUser && currentUser.role === "admin" &&
                    <Link to="/admin" className="wd-link-no-decoration">
                        <li className="wd-navbar-menu-item">
                            <i className="bi bi-person-fill-gear"></i>
                            <span className="ms-3 d-none d-xl-inline">Admin</span>
                        </li>
                    </Link>
                }

                {
                    currentUser && currentUser.role === "publisher" &&
                    <Link to="/publisher" className="wd-link-no-decoration">
                        <li className="wd-navbar-menu-item">
                            <i className="bi bi-music-note-list"></i>
                            <span className="ms-3 d-none d-xl-inline">Artist</span>
                        </li>
                    </Link>
                }

                {
                    currentUser &&
                    <Link to="/" className="wd-link-no-decoration"
                            onClick={handleLogout}>
                        <li className="wd-navbar-menu-item">
                            <i className="bi bi-box-arrow-right"></i>
                            <span className="ms-3 d-none d-xl-inline">Log out</span>
                        </li>
                    </Link>
                }

                <li className="wd-navbar-menu-item wd-navbar-menu-item-back wd-cursor-pointer"
                    onClick={navigateBack}>
                    <i className="bi bi-backspace-fill"></i>
                    <span className="ms-3 d-none d-xl-inline">Back</span>
                </li>

            </ul>
        </nav>
    );
};

export default Navbar;