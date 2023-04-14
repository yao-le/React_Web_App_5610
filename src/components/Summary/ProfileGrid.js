import ProfileItem from "./ProfileItem";
import {Link} from "react-router-dom";


const ProfileGrid = ({users}) => {
    return (
        <div className="wd-profile-summary-grid wd-bg-black-color">
            {users.map((user) => (
                <Link to={`/profile/${user._id}`} className="wd-link-no-decoration"
                      key={user._id} >
                    <ProfileItem user={user}/>
                </Link>
            ))}
        </div>
    )
}

export default ProfileGrid;