import React, { useState } from "react";
import "../../style/login-screen.css";

const LoginScreen = () => {
    const [role, setRole] = useState("listener");

    const handleSubmit = (event) => {
        event.preventDefault();
        // Add login logic
    };

    return (
        <div className="wd-login-screen">
            <div className="wd-login-container">
                <h2 className="wd-login-title">Login</h2>

                <form onSubmit={handleSubmit}>
                    <div className="wd-login-form-group">
                        <label className="wd-login-form-label">Email address</label>
                        <input
                            type="email"
                            className="wd-login-form-input"
                            required
                        />
                    </div>
                    <div className="wd-login-form-group">
                        <label className="wd-login-form-label">Password</label>
                        <input
                            type="password"
                            className="wd-login-form-input"
                            required
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
                        Log In
                    </button>
                </form>
            </div>
        </div>
    );
};

export default LoginScreen;
