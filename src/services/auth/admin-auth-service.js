import axios from "axios";


const SERVER_API_URL = process.env.REACT_APP_SERVER_API_URL;
const ADMINS_URL = `${SERVER_API_URL}/admins`;


const api = axios.create({ withCredentials: true });


export const register = async (newUser) => {
    const response = await api.post(`${ADMINS_URL}/register`, newUser);
    // return current admin
    return response.data;
}

// export const login = async ({name, password}) => {
//     const response = await api.post(`${ADMINS_URL}/login`, {name, password});
//     // return current admin
//     return response.data;
// }

// export const logout = async () => {
//     const response = await api.post(`${ADMINS_URL}/logout`);
//     // return "OK" if successfully logged out
//     return response.data;
// }