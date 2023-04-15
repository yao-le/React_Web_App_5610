import { createAsyncThunk } from "@reduxjs/toolkit";
import * as viewerService from "./viewer-auth-service.js";


// export const viewerLoginThunk = createAsyncThunk(
//     "viewer/login", async (credentials) => {
//         const user = await viewerService.login(credentials);
//         return user;
//     }
// );

export const viewerRegisterThunk = createAsyncThunk(
    "viewer/register", async (newUser) => {
        const user = await viewerService.register(newUser);
        return user;
    }
);

// export const viewerLogoutThunk = createAsyncThunk(
//     "user/logout", async () => {
//         const response = await viewerService.logout();
//         return response;
//     }
// );