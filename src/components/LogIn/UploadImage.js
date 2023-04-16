import React from "react";

const UploadImage = ({ portrait, handlePortraitChange, fileInputRef, handleUploadClick }) => {
    return (
        <div className="d-flex justify-content-center align-items-center mb-2">
            <div className="wd-avatar-container d-flex flex-column align-items-center">
                <img
                    src={portrait || 'https://cdn2.iconfinder.com/data/icons/communication-489/24/account_profile_user_contact_person_avatar_placeholder-512.png'}
                    alt="avatar"
                    className="wd-avatar-image rounded-circle mb-2"
                />
                <input
                    type="file"
                    onChange={handlePortraitChange}
                    ref={fileInputRef}
                    className="wd-avatar-input "
                    accept="image/*"
                />
                <button type="button" className="btn wd-upload-avatar-button text-muted"
                        onClick={handleUploadClick}>
                    Choose photo
                </button>
            </div>
        </div>
    )
}

export default UploadImage;