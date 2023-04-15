import "../../style/details-style.css";
import "../../style/other-profile.css";
import React, {useEffect, useState} from "react";
import {useParams} from "react-router";
import Navbar from "../Navbar";
import OtherViewerProfile from "./OtherViewerProfile";

// hard code user for testing
import userArray from "../../utils/users.js";


const OtherProfile = () => {
    const [user, setUser] = useState({});

    const {userId} = useParams();

    // fetch other user
    // only for testing purpose, need to be modified
    const fetchUser = async () => {
        console.log(userId);
        // add logic to fetch user
        const index = userArray.findIndex(user => user._id === userId)
        setUser(userArray[index]);
    }

    // only for testing purpose, need to be modified
    useEffect(() => {
        fetchUser();
    }, [userId]);

    return (
        <div>
            <div className="row wd-bg-color-black wd-container">
                {/*Nav bar*/}
                <div className="d-none d-sm-none d-md-block col-2">
                    <Navbar/>
                </div>

                {/*需要修改：如何识别fetched user 的 role， 页面需要分成三种类型吗？other viewer profile,
                 other publisher profile, other admin profile ?*/}
                {/*Profile*/}

                <div className="col-12 col-md-10">
                    <OtherViewerProfile user={user}/>
                </div>


            </div>

        </div>)
}
export default OtherProfile;