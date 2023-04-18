import React from "react";

const UploadImage = ({ portrait, handlePortraitChange, fileInputRef, handleUploadClick, isAlbum }) => {
    // TODO: why doesn't work
    const imagePlaceholder = isAlbum ?
        "https://media.istockphoto.com/id/1153663901/vector/black-music-notes-icon-vector.jpg?s=612x612&w=0&k=20&c=9UACzmfKRu7aGtznDYPepgusXU8lqr_Xi21_E73RNhs=" :
        'https://www.alaskapacific.edu/wp-content/uploads/2015/11/placeholder_profile_photo.png';

    return (
        <div className="d-flex justify-content-center align-items-center mb-2">
            <div className="wd-avatar-container d-flex flex-column align-items-center">
                <img
                    src={portrait || `${imagePlaceholder}`}
                    alt="image"
                    className={`wd-avatar-image mb-2 ${isAlbum ? "rounded-circle" : "rounded"}`}
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