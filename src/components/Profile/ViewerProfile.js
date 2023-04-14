import {Link} from "react-router-dom";
import {useSelector} from "react-redux";


const ViewerProfile = () => {

    const { currentUser } = useSelector((state) => state.user);

    return (
        <div className="wd-details mt-5">
            <div className="wd-details-header">
                <img
                    className="wd-details-img"
                    src={currentUser.avatarUrl}
                    alt="avatar"
                />
                <div className="wd-details-info ms-4">
                    <div className="mb-2 text-uppercase fw-bold text-muted">
                        <span>Profile</span>
                    </div>

                    <div className="wd-details-title">{currentUser.username}</div>

                    {/*user email*/}
                    <div className="fw-bold text-muted fs-6 mt-2">
                        <i className="bi bi-envelope-at-fill"></i>
                        <span className="ms-2">{currentUser.email}</span>
                    </div>

                    {/*created at*/}
                    <div className="fw-bold text-muted fs-6 mt-2">
                        <i className="bi bi-calendar3"></i>
                        <span className="ms-2">Joined {currentUser.createdAt.slice(0, 7)}</span>
                    </div>

                    <div className="mt-2 fw-bold text-muted">
                        <Link to="/edit-profile" className="wd-link-no-decoration">
                            <i className="bi bi-pencil-square"></i>
                            <span className="ms-2">Edit Profile</span>
                        </Link>
                    </div>
                </div>
            </div>


            {/*display current viewer's liked songs*/}
            <div>
                <h3 className="fw-bold text-white wd-summary-title">Liked Songs</h3>
            </div>

            <div className="mt-3">
                <h3 className="fw-bold text-white wd-summary-title">Followers</h3>
            </div>

            <div className="mt-3">
                <h3 className="fw-bold text-white wd-summary-title">Following</h3>
            </div>
        </div>

    );
}

export default ViewerProfile;