import axios from 'axios';


const SERVER_API_URL = process.env.REACT_APP_SERVER_API_URL;


const api = axios.create({
    withCredentials: true,
});


export const getFollowersByUserId = async (uid) => {
    const response = await api.get(`${SERVER_API_URL}/followers/${uid}`);
    return response.data;
}

export const getFollowingsByUserId = async (uid) => {
    const response = await api.get(`${SERVER_API_URL}/followings/${uid}`);
    return response.data;
}

export const followUser = async (vid, pid) => {
    const response  = await api.post(`${SERVER_API_URL}/follows/${vid}/${pid}`);
    return response.data;
}

export const unFollowUser = async (vid, pid) => {
    const response  = await api.delete(`${SERVER_API_URL}/follows/${vid}/${pid}`);
    return response.data;
}

export const deleteAllFollowRelationByUserId = async (uid) => {
    const response  = await api.delete(`${SERVER_API_URL}/follow-relation/${uid}`);
    return response.data;
}

export  const findFollowRelation = async (vid, pid) => {
    const response  = await api.get(`${SERVER_API_URL}/follow-relation/${vid}/${pid}`);
    return response.data;
}

