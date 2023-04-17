import axios from 'axios';
import {getHeaders} from "../utils/auth";


const BASE_API = "https://api.spotify.com/v1/tracks";

const SERVER_API_URL = process.env.REACT_APP_SERVER_API_URL;
const TRACKS_URL = `${SERVER_API_URL}/tracks`


const api = axios.create({
    withCredentials: true,
});

const getSeeds= (seeds, n) => {
    if (seeds.length <= 5) {
        return seeds;
    } else {
        const shuffled = seeds.slice().sort(() => 0.5 - Math.random());
        return shuffled.slice(0, n);
    }
}


// https://developer.spotify.com/documentation/web-api/reference/get-recommendations#available-genre-seeds
// Limit:  Default: 20. Minimum: 1. Maximum: 100.
export const getRecommendations = async (seedGenres, limit=20) => {
    const headers = await getHeaders();
    const seeds = getSeeds(seedGenres, 5);
    const response = await axios.get(
        `https://api.spotify.com/v1/recommendations?limit=${limit}&seed_genres=${seeds.join(",")}`,
        {headers});
    return response.data;
}

export const getTrackById  = async (trackId) => {
    const headers = await getHeaders();
    const response = await axios.get(`${BASE_API}/${trackId}`, { headers });
    return response.data;
}


export const getLocalTrackById = async (trackId) => {
    const response = await api.get(`${TRACKS_URL}/${trackId}`);
    return response.data;
}

export const createLocalTrack = async (newTrack) => {
    const response = await api.post(TRACKS_URL, newTrack);
    return response.data;
}

export const deleteLocalTrack = async (trackId) => {
    const response = await api.delete(`${TRACKS_URL}/${trackId}`);
    return response.data
}

export const updateLocalTrack = async (trackId, track) => {
    const response = await api.put(`${TRACKS_URL}/${trackId}`, track);
    return response.data;
}

export const getTracksByAlbumId = async (albumId) => {
    const response = await api.get(`${TRACKS_URL}/album/${albumId}`);
    return response.data;
}