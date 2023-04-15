import axios from 'axios';
import {getHeaders} from "../utils/auth";


const BASE_API = "https://api.spotify.com/v1/albums";


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
