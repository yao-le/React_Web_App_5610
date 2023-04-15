import React, { useState } from 'react';
import '../../style/review-form.css';
import "../../style/comment.css";

const CommentForm = ({ submitReview }) => {
    const [reviewText, setReviewText] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        //submit the review
        submitReview(reviewText);
        setReviewText('');
    };

    return (
        <form className="wd-review-form w-75" onSubmit={handleSubmit}>
            <div className="mb-3">
                {/*<label htmlFor="reviewText" className="form-label wd-review-form-label">*/}
                {/*    Add a comment:*/}
                {/*</label>*/}
                <textarea
                    className="form-control wd-review-form-textarea"
                    id="reviewText"
                    value={reviewText}
                    onChange={(e) => setReviewText(e.target.value)}
                    rows="3"
                    placeholder="Add a comment..."
                ></textarea>
            </div>
            <div className="text-end">
                <button className="btn btn-success">
                    Submit
                </button>
            </div>
        </form>
    );
};

export default CommentForm;
