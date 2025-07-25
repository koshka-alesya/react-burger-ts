import { createAsyncThunk } from '@reduxjs/toolkit';
import {
	loginUser,
	registerUser,
	logoutUser,
	resetPassword as resetPasswordApi,
	forgotPassword as forgotPasswordApi,
} from '../../utils/api/session-api';
import { getUserInfo, updateUserInfo } from '../../utils/api/user-api';
import {
	LoginRequest,
	RegisterRequest,
	ResetPasswordRequest,
	ForgotPasswordRequest,
	UpdateUserRequest,
	UserResponse,
} from '@/utils/types';

export const login = createAsyncThunk(
	'user/login',
	async (data: LoginRequest) => {
		return loginUser(data);
	}
);

export const register = createAsyncThunk(
	'user/register',
	async (data: RegisterRequest) => {
		return registerUser(data);
	}
);

export const forgotPassword = createAsyncThunk(
	'user/forgotPassword',
	async (data: ForgotPasswordRequest) => {
		return forgotPasswordApi(data);
	}
);

export const resetPassword = createAsyncThunk(
	'user/resetPassword',
	async (data: ResetPasswordRequest) => {
		return resetPasswordApi(data);
	}
);

export const fetchUser = createAsyncThunk<UserResponse>(
	'user/fetchUser',
	async () => {
		return getUserInfo();
	}
);

export const updateUser = createAsyncThunk(
	'user/updateUser',
	async (data: UpdateUserRequest) => {
		return updateUserInfo(data);
	}
);

export const logout = createAsyncThunk('user/logout', async () => {
	await logoutUser();
});
