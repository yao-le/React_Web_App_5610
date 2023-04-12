import React, {useState} from "react";
import "../../style/login-screen.css";
import {Link} from "react-router-dom";

const LoginScreen = () => {
    const [showLoginForm, setShowLoginForm] = useState(true);

    const [username, setUsername] = useState(''); // used for register
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState("listener");

    // need to be modified
    const handleLoginSubmit = (event) => {
        event.preventDefault();
        // for testing
        console.log("from login");
        console.log({email, password, role});
        // add login logic
    };

    // need to be modified
    const handleRegisterSubmit = (event) => {
        event.preventDefault();
        // for testing
        console.log("from register");
        console.log({email, password, role, username});
        // add register logic
    }

    return (
        <div className="wd-login-screen">
            <div className="wd-login-container">

                {showLoginForm ?
                    <h2 className="wd-login-title">Login</h2> :
                    <h2 className="wd-login-title">Register</h2>
                }


                <form onSubmit={showLoginForm ? handleLoginSubmit : handleRegisterSubmit}>

                    {!showLoginForm &&
                        <div className="wd-login-form-group">
                            <label className="wd-login-form-label">Username</label>
                            <input
                                type="text"
                                className="wd-login-form-input"
                                required
                                onChange={(e) => setUsername(e.target.value)}
                            />
                        </div>
                    }

                    <div className="wd-login-form-group">
                        <label className="wd-login-form-label">Email address</label>
                        <input
                            type="email"
                            className="wd-login-form-input"
                            required
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                    <div className="wd-login-form-group">
                        <label className="wd-login-form-label">Password</label>
                        <input
                            type="password"
                            className="wd-login-form-input"
                            required
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>

                    <div className="wd-login-form-group">
                        <label className="wd-login-form-label">Role</label>
                        <div className="wd-login-radio-group">
                            <div>
                                <input
                                    type="radio"
                                    id="listener"
                                    name="role"
                                    value="listener"
                                    checked={role === "listener"}
                                    onChange={(e) => setRole(e.target.value)}
                                />
                                <label htmlFor="listener" className="wd-login-radio-label">
                                    Listener
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


                    <button type="submit" className="wd-login-button mt-4">
                        {showLoginForm ? "Login" : "Register"}
                    </button>
                </form>

                <div className="wd-toggle-form mt-4">
                    {showLoginForm ? (
                        <div> Don't have an account?
                            <button
                                className="wd-toggle-form-button ms-3"
                                onClick={() => setShowLoginForm(false)}>
                                Register
                            </button>
                        </div>
                    ) : (
                        <div> Already have an account?
                            <button
                                className="wd-toggle-form-button ms-2"
                                onClick={() => setShowLoginForm(true)}>
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

export default LoginScreen;
