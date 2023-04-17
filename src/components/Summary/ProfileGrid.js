import ProfileItem from "./ProfileItem";


const ProfileGrid = ({users}) => {


    return (
        <div className="wd-profile-summary-grid wd-bg-black-color">
            {users.map((user) => (
                <ProfileItem key={user._id} user={user} />
            ))}
        </div>
    )
}

export default ProfileGrid;