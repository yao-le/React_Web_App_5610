import axios from 'axios';
import {getHeaders} from "../utils/auth";


const BASE_API = "https://api.spotify.com/v1/albums";

const SERVER_API_URL = process.env.REACT_APP_SERVER_API_URL;
const ALBUMS_URL = `${SERVER_API_URL}/albums`

const api = axios.create({
    withCredentials: true,
});


// use spotify api
export const getAlbumById  = async (albumId) => {
    const headers = await getHeaders();
    const response = await axios.get(`${BASE_API}/${albumId}`, { headers });
    return response.data;
}


// Country code reference: https://en.wikipedia.org/wiki/ISO_3166-1_alpha-2
// Limit:  Default: 20. Minimum: 1. Maximum: 50
export const getNewReleases = async (countryCode, limit=20) => {
    const headers = await getHeaders();
    const response = await axios.get(`https://api.spotify.com/v1/browse/new-releases?country=${countryCode}&limit=${limit}`,
        { headers });
    return response.data;
}


export const getLocalAlbumById = async (albumId) => {
    const response = await api.get(`${ALBUMS_URL}/${albumId}`);
    return response.data;
}

export const createLocalAlbum = async (album) => {
    console.log(album);
    const response = await api.post(ALBUMS_URL, album);
    return response.data;
}

export const deleteLocalAlbum = async (albumId) => {
    const response = await api.delete(`${ALBUMS_URL}/${albumId}`);
    return response.data;
}

export const updateLocalAlbum = async (albumId, album) => {
    const response = await api.put(`${ALBUMS_URL}/${albumId}`, album);
    return response.data;
}

export const findAllLocalAlbums = async () => {
    const response = await api.get(ALBUMS_URL);
    return response.data;
}

export const findLocalAlbumsByPublisherId = async (pid) => {
    const response = await api.get(`${ALBUMS_URL}/publisher/${pid}`);
    return response.data;
}