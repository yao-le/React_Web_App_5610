import React, {useState} from "react";
import "../../style/login-screen.css";
import {Link} from "react-router-dom";
//import {login, register} from "../../services/user-service";
//import {useNavigate} from "react-router";

const LoginScreen = () => {
    const [showLoginForm, setShowLoginForm] = useState(true);

    const [username, setUsername] = useState(''); // used for register
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState("listener");


    // need to be modified
    const handleLoginSubmit = async (event) => {
        event.preventDefault();

        const user = {
            email,
            password,
            role
        };

        console.log(user);
        // const res = await login(user);
        // console.log("login success ", res);
        // navigate("/profile");

    };

    // need to be modified
    const handleRegisterSubmit = async (event) => {
        event.preventDefault();

        const newUser = {
            username, email, password
        };
        console.log(newUser);
        // const res =  await register(newUser);
        // console.log("register success ", res);
    }

    const resetForm = () => {
        setUsername('')
        setEmail('')
        setPassword('')
        setRole('listener')
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
                                value={username}
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
                            value={email}
                            required
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                    <div className="wd-login-form-group">
                        <label className="wd-login-form-label">Password</label>
                        <input
                            type="password"
                            className="wd-login-form-input"
                            value={password}
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

export default LoginScreen;
