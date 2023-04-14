import React, {useState} from "react";
import "../../style/login-screen.css";
import {Link} from "react-router-dom";
import {useNavigate} from "react-router";
import {useDispatch} from "react-redux";
import {loginThunk, registerThunk} from "../../services/auth-thunks";

// 需要根据后端修改
const LoginScreen = () => {
    // used to toggle between login and register form
    const [showLoginForm, setShowLoginForm] = useState(true);

    const [username, setUsername] = useState(''); // used for register
    const [password, setPassword] = useState('');
    // used for registration
    const [email, setEmail] = useState('');
    const [role, setRole] = useState("viewer"); //

    const navigate = useNavigate();
    const dispatch = useDispatch();


    const handleLogin = async () => {
        // 根据role来dispatch不同的loginthunk，可以给viewer，publisher, admin分别写一个loginthunk
        const response = await dispatch(loginThunk({username, password}));

        if (!response.error) {
            navigate("/profile");
        } else {
            console.log(response.error);
            resetForm();
            alert("Login failed");
        }
    };


    const handleRegister = async () => {
        const newUser = {
            username,
            password,
            role,
            email
        };

        const response = await dispatch(registerThunk(newUser));
        if (!response.error) {
            navigate("/profile");
        } else {
            console.log(response.error);
            resetForm();
            alert("Register failed");
        }
    }

    const resetForm = () => {
        setUsername('')
        setEmail('')
        setPassword('')
        setRole('viewer')
    }

    return (
        <div className="wd-login-screen">
            <div className="wd-login-container">

                {showLoginForm ?
                    <h2 className="wd-login-title">Login</h2> :
                    <h2 className="wd-login-title">Register</h2>
                }


                <div>

                    <div className="wd-login-form-group">
                        <label className="wd-login-form-label">Username</label>
                        <input
                            type="text"
                            className="wd-login-form-input"
                            placeholder="your username"
                            value={username}
                            required
                            onChange={(e) => setUsername(e.target.value)}
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

                    {!showLoginForm &&
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

export default LoginScreen;
