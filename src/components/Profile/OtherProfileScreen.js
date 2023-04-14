import "../../style/details-style.css"
import React, {useEffect, useState} from "react";
import {useParams} from "react-router";
import Navbar from "../Navbar";


const OtherProfileScreen = () => {
    const [user, setUser] = useState({});

    const {userId} = useParams();

    const fetchUser = async () => {
        console.log(userId);
        // add logic to fetch user
    }

    useEffect(() => {
        fetchUser();
    }, []);

    return (
        <div>
            <div className="row wd-bg-color-black wd-container">
                {/*Nav bar*/}
                <div className="d-none d-sm-none d-md-block col-2">
                    <Navbar/>
                </div>

                {/*Profile*/}
                <div className="col-12 col-md-10">
                    <div className="text-white">Other Profile Screen</div>
                </div>

            </div>

        </div>)
}
export default OtherProfileScreen;