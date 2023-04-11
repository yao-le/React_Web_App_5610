import axios from 'axios';
import {getHeaders} from "../utils/auth";


const BASE_API = "https://api.spotify.com/v1/artists";


export const getArtistById  = async (artistId) => {
    const headers = await getHeaders();
    const response = await axios.get(`${BASE_API}/${artistId}`, { headers });
    return response.data;
}

export const getArtistAlbums = async (artistId, limit=20) => {
    const headers = await getHeaders();
    const response = await axios.get(`${BASE_API}/${artistId}/albums?limit=${limit}`, { headers });
    return response.data;
}


// https://developer.spotify.com/documentation/web-api/reference/get-an-artists-top-tracks
export const getTopTracks = async (artistId, market) => {
    const headers = await getHeaders();
    const response = await axios.get(`${BASE_API}/${artistId}/top-tracks?market=${market}`, { headers });
    return response.data;
}

export const getRelatedArtist = async (artistId) => {
    const headers = await getHeaders();
    const response = await axios.get(`${BASE_API}/${artistId}/related-artists`, { headers });
    return response.data;
}

