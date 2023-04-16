import { createAsyncThunk } from "@reduxjs/toolkit";
import * as adminService from "./admin-auth-service.js";


// export const adminLoginThunk = createAsyncThunk(
//     "admin/login", async (credentials) => {
//         const user = await adminService.login(credentials);
//         return user;
//     }
// );

export const adminRegisterThunk = createAsyncThunk(
    "admin/register", async (newUser) => {
        const user = await adminService.register(newUser);
        return user;
    }
);

export const updateAdminThunk = createAsyncThunk(
    "admin/update",
    async (admin) => {
        const status = await adminService.updateAdmin(admin);
        return admin;
    }
);

// export const adminLogoutThunk = createAsyncThunk(
//     "admin/logout", async () => {
//         const response = await adminService.logout();
//         return response;
//     }
// );