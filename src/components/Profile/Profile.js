import React from 'react';
import "../../style/details-style.css"
import {useSelector} from "react-redux";
import Navbar from "../Navbar";
import ViewerProfile from "./ViewerProfile";


const Profile = () => {

    const { currentUser } = useSelector((state) => state.user)

    return <div>
        <div className="row wd-bg-color-black wd-container">
            {/*Nav bar*/}
            <div className="d-none d-sm-none d-md-block col-2">
                <Navbar/>
            </div>

            {/*Profile*/}
            <div className="col-12 col-md-10">
                {/*需要修改： 根据current user 的role，来显示不同样式的profile： viewerProfile, adminProfile, publisherProfile*/}
                <ViewerProfile/>
            </div>

        </div>

    </div>

};

export default Profile;
