import { createSlice } from "@reduxjs/toolkit";
import { loginThunk, logoutThunk, registerThunk,
    profileThunk, updateUserThunk, } from "../services/auth-thunks";


const authSlice = createSlice({
    name: "auth",
    initialState: { currentUser: null },
    reducers: {},
    extraReducers: {
        [loginThunk.fulfilled]: (state, { payload }) => {
            state.currentUser = payload;},
        [registerThunk.fulfilled]: (state, { payload }) => {
            state.currentUser = payload;},
    },
});


export default authSlice.reducer;