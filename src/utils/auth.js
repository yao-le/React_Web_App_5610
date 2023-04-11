import axios from 'axios';
import qs from "qs";

const clientId = process.env.REACT_APP_CLIENT_ID
const clientSecret = process.env.REACT_APP_CLIENT_SECRET;

const getClientCredentialsToken = async () => {
    try {
        const url = 'https://accounts.spotify.com/api/token';

        // console.log(clientId);
        // console.log(clientSecret);

        const headers = {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Authorization': 'Basic ' + btoa(`${clientId}:${clientSecret}`),
        };
        const requestBody = qs.stringify({ grant_type: 'client_credentials' });

        const response = await axios.post(url, requestBody, { headers });
        return response.data;
    } catch (error) {
        console.error('Failed in getting access token:', error);
    }
}

const getAccessToken = async () =>  {
    const accessToken = sessionStorage.getItem('token');
    const expiresAt = sessionStorage.getItem('expiresAt');

    // check if the access token has expired or has not been found
    if (accessToken == null || (accessToken && expiresAt && Date.now() >= expiresAt)) {
        // request a new token
        const newTokenData = await getClientCredentialsToken();
        sessionStorage.setItem('token', newTokenData.access_token);
        sessionStorage.setItem('expiresAt', Date.now() + newTokenData.expires_in * 1000);
        return newTokenData.access_token;
    }

    return accessToken;
}

export const getHeaders = async () => {
    const token = await getAccessToken();

    return {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
    };
};




