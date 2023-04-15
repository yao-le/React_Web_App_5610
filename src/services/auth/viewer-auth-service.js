import axios from "axios";


const SERVER_API_URL = process.env.REACT_APP_SERVER_API_URL;
const VIEWERS_URL = `${SERVER_API_URL}/viewers`;


const api = axios.create({ withCredentials: true });


export const register = async (newUser) => {
    const response = await api.post(`${VIEWERS_URL}/register`, newUser);
    // return current viewer
    return response.data;
}

// export const login = async ({name, password}) => {
//     const response = await api.post(`${VIEWERS_URL}/login`, {name, password});
//     // return current viewer
//     return response.data;
// }

// export const logout = async () => {
//     const response = await api.post(`${VIEWERS_URL}/logout`);
//     // return "OK" if successfully logged out
//     return response.data;
// }