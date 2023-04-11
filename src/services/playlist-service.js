import axios from 'axios';
import {getHeaders} from "../utils/auth";


const BASE_API = "https://api.spotify.com/v1/playlists";


// country code reference: https://en.wikipedia.org/wiki/ISO_3166-1_alpha-2
// Limit:  Default: 20. Minimum: 1. Maximum: 50
export const getFeaturedPlaylists = async (countryCode, limit=20) => {
    const headers = await getHeaders();
    const response = await axios.get(`https://api.spotify.com/v1/browse/featured-playlists?country=${countryCode}&limit=${limit}`,
        {headers});
    return response.data;

}

export const getPlaylistById  = async (playlistId) => {
    const headers = await getHeaders();
    const response = await axios.get(`${BASE_API}/${playlistId}`, { headers });
    return response.data;
}

// https://developer.spotify.com/documentation/web-api/reference/get-playlists-tracks
export const getPlaylistItems  = async (playlistId) => {
    const headers = await getHeaders();
    const response = await axios.get(`${BASE_API}/${playlistId}/tracks`, { headers });
    return response.data;
}
