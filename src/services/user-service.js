import axios from 'axios';


export const register = async (newUser) => {
    const response  = await axios.post(`${process.env.REACT_APP_LOCAL_API_URL}/register`, newUser);
    return response.data;
}

export const login = async (user) => {
    const response = await axios.post(`${process.env.REACT_APP_LOCAL_API_URL}/login`, user);
    return response.data;
}

export const updateUserReviews = async (userId, newReview) => {
    const response = await axios.put(`${process.env.REACT_APP_LOCAL_API_URL}/api/users/${userId}/reviews`, newReview);
    return response.data;
}

export const getUserById = async (userId) => {
    const response = await axios.get(`${process.env.REACT_APP_LOCAL_API_URL}/api/users/${userId}`);
    return response.data;
}