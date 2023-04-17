import "../../style/profile-item.css";
import {Link} from "react-router-dom";


const ProfileItem = ({user}) => {

    return (
        <Link to={`/profile/${user._id}`} className="wd-link-no-decoration">
            <div className="wd-profile-item">
                <img
                    className="wd-profile-avatar"
                    src={user.portrait}
                    alt={user.name}
                />
                <div className="wd-profile-info">
                        <div className="wd-profile-username">{user.name}</div>
                    <div className="wd-profile-label text-muted">Profile</div>
                </div>
            </div>
        </Link>
    );


};

export default ProfileItem;
