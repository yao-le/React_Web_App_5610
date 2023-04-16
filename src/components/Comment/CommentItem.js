import {getUserById} from "../../services/auth/auth-service";
import {useEffect, useState} from "react";
import {Link} from "react-router-dom";
import {useSelector} from "react-redux";
import {deleteComment} from "../../services/comment-service";

const CommentItem = ({ comment }) => {
    const {currentUser} = useSelector((state) => state.user);

    const [commenter, setCommenter] = useState(null);


    const fetchCommenter = async () => {
        const fetchedCommenter = await getUserById(comment.commenter);
        setCommenter(fetchedCommenter);
    }

    useEffect(() => {
        fetchCommenter()
    }, []);


    const handleDeleteComment = async () => {
        const response = await deleteComment(comment._id);
        console.log(response);
    }

    if (!commenter) {
        return <div>Loading commenter...</div>;
    }

    return (
        <div className="wd-commentItem wd-width-90 d-flex">
            <div className="d-flex">
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
            {/*delete button*/}
            {
                currentUser && currentUser._id === commenter._id &&
                <div className="ms-auto me-2">
                    <i className="bi bi-x-circle wd-delete-icon"
                       onClick={handleDeleteComment}>
                    </i>
                </div>
            }
        </div>
    )
}

export default CommentItem;