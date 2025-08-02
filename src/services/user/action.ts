import { createAsyncThunk } from '@reduxjs/toolkit';
import {
	loginUser,
	registerUser,
	logoutUser,
	resetPassword as resetPasswordApi,
	forgotPassword as forgotPasswordApi,
} from '../../utils/api/session-api';
import { getUserInfo, updateUserInfo } from '../../utils/api/user-api';

export const login = createAsyncThunk('user/login', loginUser);

export const register = createAsyncThunk('user/register', registerUser);

export const forgotPassword = createAsyncThunk(
	'user/forgotPassword',
	forgotPasswordApi
);

export const resetPassword = createAsyncThunk(
	'user/resetPassword',
	resetPasswordApi
);

export const fetchUser = createAsyncThunk('user/fetchUser', getUserInfo);

export const updateUser = createAsyncThunk('user/updateUser', updateUserInfo);

export const logout = createAsyncThunk('user/logout', logoutUser);
