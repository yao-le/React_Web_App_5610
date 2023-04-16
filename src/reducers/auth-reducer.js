import { createSlice } from "@reduxjs/toolkit";
import {viewerRegisterThunk, updateViewerThunk}
    from "../services/auth/viewer-auth-thunk.js";
import {publisherRegisterThunk, updatePublisherThunk}
    from "../services/auth/publisher-auth-thunk";
import {adminRegisterThunk, updateAdminThunk}
    from "../services/auth/admin-auth-thunk.js";
import { loginThunk, logoutThunk } from "../services/auth/auth-thunks";

// currentUser's role field: "viewer", "publisher", "admin"


// Check if the currentUser object exists in sessionStorage
const currentUser = sessionStorage.getItem("currentUser");

// If it exists, parse the JSON string and set it as the initial state
const initialState = currentUser ? { currentUser:  JSON.parse(currentUser) } : {currentUser: null};



// need to be modified based on backend interfaces
const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {},
    extraReducers: {
        [viewerRegisterThunk.fulfilled]: (state, { payload }) => {
            state.currentUser = payload;},
        [publisherRegisterThunk.fulfilled]: (state, { payload }) => {
            state.currentUser = payload;},
        [adminRegisterThunk.fulfilled]: (state, { payload }) => {
            state.currentUser = payload;},
        [loginThunk.fulfilled]: (state, { payload }) => {
            state.currentUser = payload;},
        [logoutThunk.fulfilled]: (state) => {
            state.currentUser = null;},
        [updateViewerThunk.fulfilled]: (state, { payload }) => {
            state.currentUser = payload;
        },
        [updatePublisherThunk.fulfilled]: (state, { payload }) => {
            state.currentUser = payload;
        },
        [updateAdminThunk.fulfilled]: (state, { payload }) => {
            state.currentUser = payload;
        },
    },
});


export default authSlice.reducer;