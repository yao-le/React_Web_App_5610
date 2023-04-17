import {useEffect, useState} from "react";
import {getAllUsers} from "../../services/auth/auth-service";
import ProfileGrid from "../Summary/ProfileGrid";


const NewMembers = () => {

    const [newMembers, setNewMembers] = useState([]);

    const fetchNewMembers = async () => {
        let members = await getAllUsers();
        if (members.length > 6) {
            members = members.slice(0, 6);
        }
        setNewMembers([...members]);
    }

    useEffect(() => {
        fetchNewMembers();
    }, [newMembers]);

    return (
        <div className="mb-5">
            <h3 className="fw-bold text-white wd-summary-title">New Members</h3>
            {
                newMembers.length > 0 ?
                    <ProfileGrid users={newMembers} />
                    :
                    <h4 className="fw-bold text-muted wd-summary-title">No members yet</h4>
            }
        </div>
    )
}

export default NewMembers;