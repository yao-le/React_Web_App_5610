import axios from 'axios';


const SERVER_API_URL = process.env.REACT_APP_SERVER_API_URL;
const LIKES_URL = `${SERVER_API_URL}/likes/tracks`;


const api = axios.create({
    withCredentials: true,
});


export const getLikedByUserId = async (uid) => {
    const response = await api.get(`${LIKES_URL}/${uid}`);
    return response.data;
}

export const createLikeTrack = async (newRelation) => {
    const response  = await api.post(LIKES_URL, newRelation);
    return response.data;
}

export const deleteLikeTrack = async (uid, tid) => {
    const response  = await api.delete(`${LIKES_URL}/${uid}/${tid}`);
    return response.data;
}


// find out if the user has liked the track
export const findLikeTrack = async (uid, tid) => {
    const response = await api.get(`${LIKES_URL}/${uid}/${tid}`);
    return response.data;
}

