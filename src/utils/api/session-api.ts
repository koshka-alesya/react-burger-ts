import {
	LoginRequest,
	LoginResponse,
	LogoutRequest,
	RefreshTokenResponse,
	RegisterRequest,
	RegisterResponse,
	ResetPasswordRequest,
	ResetPasswordResponse,
	ForgotPasswordRequest,
	ForgotPasswordResponse,
} from '../types';
import { checkResponse } from './api-helper';

const API_BASE_URL = 'https://norma.nomoreparties.space/api';

export const USER_API_ENDPOINTS = {
	LOGIN: `${API_BASE_URL}/auth/login`,
	REGISTER: `${API_BASE_URL}/auth/register`,
	LOGOUT: `${API_BASE_URL}/auth/logout`,
	REFRESH_TOKEN: `${API_BASE_URL}/auth/token`,
	FORGOT_PASSWORD: `${API_BASE_URL}/password-reset`,
	RESET_PASSWORD: `${API_BASE_URL}/password-reset/reset`,
};

export const loginUser = async (data: LoginRequest): Promise<LoginResponse> => {
	const response = await fetch(USER_API_ENDPOINTS.LOGIN, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify(data),
	});

	const result: LoginResponse = await checkResponse(response);

	localStorage.setItem('accessToken', result.accessToken);
	localStorage.setItem('refreshToken', result.refreshToken);

	return result;
};

export const logoutUser = async (): Promise<void> => {
	const refreshToken = localStorage.getItem('refreshToken');

	if (!refreshToken) {
		console.warn('No refreshToken');
		return;
	}

	const payload: LogoutRequest = {
		token: refreshToken,
	};

	const response = await fetch(USER_API_ENDPOINTS.LOGOUT, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify(payload),
	});

	const result: LoginResponse = await checkResponse(response);

	localStorage.setItem('accessToken', result.accessToken);
	localStorage.setItem('refreshToken', result.refreshToken);
};

export async function registerUser(
	data: RegisterRequest
): Promise<RegisterResponse> {
	const response = await fetch(USER_API_ENDPOINTS.REGISTER, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify(data),
	});

	const result: RegisterResponse = await checkResponse(response);

	localStorage.setItem('accessToken', result.accessToken);
	localStorage.setItem('refreshToken', result.refreshToken);

	return result;
}

export const refreshToken = async (): Promise<RefreshTokenResponse> => {
	const refreshToken = localStorage.getItem('refreshToken');

	if (!refreshToken) {
		throw new Error('No refreshToken');
	}

	const response = await fetch(USER_API_ENDPOINTS.REFRESH_TOKEN, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify({ token: refreshToken }),
	});

	const result: RefreshTokenResponse = await checkResponse(response);

	localStorage.setItem('accessToken', result.accessToken);
	localStorage.setItem('refreshToken', result.refreshToken);

	return result;
};

export const resetPassword = async (
	data: ResetPasswordRequest
): Promise<ResetPasswordResponse> => {
	const response = await fetch(USER_API_ENDPOINTS.RESET_PASSWORD, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify(data),
	});

	const result: ResetPasswordResponse = await checkResponse(response);
	return result;
};

export const forgotPassword = async (
	data: ForgotPasswordRequest
): Promise<ForgotPasswordResponse> => {
	const response = await fetch(USER_API_ENDPOINTS.FORGOT_PASSWORD, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify(data),
	});

	const result: ForgotPasswordResponse = await checkResponse(response);
	return result;
};
