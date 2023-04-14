import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import "../../style/edit-profile.css";
import { useSelector } from "react-redux";

const EditProfile = () => {

    const { currentUser } = useSelector((state) => state.user);

    const [username, setUsername] = useState(currentUser.username);
    const [password, setPassword] = useState(currentUser.password);
    const [email, setEmail] = useState(currentUser.email);
    const [avatarUrl, setAvatarUrl] = useState(currentUser.avatarUrl);

    // ??? 上传图片功能需要修改
    // this URL is only available for the current session, and it won't be stored permanently.
    // For permanent storage, need to upload the image to a server then store the returned URL.
    const handleAvatarChange = (event) => {
        if (event.target.files && event.target.files[0]) {
            const imageUrl = URL.createObjectURL(event.target.files[0]);
            setAvatarUrl(imageUrl);
        }
    };

    const handleUpdate = () => {
        console.log("update profile");
        const user = {
            username,
            password,
            email,
            avatarUrl
        }
        console.log(user);
        // dispatch(updateUserThunk(user));
    }

    return (
        <div className="wd-bg-color-black">
        <div className="wd-edit-profile-container">
            <h2 className="wd-edit-profile-title">Edit Profile</h2>
            <form className="wd-edit-profile-form">
                {/* Avatar */}
                <div className="mb-3 wd-edit-profile-avatar-container">
                    <img
                        className="wd-edit-profile-avatar"
                        src={avatarUrl}
                        alt="avatar"
                    />
                    <input
                        type="file"
                        className="form-control mt-4"
                        id="avatar"
                        onChange={handleAvatarChange}
                    />
                </div>

                {/* Username */}
                <div className="mb-3">
                    <label htmlFor="username" className="form-label wd-edit-profile-label">Username</label>
                    <input
                        type="text"
                        className="form-control wd-edit-profile-input"
                        id="username"
                        placeholder="Your username"
                        value={username}
                        onChange={(event) => setUsername(event.target.value)}
                    />
                </div>

                {/* Password */}
                <div className="mb-3">
                    <label htmlFor="password" className="form-label wd-edit-profile-label">Password</label>
                    <input
                        type="password"
                        className="form-control wd-edit-profile-input"
                        id="password"
                        placeholder="Your password"
                        value={password}
                        onChange={(event) => setPassword(event.target.value)}
                    />
                </div>

                {/* Email */}
                <div className="mb-3">
                    <label htmlFor="email" className="form-label wd-edit-profile-label">Email</label>
                    <input
                        type="email"
                        className="form-control wd-edit-profile-input"
                        id="email"
                        placeholder="Your email"
                        value={email}
                        onChange={(event) => setEmail(event.target.value)}
                    />
                </div>

                {/* Update button */}
                <button type="button" className="btn btn-primary wd-edit-profile-btn"
                        onClick={handleUpdate}>
                    Update Profile
                </button>

                {/* Cancel button */}
                <Link to="/profile" className="btn btn-secondary wd-edit-profile-btn">
                    Cancel
                </Link>
            </form>
        </div>
        </div>
    );
};

export default EditProfile;
