import axios from 'axios';


// need to be modified based on the backend interface

export const getReviewById = async (reviewId) => {
    const response = await axios.get(`${process.env.REACT_APP_SERVER_API_URL}/reviews/${reviewId}`);
    return response.data;
}

export const createReview  = async (newReview) => {
    const response  = await axios.post(`${process.env.REACT_APP_SERVER_API_URL}/reviews`, newReview);
    return response.data;
}

