import ProfileGrid from "../Summary/ProfileGrid";
import {useSelector} from "react-redux";
import {useEffect, useState} from "react";

import userArray from "../../utils/users.js";
import {useLocation} from "react-router";

// other viewer's profile page
const OtherViewerProfile = ({ user }) => {

    const { pathname } = useLocation();

    const { currentUser } = useSelector((state) => state.user);

    // 需要修改, 可以把以下代码放到OtherProfile.js中，然后传入isFollowing参数?
    const [isFollowing, setIsFollowing] = useState(false);

    const handleFollow = () => {
        setIsFollowing(!isFollowing);
        // add login

    };

    // scroll to the top of the page whenever the path changes.
    useEffect(() => {
        window.scrollTo(0, 0);
    }, [pathname]);


    return (
        <div className="wd-details mt-5">
            <div className="wd-details-header">
                <img
                    className="wd-details-img rounded-circle ms-2"
                    src={user.portrait}
                    alt="avatar"
                />
                <div className="wd-details-info ms-5">
                    <div className="mb-2 text-uppercase fw-bold text-muted">
                        <span>Profile</span>
                    </div>

                    {/*username*/}
                    <div className="wd-details-title">{user.name}</div>


                    {/*created at*/}
                    <div className="fw-bold text-muted fs-6 mt-2">
                        <i className="bi bi-calendar3"></i>
                        <span className="ms-2">Joined {user.createdAt && user.createdAt.slice(0, 7)}</span>
                    </div>

                    {/*follow button*/}
                    <div className="mt-3 fw-bold text-muted">
                        <button
                            className={`wd-follow-button ${isFollowing ? 'following' : ''}`}
                            onClick={handleFollow}
                        >
                            {isFollowing ? 'Following' : 'Follow'}
                        </button>
                    </div>
                </div>
            </div>


            {/*user's followers*/}
            <div className="mt-3">
                <h3 className="fw-bold text-white wd-summary-title">Followers</h3>
                {/*hard coded for now*/}
                <ProfileGrid users={userArray.slice(0, 5)}/>
            </div>

            {/*user's following*/}
            <div className="mt-3">
                <h3 className="fw-bold text-white wd-summary-title">Following</h3>
                {/*hard coded for now*/}
                <ProfileGrid users={userArray.slice(0, 5)}/>
            </div>
        </div>
    );
}

export default OtherViewerProfile;