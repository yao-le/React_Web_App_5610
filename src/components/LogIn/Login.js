import React, {useRef, useState} from "react";
import "../../style/login-screen.css";
import {Link} from "react-router-dom";
import {useNavigate} from "react-router";
import {useDispatch} from "react-redux";

import { viewerRegisterThunk }
    from "../../services/auth/viewer-auth-thunk.js";
import { publisherRegisterThunk }
    from "../../services/auth/publisher-auth-thunk";
import { adminRegisterThunk }
    from "../../services/auth/admin-auth-thunk.js";
import {loginThunk} from "../../services/auth/auth-thunks";
import UploadImage from "./UploadImage";
import MultiSelect from "./MultiSelect";
import {genres} from "../../utils/genres";


// need to be modified based on backend interfaces
const Login = () => {
    // used to toggle between login and register form
    const [showLoginForm, setShowLoginForm] = useState(true);

    const [name, setName] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState("viewer");
    // used for registration
    const [email, setEmail] = useState('');
    const [portrait, setPortrait] = useState('');
    const [selectedOptions, setSelectedOptions] = useState([]);

    const navigate = useNavigate();
    const dispatch = useDispatch();


    const registerBasedOnRole = async (role) => {
        let newUser = {
            name,
            password,
            email
        };

        if (portrait !== '') {
            newUser = {...newUser, portrait};
        }

        if (role === "viewer") {
            if (selectedOptions.length > 0) {
                newUser = {...newUser, favoriteGenres: selectedOptions};
            }
            return dispatch(viewerRegisterThunk(newUser));
        } else if (role === "publisher") {
            return dispatch(publisherRegisterThunk(newUser));
        } else if (role === "admin") {
            return dispatch(adminRegisterThunk(newUser));
        }
    }


    const handleLogin = async () => {
        const response = await dispatch(loginThunk({name, password, role}));

        if (!response.error) {
            sessionStorage.setItem("currentUser", JSON.stringify(response.payload));
            navigate("/profile");
        } else {
            console.log(response.error);
            resetForm();
            alert("Login failed");
        }
    };


    const handleRegister = async () => {
        const response = await registerBasedOnRole(role);

        if (!response.error) {
            // in case user refreshes the page, we store the current user info in sessionStorage
            sessionStorage.setItem("currentUser", JSON.stringify(response.payload));
            navigate("/profile");
        } else {
            console.log(response.error);
            resetForm();
            alert("Register failed");
        }
    }

    const resetForm = () => {
        setName('')
        setEmail('')
        setPassword('')
        setRole('viewer')
        setPortrait('')
        setSelectedOptions([])
    }

    // handle image upload, need modification?
    const fileInputRef = useRef(null);
    const handleUploadClick = () => {
        fileInputRef.current.click();
    };

    const handlePortraitChange = (event) => {
        if (event.target.files && event.target.files[0]) {
            const imageUrl = URL.createObjectURL(event.target.files[0]);
            setPortrait(imageUrl);
        }
    };


    return (
        <div className="wd-login-screen">
            <div className="wd-login-container">

                {
                    showLoginForm ?
                    <h2 className="wd-login-title">Login</h2> :
                    <h2 className="wd-login-title">Register</h2>
                }

                {/*only for registration: upload avtar image*/}
                {
                    !showLoginForm &&
                    <UploadImage
                        portrait={portrait}
                        fileInputRef={fileInputRef}
                        handlePortraitChange={handlePortraitChange}
                        handleUploadClick={handleUploadClick}
                    />
                }


                <div>
                    <div className="wd-login-form-group">
                        <label className="wd-login-form-label">Username</label>
                        <input
                            type="text"
                            className="wd-login-form-input"
                            placeholder="your username"
                            value={name}
                            required
                            onChange={(e) => setName(e.target.value)}
                        />
                    </div>

                    <div className="wd-login-form-group">
                        <label className="wd-login-form-label">Password</label>
                        <input
                            type="password"
                            className="wd-login-form-input"
                            value={password}
                            placeholder="your password"
                            required
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>

                    {/*only for register: email address (optional)*/}
                    {
                        !showLoginForm &&
                        <div className="wd-login-form-group">
                            <label className="wd-login-form-label">Email address (optional)</label>
                            <input
                                type="email"
                                className="wd-login-form-input"
                                placeholder="your email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>
                    }

                    {/*only for register: select roles*/}
                    {
                        !showLoginForm &&
                        <div className="wd-login-form-group">
                            <label className="wd-login-form-label">Role</label>
                            <div className="wd-login-radio-group">
                                <div>
                                    <input
                                        type="radio"
                                        id="viewer"
                                        name="role"
                                        value="viewer"
                                        checked={role === "viewer"}
                                        onChange={(e) => setRole(e.target.value)}
                                    />
                                    <label htmlFor="viewer" className="wd-login-radio-label">
                                        Viewer
                                    </label>
                                </div>
                                <div>
                                    <input
                                        type="radio"
                                        id="publisher"
                                        name="role"
                                        value="publisher"
                                        checked={role === "publisher"}
                                        onChange={(e) => setRole(e.target.value)}
                                    />
                                    <label htmlFor="publisher" className="wd-login-radio-label">
                                        Publisher
                                    </label>
                                </div>
                                <div>
                                    <input
                                        type="radio"
                                        id="admin"
                                        name="role"
                                        value="admin"
                                        checked={role === "admin"}
                                        onChange={(e) => setRole(e.target.value)}
                                    />
                                    <label htmlFor="admin" className="wd-login-radio-label">
                                        Admin
                                    </label>
                                </div>
                            </div>
                        </div>
                    }

                    {
                        !showLoginForm && role === "viewer" &&
                        <div className="wd-login-form-group">
                            <label htmlFor="genreSelect" className="wd-login-form-label">
                                Please choose your favorite genres
                            </label>
                            <MultiSelect
                                id="genreSelect"
                                options={genres}
                                selectedOptions={selectedOptions}
                                setSelectedOptions={setSelectedOptions}
                            />
                        </div>
                    }


                    <button onClick={showLoginForm ? handleLogin : handleRegister}
                            className="wd-login-button mt-4">
                        {showLoginForm ? "Login" : "Register"}
                    </button>
                </div>

                <div className="wd-toggle-form mt-4">
                    {showLoginForm ? (
                        <div> Don't have an account?
                            <button
                                className="wd-toggle-form-button ms-3"
                                onClick={() => {
                                    resetForm()
                                    setShowLoginForm(false)
                                }}>
                                Register
                            </button>
                        </div>
                    ) : (
                        <div> Already have an account?
                            <button
                                className="wd-toggle-form-button ms-2"
                                onClick={() => {
                                    resetForm()
                                    setShowLoginForm(true)
                                }}>
                                Log In
                            </button>
                        </div>
                    )}
                </div>

                <div className="wd-toggle-form mt-4">
                    <Link to="/"
                          className="wd-toggle-form-button wd-link-no-decoration
                          wd-text-underline mt-4 text-muted">
                        Back to Home
                    </Link>
                </div>

            </div>
        </div>
    );
};

export default Login;
