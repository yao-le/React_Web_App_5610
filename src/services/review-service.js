import axios from 'axios';


export const getReviewById = async (reviewId) => {
    const response = await axios.get(`${process.env.REACT_APP_LOCAL_API_URL}/api/reviews/${reviewId}`);
    return response.data;
}

export const createReview  = async (newReview) => {
    const response  = await axios.post(`${process.env.REACT_APP_LOCAL_API_URL}/api/reviews`, newReview);
    return response.data;
}

