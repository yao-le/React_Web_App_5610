import {Link} from "react-router-dom";
import {useSelector} from "react-redux";
import ProfileGrid from "../Summary/ProfileGrid";
import {useEffect, useState} from "react";

// only for testing purpose
import userArray from "../../utils/users.js";
import albumArray from "../../utils/albums.js";
import AlbumGrid from "../Summary/AlbumGrid";

// current user's profile page
const ViewerProfile = () => {

    const { currentUser } = useSelector((state) => state.user);

    const [followers, setFollowers] = useState([]);
    const [following, setFollowing] = useState([]);

    const [collection, setCollection] = useState([]);

    // fetch current user's followers
    const fetchFollowers = async () => {

    }

    // fetch current user's following
    const fetchFollowing = async () => {

    }

    // fetch current user's album collection
    const fetchCollection = async () => {

    }


    useEffect(() => {
        fetchFollowers();
        fetchFollowing();
        fetchCollection();
    }, []);


    return (
        <div className="wd-details mt-5">
            <div className="wd-details-header">
                <img
                    className="wd-details-img rounded-circle"
                    src={currentUser.portrait}
                    alt="avatar"
                />
                <div className="wd-details-info ms-5">
                    <div className="mb-2 text-uppercase fw-bold text-muted">
                        <span>Profile</span>
                    </div>

                    <div className="wd-details-title">{currentUser.name}</div>

                    {/*user email*/}
                    {currentUser.email &&
                        <div className="fw-bold text-muted fs-6 mt-2">
                            <i className="bi bi-envelope-at-fill"></i>
                            <span className="ms-2">{currentUser.email}</span>
                        </div>
                    }

                    {/*created at*/}
                    <div className="fw-bold text-muted fs-6 mt-2">
                        <i className="bi bi-calendar3"></i>
                        <span className="ms-2">Joined {currentUser.createdAt && currentUser.createdAt.slice(0, 7)}</span>
                    </div>

                    <div className="mt-2 fw-bold text-muted">
                        <Link to="/edit-profile" className="wd-link-no-decoration">
                            <i className="bi bi-pencil-square"></i>
                            <span className="ms-2">Edit Profile</span>
                        </Link>
                    </div>
                </div>
            </div>


            {/*display current viewer's liked albums*/}
            <div className="mt-1">
                <h3 className="fw-bold text-white wd-summary-title">Favourites</h3>
                <AlbumGrid albums={albumArray} />
            </div>

            <div className="mt-2">
                <h3 className="fw-bold text-white wd-summary-title">Followers</h3>
                {/*hard code for now*/}
                <ProfileGrid users={userArray.slice(0, 5)} />
            </div>

            <div className="mt-2">
                <h3 className="fw-bold text-white wd-summary-title">Following</h3>
                {/*hard code for now*/}
                <ProfileGrid users={userArray.slice(0, 5)} />
            </div>
        </div>

    );
}

export default ViewerProfile;