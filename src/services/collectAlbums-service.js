import axios from 'axios';


const SERVER_API_URL = process.env.REACT_APP_SERVER_API_URL;
const COLLECTS_URL = `${SERVER_API_URL}/collects/albums`;


const api = axios.create({
    withCredentials: true,
});


export const getCollectedByUserId = async (uid) => {
    const response = await api.get(`${COLLECTS_URL}/${uid}`);
    return response.data;
}

export const createCollectAlbum = async (newRelation) => {
    const response  = await api.post(COLLECTS_URL, newRelation);
    return response.data;
}

export const deleteCollectAlbum = async (uid, aid) => {
    const response  = await api.delete(`${COLLECTS_URL}/${uid}/${aid}`);
    return response.data;
}


// find out if the user has collected the album
// ? response.data === null means the user has not collected the album
export const findCollectAlbum = async (uid, aid) => {
    const response = await api.get(`${COLLECTS_URL}/${uid}/${aid}`);
    return response.data;
}

