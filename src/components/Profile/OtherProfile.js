import "../../style/details-style.css";
import "../../style/other-profile.css";
import React, {useEffect, useState} from "react";
import {useNavigate, useParams} from "react-router";
import Navbar from "../Navbar";
import OtherViewerProfile from "./OtherViewerProfile";

// hard code user for testing
import userArray from "../../utils/users.js";
import {getUserById} from "../../services/auth/auth-service";
import {useSelector} from "react-redux";
import Profile from "./Profile";


const OtherProfile = () => {
    const [user, setUser] = useState(null);

    const {currentUser} = useSelector((state) => state.user);
    const {userId} = useParams();

    const navigate = useNavigate();

    // fetch other user
    const fetchUser = async () => {
        console.log(userId);
        // hard code only for testing purpose
        // const index = userArray.findIndex(user => user._id === userId)
        // setUser(userArray[index]);

        // fetch user from database
        const fetchedUser = await getUserById(userId);

        // if the fetched user is the current user, navigate to profile page
        if (currentUser && fetchedUser._id === currentUser._id) {
            navigate("/profile");
            return;
        }
        setUser(fetchedUser);
    }


    useEffect(() => {
        fetchUser();
    }, [userId]);


    if (!user) {
        return <div>Loading user profile...</div>;
    }


    return (
        <div>
            <div className="row wd-bg-color-black wd-container">
                {/*Nav bar*/}
                <div className="d-none d-sm-none d-md-block col-2">
                    <Navbar/>
                </div>

                {/*需要修改：如何识别fetched user 的 role， profile 页面需要分成三种类型吗？other viewer profile,
                 other publisher profile, other admin profile ?*/}
                {/*Profile*/}
                <div className="col-12 col-md-10">
                    <OtherViewerProfile user={user}/>
                </div>


            </div>
        </div>
    )
}
export default OtherProfile;