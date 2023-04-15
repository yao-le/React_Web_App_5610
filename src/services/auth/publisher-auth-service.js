import axios from "axios";


const SERVER_API_URL = process.env.REACT_APP_SERVER_API_URL;
const PUBLISHERS_URL = `${SERVER_API_URL}/publishers`;


const api = axios.create({ withCredentials: true });


export const register = async (newUser) => {
    const response = await api.post(`${PUBLISHERS_URL}/register`, newUser);
    // return current publisher
    return response.data;
}

// export const login = async ({name, password}) => {
//     const response = await api.post(`${PUBLISHERS_URL}/login`, {name, password});
//     // return current publisher
//     return response.data;
// }

// export const logout = async () => {
//     const response = await api.post(`${PUBLISHERS_URL}/logout`);
//     // return "OK" if successfully logged out
//     return response.data;
// }