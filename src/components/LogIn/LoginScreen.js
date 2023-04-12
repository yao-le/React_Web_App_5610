import React from "react";
import "../../style/login-screen.css";

const LoginScreen = () => {
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

                    <button type="submit" className="wd-login-button mt-4">
                        Log In
                    </button>
                </form>

            </div>
        </div>
    );
};

export default LoginScreen;
