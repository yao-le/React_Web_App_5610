import axios from 'axios';
import {getHeaders} from "../utils/auth";
import {seedArtists} from "../utils/seeds";


const BASE_API = "https://api.spotify.com/v1/tracks";


// https://developer.spotify.com/documentation/web-api/reference/get-recommendations#available-genre-seeds
// Limit:  Default: 20. Minimum: 1. Maximum: 100.
export const getRecommendations = async (limit=20) => {
    const headers = await getHeaders();
    const response = await axios.get(
        `https://api.spotify.com/v1/recommendations?limit=${limit}&seed_artists=${seedArtists}`,
        {headers});
    return response.data;

}

export const getTrackById  = async (trackId) => {
    const headers = await getHeaders();
    const response = await axios.get(`${BASE_API}/${trackId}`, { headers });
    return response.data;
}