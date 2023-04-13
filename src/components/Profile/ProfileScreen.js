import React, { useRef, useState } from 'react';
import "../../style/profile.css";
import { BsPencilSquare } from 'react-icons/bs';


const ProfileScreen = () => {

    // const [avatarUrl, setAvatarUrl] = useState(null);
    // const [name, setName] = useState('John Doe');
    //
    // const [isEditing, setIsEditing] = useState(false);
    // const fileInputRef = useRef(null);
    // const nameInputRef = useRef(null);
    //
    // const handleFileChange = (event) => {
    //     const file = event.target.files[0];
    //     const reader = new FileReader();
    //     reader.onload = () => {
    //         setAvatarUrl(reader.result);
    //     };
    //     reader.readAsDataURL(file);
    // };
    //
    // const handleClick = () => {
    //     fileInputRef.current.click();
    // };
    //
    // const handleEditClick = () => {
    //     setIsEditing(true);
    //     setTimeout(() => {
    //         nameInputRef.current.focus();
    //     }, 0);
    // };
    //
    // const handleNameChange = (event) => {
    //     setName(event.target.value);
    // };
    //
    // const handleNameBlur = () => {
    //     setIsEditing(false);
    // };
    //
    // return (
    //     <div className="wd-profile-container">
    //         <div className="wd-profile-avatar-container" onClick={handleClick}>
    //             <img
    //                 src={avatarUrl || 'https://via.placeholder.com/150'}
    //                 alt="avatar"
    //                 className="wd-profile-avatar"
    //             />
    //             <input
    //                 type="file"
    //                 ref={fileInputRef}
    //                 onChange={handleFileChange}
    //                 className="wd-profile-upload"
    //                 accept="image/*"
    //             />
    //         </div>
    //         {isEditing ? (
    //             <input
    //                 ref={nameInputRef}
    //                 type="text"
    //                 value={name}
    //                 onChange={handleNameChange}
    //                 onBlur={handleNameBlur}
    //                 className="wd-profile-edit-name"
    //             />
    //         ) : (
    //             <h2 className="wd-profile-name">
    //                 {name}
    //                 <BsPencilSquare
    //                     className="wd-profile-edit-icon"
    //                     onClick={handleEditClick}
    //                 />
    //             </h2>
    //         )}
    //     </div>
    // );
};

export default ProfileScreen;
