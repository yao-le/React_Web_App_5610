import { createAsyncThunk } from "@reduxjs/toolkit";
import * as authService from "./auth-service";


export const loginThunk = createAsyncThunk(
    "user/login", async (credentials) => {
        const user = await authService.login(credentials);
        return user;
    }
);

export const registerThunk = createAsyncThunk(
    "user/register", async (newUser) => {
        const user = await authService.register(newUser);
        return user;
    }
);

export const logoutThunk = createAsyncThunk(
    "user/logout", async () => {
        const response = await authService.logout();
        return response;
    }
);