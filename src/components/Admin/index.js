import Navbar from "../Navbar";
import {useEffect, useState} from "react";
import {getAllUsers} from "../../services/auth/auth-service";
import ProfileGrid from "../Summary/ProfileGrid";
import {useSelector} from "react-redux";



const Admin = () => {

    const {currentUser} = useSelector((state) => state.user);

    const [allUsers, setAllUsers] = useState([]);

    const fetchAllUsers = async () => {
        const fetchedUsers = await getAllUsers();
        const users = fetchedUsers.filter(user =>
            user._id !== currentUser._id);
        setAllUsers(users);
    }

    useEffect(() => {
        fetchAllUsers();
    }, [allUsers]);

    return (
        <div className="row wd-bg-color-black wd-container">
            <div className="d-none d-sm-none d-md-block col-2">
                <Navbar/>
            </div>

            <div className="col-12 col-md-10">
                <div className="wd-width-95">
                    <div className="wd-bg-color-black">

                        <h3 className="fw-bold text-white wd-summary-title">Members</h3>
                        {
                            allUsers.length > 0 ?
                                <ProfileGrid users={allUsers} /> :
                                <h4 className="fw-bold text-muted wd-summary-title">No Other Members</h4>
                        }
                    </div>
                </div>
            </div>

        </div>
    )
}

export default Admin;