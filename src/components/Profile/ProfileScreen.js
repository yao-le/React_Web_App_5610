import React, { useState } from 'react';
import "../../style/profile.css";
import {useSelector} from "react-redux";
import Navbar from "../Navbar";


const ProfileScreen = () => {

    const { currentUser } = useSelector((state) => state.user)
    const [profile, setProfile] = useState(currentUser);

    return <div>
        <div className="row wd-bg-color-black wd-container">
            {/*Nav bar*/}
            <div className="d-none d-sm-none d-md-block col-2">
                <Navbar/>
            </div>

            {/*Profile*/}
            <div className="col-12 col-md-10">
                <h2 className="text-white">Profile Screen</h2>
            </div>

        </div>

    </div>

};

export default ProfileScreen;
