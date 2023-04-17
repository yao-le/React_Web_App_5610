import ProfileGrid from "../Summary/ProfileGrid";
import {useSelector} from "react-redux";
import {useEffect, useState} from "react";

import userArray from "../../utils/users.js";
import {useLocation, useNavigate} from "react-router";
import {Link} from "react-router-dom";
import {deleteUser} from "../../services/auth/auth-service";


// other viewer's profile page
const OtherViewerProfile = ({user}) => {
    const {currentUser} = useSelector((state) => state.user);

    const {pathname} = useLocation();
    const navigate = useNavigate();

    // 需要修改, 可以把以下代码放到OtherProfile.js中，然后传入isFollowing参数?
    const [isFollowing, setIsFollowing] = useState(false);


    const handleFollow = () => {
        if (!currentUser) {
            alert("Please login first");
            navigate("/login");
            return;
        }
        // only logged-in user can follow other users
        setIsFollowing(!isFollowing);
        // add login
    };

    // scroll to the top of the page whenever the path changes.
    useEffect(() => {
        window.scrollTo(0, 0);
    }, [pathname]);


    const handleDelete = async () => {
        const response = await deleteUser(user._id);
        if (response.deletedCount > 0) {
            alert("User deleted successfully");
            navigate("/admin");
        }
    }

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
                        {
                            user.role === "admin" && <span>Admin</span>
                        }
                        {
                            user.role === "publisher" && <span>Artist</span>
                        }
                        {
                            user.role === "viewer" && <span>Profile</span>
                        }
                    </div>

                    {/*username*/}
                    <div className="wd-details-title">{user.name}</div>

                    {/*publisher self intro*/}
                    {user.selfIntro &&
                        <div className="fw-bold text-muted fs-6 mt-2">
                            <i className="bi bi-star-fill"></i>
                            <span className="ms-2">{user.selfIntro}</span>
                        </div>
                    }

                    {/*created at*/}
                    <div className="fw-bold text-muted fs-6 mt-2">
                        <i className="bi bi-calendar3"></i>
                        <span className="ms-2">Joined {user.createdAt && user.createdAt.slice(0, 7)}</span>
                    </div>

                    {/*admin can edit other normal user's profile*/}
                    {
                        currentUser
                        && (user.role !== "admin")
                        && currentUser.role === "admin" &&
                        <>
                            <div className="d-flex flex-row mb-3">
                                {/*admin can edit other user's profile*/}
                                <div className="mt-2 fw-bold text-muted">
                                    <Link to={`/edit-profile/${user._id}`} className="wd-link-no-decoration">
                                        <i className="bi bi-pencil-square"></i>
                                        <span className="ms-2">Edit Profile</span>
                                    </Link>
                                </div>

                                {/*admin can delete other users*/}
                                <div className="mt-2 fw-bold text-muted ms-3">
                                    <i className="bi bi-person-dash"></i>
                                    <span className="ms-2 wd-cursor-pointer" onClick={handleDelete}>
                                        Delete account
                                    </span>
                                </div>
                            </div>
                        </>
                    }

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

            {/*publisher's works*/}
            {
                user.role === "publisher" &&
                <div className="mt-3">
                    <h3 className="fw-bold text-white wd-summary-title">Releases</h3>
                </div>
            }

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