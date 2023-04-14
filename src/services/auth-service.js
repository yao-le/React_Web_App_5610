import axios from 'axios';


const SERVER_API_URL = process.env.REACT_APP_SERVER_API_URL;
const USERS_URL = `${SERVER_API_URL}/users`;


const api = axios.create({ withCredentials: true });


// need to be modified based on the backend interface

export const register = async (newUser) => {
    const response = await api.post(`${USERS_URL}/register`, newUser);
    // return current user
    return response.data;
}

export const login = async ({username, password}) => {
    const response = await api.post(`${USERS_URL}/login`, {username, password});
    // return current user
    return response.data;
}

export const logout = async () => {
    const response = await api.post(`${USERS_URL}/logout`);
    // return "OK" if successfully logged out
    return response.data;
}
