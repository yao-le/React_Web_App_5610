import React, {useRef, useState} from 'react';
import { Link } from 'react-router-dom';
import "../../style/edit-profile.css";
import { useSelector } from "react-redux";
import UploadImage from "../LogIn/UploadImage";
import MultiSelect from "../LogIn/MultiSelect";
import {genres} from "../../utils/genres";

// currently only work for viewers and publishers, because admins don't have portrait image field
const EditProfile = () => {

    const { currentUser } = useSelector((state) => state.user);

    const [name, setName] = useState(currentUser.name);
    const [password, setPassword] = useState(currentUser.password);
    const [email, setEmail] = useState(currentUser.email);
    const [portrait, setPortrait] = useState(currentUser.portrait);

    const [selectedGenres, setSelectedGenres] = useState(currentUser.favoriteGenres);

    // ??? 上传图片功能需要修改
    // this URL is only available for the current session, and it won't be stored permanently.
    // For permanent storage, need to upload the image to a server then store the returned URL.
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


    const handleUpdate = () => {
        console.log("update profile");
        const user = {
            name,
            password,
            email,
            portrait
        }
        console.log(user);
        // dispatch(updateUserThunk(user));
    }

    return (
        <div className="wd-bg-color-black">
        <div className="wd-edit-profile-container">
            <h2 className="wd-edit-profile-title">Edit Profile</h2>
            <form className="wd-edit-profile-form">
                {/* upload portrait */}
                <UploadImage
                    portrait={portrait}
                    fileInputRef={fileInputRef}
                    handlePortraitChange={handlePortraitChange}
                    handleUploadClick={handleUploadClick}
                />

                {/* Username */}
                <div className="mb-3">
                    <label htmlFor="username" className="form-label wd-edit-profile-label">Username</label>
                    <input
                        type="text"
                        className="form-control wd-edit-profile-input"
                        id="username"
                        placeholder="Your username"
                        value={name}
                        onChange={(event) => setName(event.target.value)}
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

                {/* Favorite Genres */}
                <div className="mb-3">
                    <label htmlFor="genres" className="form-label wd-edit-profile-label">Favorite Genres</label>
                    <MultiSelect
                        options={genres}
                        selectedOptions={selectedGenres}
                        setSelectedOptions={setSelectedGenres}
                    />
                </div>

                {/* Update button */}
                <button type="button" className="btn btn-success rounded-pill wd-edit-profile-btn"
                        onClick={handleUpdate}>
                    Save Profile
                </button>

                {/* Cancel button */}
                <Link to="/profile" className="btn btn-secondary rounded-pill wd-edit-profile-btn">
                    Cancel
                </Link>
            </form>
        </div>
        </div>
    );
};

export default EditProfile;
