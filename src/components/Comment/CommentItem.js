import {getUserById} from "../../services/auth/auth-service";
import {useEffect, useState} from "react";
import {Link} from "react-router-dom";

const CommentItem = ({ comment }) => {
    const [commenter, setCommenter] = useState(null);

    const fetchCommenter = async () => {
        const fetchedCommenter = await getUserById(comment.commenter);
        setCommenter(fetchedCommenter);
    }

    useEffect(() => {
        fetchCommenter()
    }, []);

    if (!commenter) {
        return <div>Loading commenter...</div>;
    }

    return (
        <div className="wd-commentItem w-75">
            <Link to={`/profile/${commenter._id}`} className="wd-link-no-decoration">
                <img className="wd-commenterImage" src={commenter.portrait} alt={commenter.name} />
            </Link>

            <div className="d-flex flex-column">
                <div className="d-flex flex-row align-items-center">
                    <Link to={`/profile/${commenter._id}`} className="wd-link-no-decoration">
                        <span className="wd-commenterName">{commenter.name}</span>
                    </Link>
                    <span className="wd-commentDate ms-2">{comment.createdAt.slice(0, 10)}</span>
                </div>
                <span className="wd-commentText">{comment.content}</span>
            </div>
        </div>
    )
}

export default CommentItem;