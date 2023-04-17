import React from 'react';
import "../../style/details-style.css"
import Navbar from "../Navbar";
import ProfileContent from "./ProfileContent";


const Profile = () => {

    return <div>
        <div className="row wd-bg-color-black wd-container">
            {/*Nav bar*/}
            <div className="d-none d-sm-none d-md-block col-2">
                <Navbar/>
            </div>

            {/*Main Profile Content*/}
            <div className="col-12 col-md-10">
                <ProfileContent/>
            </div>

        </div>

    </div>

};

export default Profile;
