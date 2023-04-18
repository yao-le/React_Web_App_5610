// only for admin
import React, {useEffect, useState} from "react";
import {useSelector} from "react-redux";
import {useNavigate, useParams} from "react-router";
import {getUserById} from "../../services/auth/auth-service";
import EditForm from "./EditForm";
import {updateViewer} from "../../services/auth/viewer-auth-service";
import {updatePublisher} from "../../services/auth/publisher-auth-service";
import {updateAdmin} from "../../services/auth/admin-auth-service";

// only admins can edit other users' profile
const EditOtherProfile = () => {
    const [user, setUser] = useState(null);
    const {currentUser} = useSelector((state) => state.user);

    const {userId} = useParams();
    const navigate = useNavigate();


    // fetch other user
    const fetchUser = async () => {
        console.log(userId);
        // fetch user from database
        const fetchedUser = await getUserById(userId);

        // if the fetched user is the current user, navigate to EditProfile page
        if (currentUser && fetchedUser._id === currentUser._id) {
            navigate("/edit-profile");
            return;
        }
        setUser(fetchedUser);
    }


    useEffect(() => {
        fetchUser();
    }, []);


    // edit other user profile, do not use thunk
    const updateBasedOnRole = async (newProfile) => {
        if (user.role === "viewer") {
            return await updateViewer(newProfile)
        } else if (user.role === "publisher") {
            return await updatePublisher(newProfile)
        } else if (user.role === "admin") {
            return await updateAdmin(newProfile)
        }
    }

    // update the profile of the user
    const handleUpdate = async (updatedInfo) => {
        console.log("update other profile");
        const newProfile = { ...user, ...updatedInfo };
        const response = await updateBasedOnRole(newProfile);
        if (!response.error) {
            navigate(`/admin`); //?
        } else {
            console.log(response.error);
            alert("Update failed. Try to upload a smaller image.");
        }
    }



    return (
        user ? (
            <EditForm
                initialValues={{
                    name: user.name,
                    password: user.password,
                    email: user.email,
                    portrait: user.portrait,
                    selfIntro: user.selfIntro,
                }}
                userRole={user.role}
                handleUpdate={handleUpdate}
                parentLink={`/profile/${userId}`}
            />
        ) : (
            <div>Loading user profile...</div>
        )
    )


}

export default EditOtherProfile;