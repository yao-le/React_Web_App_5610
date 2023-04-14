import { createSlice } from "@reduxjs/toolkit";
import { loginThunk, logoutThunk, registerThunk,
    profileThunk, updateUserThunk, } from "../services/auth-thunks";


// 如果后端分成三个user model，可能需要在这里设定user role
// const initialState = {
//     currentUser: null,
//     role: "",
// }


// 需要根据后端修改
const authSlice = createSlice({
    name: "auth",
    initialState: { currentUser: null },
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