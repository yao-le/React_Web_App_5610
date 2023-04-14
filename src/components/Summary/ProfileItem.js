import "../../style/profile-item.css";


const ProfileItem = ({ user }) => {
    return (
        <div className="wd-profile-item">
            <img
                className="wd-profile-avatar"
                src={user.avatarUrl}
                alt={user.username}
            />
            <div className="wd-profile-info">
                <div className="wd-profile-username">{user.username}</div>
                <div className="wd-profile-label text-muted">Profile</div>
            </div>
        </div>
    );
};

export default ProfileItem;
