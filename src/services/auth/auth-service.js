import axios from 'axios';
import {deleteCommentsByUserId} from "../comment-service";


const SERVER_API_URL = process.env.REACT_APP_SERVER_API_URL;
const USERS_URL = `${SERVER_API_URL}/users`;


const api = axios.create({ withCredentials: true });


export const login = async ({name, password}) => {
    const response = await api.post(`${USERS_URL}/login`, {name, password});
    // return current user
    return response.data;
}


export const logout = async () => {
    const response = await api.post(`${USERS_URL}/logout`);
    // return "OK" if successfully logged out
    return response.data;
}


export const getUserById = async (uid) => {
    const response = await api.get(`${USERS_URL}/${uid}`);
    return response.data;
}

export const getAllUsers = async () => {
    const response = await api.get(USERS_URL);
    return response.data;
}

export const deleteUser = async (uid) => {
    await deleteCommentsByUserId(uid); // delete all comments by this user
    const response = await api.delete(`${USERS_URL}/${uid}`);
    return response.data;
}



// export const register = async (newUser) => {
//     const response = await api.post(`${USERS_URL}/register`, newUser);
//     // return current user
//     return response.data;
// }
//


