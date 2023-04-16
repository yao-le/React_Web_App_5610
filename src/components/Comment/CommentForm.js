import React, {useState} from 'react';
import '../../style/review-form.css';
import "../../style/comment.css";
import {useSelector} from "react-redux";

const CommentForm = ({submitReview}) => {
    const {currentUser} = useSelector((state) => state.user);

    const [reviewText, setReviewText] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        //submit the review
        submitReview(reviewText);
        setReviewText('');
    };

    return (
        <form className="wd-review-form wd-width-90" onSubmit={handleSubmit}>
            <div className="d-flex flex-column">
                {
                    currentUser &&
                    <>
                        <div className="mb-1 text-muted">Commenting as</div>
                        <div className="d-flex flex-row align-items-center">
                            <img className="rounded-circle me-2" width="60px" height="60px"
                                 src={currentUser.portrait} alt="avatar"/>
                            <div className="wd-commenterName">{currentUser.name}</div>
                        </div>
                    </>
                }
                <div className="mb-2 mt-1">
                    <textarea
                    className="form-control wd-review-form-textarea"
                    id="reviewText"
                    value={reviewText}
                    onChange={(e) => setReviewText(e.target.value)}
                    rows="3"
                    placeholder="Add a comment..."
                    ></textarea>
                </div>
                <div className="text-end mt-1">
                    <button className="btn btn-success">
                        Submit
                    </button>
                </div>
            </div>
        </form>

    );
};

export default CommentForm;
