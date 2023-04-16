import { createAsyncThunk } from "@reduxjs/toolkit";
import * as publisherService from "./publisher-auth-service.js";


// export const publisherLoginThunk = createAsyncThunk(
//     "publisher/login", async (credentials) => {
//         const user = await publisherService.login(credentials);
//         return user;
//     }
// );

export const publisherRegisterThunk = createAsyncThunk(
    "publisher/register", async (newUser) => {
        const user = await publisherService.register(newUser);
        return user;
    }
);

export const updatePublisherThunk = createAsyncThunk(
    "publisher/update",
    async (publisher) => {
        const status = await publisherService.updatePublisher(publisher);
        return publisher;
    }
);

// export const publisherLogoutThunk = createAsyncThunk(
//     "publisher/logout", async () => {
//         const response = await publisherService.logout();
//         return response;
//     }
// );