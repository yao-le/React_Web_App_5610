import React from 'react';
import "../style/navbar.css";
import {Link} from "react-router-dom";
import {useNavigate} from "react-router";
import {useDispatch, useSelector} from "react-redux";
import {logoutThunk} from "../services/auth-thunks";

const Navbar = () => {

    const { currentUser } = useSelector((state) => state.user);

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const navigateBack = () => {
        navigate(-1);
    };

    const handleLogout = () => {
        dispatch(logoutThunk());
        navigate("/");
    }


    return (
        <nav className="wd-navbar d-flex flex-column">
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

                {!currentUser && <Link to="/login" className="wd-link-no-decoration">
                    <li className="wd-navbar-menu-item">
                        <i className="bi bi-box-arrow-in-right"></i>
                        <span className="ms-3 d-none d-xl-inline">Sign in</span>
                    </li>
                </Link>}

                {currentUser &&
                    <Link to="/" className="wd-link-no-decoration"
                            onClick={handleLogout}>
                        <li className="wd-navbar-menu-item">
                            <i className="bi bi-box-arrow-right"></i>
                            <span className="ms-3 d-none d-xl-inline">Log out</span>
                        </li>
                    </Link>
                }

                <li className="wd-navbar-menu-item wd-navbar-menu-item-back">
                    <i className="bi bi-backspace-fill"></i>
                    <span className="ms-3 d-none d-xl-inline" onClick={navigateBack}>Back</span>
                </li>

            </ul>
        </nav>
    );
};

export default Navbar;