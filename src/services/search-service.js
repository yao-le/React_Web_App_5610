import axios from 'axios';
import {getHeaders} from "../utils/auth";


const BASE_API = "https://api.spotify.com/v1/search";


export const searchForItems = async (query) => {
    const headers = await getHeaders();
    const response = await axios.get(
        `${BASE_API}?q=${query}&type=album,track,artist,playlist&limit=10`, { headers });
    return response.data;
}
