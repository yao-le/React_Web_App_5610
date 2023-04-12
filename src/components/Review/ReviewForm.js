import React, { useState } from 'react';
import '../../style/review-form.css';

const ReviewForm = ({ submitReview }) => {
    const [reviewText, setReviewText] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        // add some logic to submit the review
        submitReview(reviewText);
        setReviewText('');
    };

    return (
        <form className="wd-review-form w-50" onSubmit={handleSubmit}>
            <div className="mb-3">
                <label htmlFor="reviewText" className="form-label wd-review-form-label">
                    Write your review:
                </label>
                <textarea
                    className="form-control wd-review-form-textarea"
                    id="reviewText"
                    value={reviewText}
                    onChange={(e) => setReviewText(e.target.value)}
                    rows="3"
                ></textarea>
            </div>
            <button type="submit" className="btn btn-success">
                Submit
            </button>
        </form>
    );
};

export default ReviewForm;
