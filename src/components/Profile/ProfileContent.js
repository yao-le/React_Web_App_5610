import {Link} from "react-router-dom";
import {useSelector} from "react-redux";
import ProfileGrid from "../Summary/ProfileGrid";
import {useEffect, useState} from "react";
import {getFollowersByUserId, getFollowingsByUserId} from "../../services/follow-service";
import {getUserById} from "../../services/auth/auth-service";
import Releases from "../Publisher/Releases";
import Collections from "./Collections";


// current user's profile page
const ProfileContent = () => {

    const { currentUser } = useSelector((state) => state.user);

    const [followers, setFollowers] = useState([]);
    const [following, setFollowing] = useState([]);


    // fetch current user's followers
    const fetchFollowers = async () => {
        const fetchedFollowers = await getFollowersByUserId(currentUser._id);
        const users = fetchedFollowers.map(async (relation) => {
            return await getUserById(relation.viewer);
        });
        const userArray = await Promise.all(users);
        setFollowers([...userArray]) // relation array [{viewer, publisher}]
    }

    // fetch current user's following
    const fetchFollowing = async () => {
        const fetchedFollowings = await getFollowingsByUserId(currentUser._id);
        const users = fetchedFollowings.map(async (relation) => {
            return await getUserById(relation.publisher);
        });
        const userArray = await Promise.all(users);
        setFollowing([...userArray]);
    }


    useEffect(() => {
        fetchFollowers();
        fetchFollowing();
    }, []);


    return (
        <div className="wd-details mt-5">
            <div className="wd-details-header">
                <img
                    className="wd-details-img rounded-circle"
                    src={currentUser.portrait || "https://www.alaskapacific.edu/wp-content/uploads/2015/11/placeholder_profile_photo.png"}
                    alt="avatar"
                />
                <div className="wd-details-info ms-5">
                    <div className="mb-2 text-uppercase fw-bold text-muted">
                        <span>Your Profile</span>
                    </div>

                    <div className="wd-details-title">{currentUser.name}</div>

                    {/*description field only for publishers*/}
                    {currentUser.selfIntro &&
                        <div className="fw-bold text-muted fs-6 mt-2">
                            <i className="bi bi-star-fill"></i>
                            <span className="ms-2">{currentUser.selfIntro}</span>
                        </div>
                    }

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

                    {/*following and followers*/}
                    <div className="fw-bold text-muted fs-6 mt-2">
                        <i className="bi bi-people-fill"></i>
                        <span className="ms-2"><span className="text-white">{following.length}</span> Following</span>
                        <span className="ms-4"><span className="text-white">{followers.length}</span> Followers</span>
                    </div>


                    <div className="mt-2 fw-bold text-muted">
                        <Link to="/edit-profile" className="wd-link-no-decoration">
                            <i className="bi bi-pencil-square"></i>
                            <span className="ms-2">Edit Profile</span>
                        </Link>
                    </div>
                </div>
            </div>

            {/*publisher's works*/}
            {
                currentUser.role === "publisher" &&
                <div className="mt-4">
                    <Releases artist={currentUser} />
                </div>
            }


            {/*display current user's album collections*/}
            { currentUser.role !== "admin" &&
                <div className="mt-2">
                   <Collections />
                </div>
            }

            {/*current user's following*/}
            {currentUser.role !== "admin" &&
                <div className="mt-2">
                    <h3 className="fw-bold text-white wd-summary-title">Following</h3>
                    {
                        following.length > 0 ?
                            <ProfileGrid users={following}/> :
                            <h4 className="fw-bold text-muted wd-summary-title mb-5">No following yet</h4>
                    }
                </div>
            }

            {/*current user's followers*/}
            {currentUser.role !== "admin" &&
                <div className="mt-2">
                    <h3 className="fw-bold text-white wd-summary-title">Followers</h3>
                    {
                        followers.length > 0 ?
                            <ProfileGrid users={followers}/> :
                            <h4 className="fw-bold text-muted wd-summary-title mb-5">No followers yet</h4>
                    }
                </div>
            }

        </div>

    );
}

export default ProfileContent;