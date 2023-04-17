import UploadImage from "../LogIn/UploadImage";
import {Link} from "react-router-dom";
import React, {useEffect, useState} from "react";

const EditForm = ({
                      initialValues,
                      userRole,
                      handleUpdate,
                      parentLink,
                  }) => {

    const [name, setName] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [portrait, setPortrait] = useState('');
    const [selfIntro, setSelfIntro] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');

    useEffect(() => {
        if (initialValues) {
            setName(initialValues.name);
            setPassword(initialValues.password);
            setEmail(initialValues.email);
            setPortrait(initialValues.portrait);
            setSelfIntro(initialValues.selfIntro);
            setFirstName(initialValues.firstName);
            setLastName(initialValues.lastName);
        }
    }, [initialValues]);

    // upload image
    const fileInputRef = React.createRef();

    const handleUploadClick = () => {
        fileInputRef.current.click();
    };

    const handlePortraitChange = (event) => {
        if (event.target.files && event.target.files[0]) {
            const imageUrl = URL.createObjectURL(event.target.files[0]);
            setPortrait(imageUrl);
        }
    };

    const handleSubmit = () => {
        handleUpdate({ name, password, email, portrait, selfIntro, firstName, lastName });
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
                            required
                            className="form-control wd-edit-profile-input"
                            id="username"
                            placeholder="Your username"
                            value={name}
                            onChange={(event) => setName(event.target.value)}
                        />
                    </div>

                    {/* firstname */}
                    {
                        userRole === 'admin' &&
                        <div className="mb-3">
                            <label htmlFor="firstname" className="form-label wd-edit-profile-label">First name</label>
                            <input
                                type="text"
                                className="form-control wd-edit-profile-input"
                                id="firstname"
                                placeholder="Your firstname"
                                value={firstName}
                                onChange={(event) => setFirstName(event.target.value)}
                            />
                        </div>
                    }

                    {/* lastname */}
                    {
                        userRole === 'admin' &&
                        <div className="mb-3">
                            <label htmlFor="lastname" className="form-label wd-edit-profile-label">Last name</label>
                            <input
                                type="text"
                                className="form-control wd-edit-profile-input"
                                id="lastname"
                                placeholder="Your lastname"
                                value={lastName}
                                onChange={(event) => setLastName(event.target.value)}
                            />
                        </div>
                    }

                    {/* Password */}
                    <div className="mb-3">
                        <label htmlFor="password" className="form-label wd-edit-profile-label">Password</label>
                        <input
                            type="password"
                            required
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

                    {/*self introduction field only for publishers*/}
                    {userRole === 'publisher' &&
                        <div className="mb-3">
                            <label htmlFor="intro" className="form-label wd-edit-profile-label">
                                Description
                            </label>
                            <textarea
                                className="form-control wd-edit-profile-input"
                                id="intro"
                                value={selfIntro}
                                placeholder="Please introduce yourself"
                                onChange={(event) => setSelfIntro(event.target.value)}
                            ></textarea>
                        </div>
                    }

                    {/* Favorite Genres */}
                    {/*<div className="mb-3">*/}
                    {/*    <label htmlFor="genres" className="form-label wd-edit-profile-label">Favorite Genres</label>*/}
                    {/*    <MultiSelect*/}
                    {/*        options={genres}*/}
                    {/*        selectedOptions={selectedGenres}*/}
                    {/*        setSelectedOptions={setSelectedGenres}*/}
                    {/*    />*/}
                    {/*</div>*/}

                    {/* Update button */}
                    <button type="button" className="btn btn-success rounded-pill wd-edit-profile-btn"
                            onClick={handleSubmit}>
                        Save Profile
                    </button>

                    {/* Cancel button */}
                    <Link to={parentLink} className="btn btn-secondary rounded-pill wd-edit-profile-btn">
                        Cancel
                    </Link>
                </form>
            </div>
        </div>
    )
}

export default EditForm;