import axios from 'axios';


const SERVER_API_URL = process.env.REACT_APP_SERVER_API_URL;
const COMMENTS_URL = `${SERVER_API_URL}/comments`;

const api = axios.create({
    withCredentials: true,
});

// aid: spotify album id
export const getCommentForAlbum = async (aid) => {
    const response = await api.get(`${COMMENTS_URL}/album/${aid}`);
    return response.data;
}

export const createComment = async (newComment) => {
    const response  = await api.post(COMMENTS_URL, newComment);
    return response.data;
}

export const deleteComment = async (rid) => {
    const response  = await api.delete(`${COMMENTS_URL}/${rid}`);
    return response.data;
}


// export const findMyReviews = async (userId) => {
//     const response = await api.get(`${REVIEWS_API}/user/qwerqwer`);
//     return response.data;
// };
