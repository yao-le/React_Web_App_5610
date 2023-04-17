import React, {useRef, useState} from 'react';
import "../../style/edit-profile.css";
import {useDispatch, useSelector} from "react-redux";
import {updateViewerThunk} from "../../services/auth/viewer-auth-thunk";
import {updatePublisherThunk} from "../../services/auth/publisher-auth-thunk";
import {updateAdminThunk} from "../../services/auth/admin-auth-thunk";
import {useNavigate} from "react-router";
import EditForm from "./EditForm";


const EditProfile = () => {

    const {currentUser} = useSelector((state) => state.user);

    // const [name, setName] = useState(currentUser.name);
    // const [password, setPassword] = useState(currentUser.password);
    // const [email, setEmail] = useState(currentUser.email);
    // const [portrait, setPortrait] = useState(currentUser.portrait);

    // const [selectedGenres, setSelectedGenres] = useState(currentUser.favoriteGenres);

    const navigate = useNavigate();
    const dispatch = useDispatch();


    // need to be modified?
    const updateBasedOnRole = async (newProfile) => {
        if (currentUser.role === "viewer") {
            return dispatch(updateViewerThunk(newProfile));
        } else if (currentUser.role === "publisher") {
            return dispatch(updatePublisherThunk(newProfile));
        } else if (currentUser.role === "admin") {
            return dispatch(updateAdminThunk(newProfile));
        }
    }

    // update the profile of the current user
    const handleUpdate = async (updatedInfo) => {
        console.log("update profile");
        const newProfile = {...currentUser, ...updatedInfo};
        const response = await updateBasedOnRole(newProfile);
        if (!response.error) {
            // in case user refreshes the page, we store the current user info in sessionStorage
            sessionStorage.setItem("currentUser", JSON.stringify(response.payload));
            navigate("/profile");
        } else {
            console.log(response.error);
            alert("Update failed");
        }
    }

    return (
        <EditForm
            initialValues={{
                name: currentUser.name,
                password: currentUser.password,
                email: currentUser.email,
                portrait: currentUser.portrait,
                selfIntro: currentUser.selfIntro,
                firstName: currentUser.firstName,
                lastName: currentUser.lastName,
            }}
            userRole={currentUser.role}
            handleUpdate={handleUpdate}
            parentLink="/profile"
        />
    )
};

export default EditProfile;
