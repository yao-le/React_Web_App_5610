import { createSlice } from "@reduxjs/toolkit";
import { loginThunk, logoutThunk, registerThunk} from "../services/auth-thunks";


// 如果后端分成三个user model，可能需要在这里设定一下user role，不太清楚
// const initialState = {
//     currentUser: null,
//     role: "",
// }

// Check if the currentUser object exists in sessionStorage
const currentUser = sessionStorage.getItem("currentUser");

// If it exists, parse the JSON string and set it as the initial state
const initialState = currentUser ? { currentUser:  JSON.parse(currentUser) } : {currentUser: null};



// 需要根据后端修改
const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {},
    extraReducers: {
        [loginThunk.fulfilled]: (state, { payload }) => {
            state.currentUser = payload;},
        [registerThunk.fulfilled]: (state, { payload }) => {
            state.currentUser = payload;},
        [logoutThunk.fulfilled]: (state) => {
            state.currentUser = null;},
    },
});


export default authSlice.reducer;