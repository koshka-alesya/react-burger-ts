import {
	ILoginRequest,
	LoginResponse,
	ITokenRequest,
	RefreshTokenResponse,
	IRegisterRequest,
	RegisterResponse,
	IResetPasswordRequest,
	IForgotPasswordRequest,
	IBasicResponse,
} from '../types';
import { request } from './api-helper';
import { API_ENDPOINTS } from './endpoints';

export const loginUser = async (
	data: ILoginRequest
): Promise<LoginResponse> => {
	const result = await request(
		API_ENDPOINTS.LOGIN,
		{
			method: 'POST',
			body: JSON.stringify(data),
		},
		false
	);

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

	const payload: ITokenRequest = {
		token: refreshToken,
	};

	const result = await request(
		API_ENDPOINTS.LOGOUT,
		{
			method: 'POST',
			body: JSON.stringify(payload),
		},
		false
	);

	localStorage.setItem('accessToken', result.accessToken);
	localStorage.setItem('refreshToken', result.refreshToken);
};

export async function registerUser(
	data: IRegisterRequest
): Promise<RegisterResponse> {
	const result = await request(
		API_ENDPOINTS.REGISTER,
		{
			method: 'POST',
			body: JSON.stringify(data),
		},
		false
	);

	localStorage.setItem('accessToken', result.accessToken);
	localStorage.setItem('refreshToken', result.refreshToken);

	return result;
}

export const refreshToken = async (): Promise<RefreshTokenResponse> => {
	const refreshToken = localStorage.getItem('refreshToken');

	if (!refreshToken) {
		throw new Error('No refreshToken');
	}

	const result = await request(
		API_ENDPOINTS.REFRESH_TOKEN,
		{
			method: 'POST',
			body: JSON.stringify({ token: refreshToken }),
		},
		false
	);

	localStorage.setItem('accessToken', result.accessToken);
	localStorage.setItem('refreshToken', result.refreshToken);

	return result;
};

export const resetPassword = async (
	data: IResetPasswordRequest
): Promise<IBasicResponse> => {
	return request(
		API_ENDPOINTS.RESET_PASSWORD,
		{
			method: 'POST',
			body: JSON.stringify(data),
		},
		false
	);
};

export const forgotPassword = async (
	data: IForgotPasswordRequest
): Promise<IBasicResponse> => {
	return request(
		API_ENDPOINTS.FORGOT_PASSWORD,
		{
			method: 'POST',
			body: JSON.stringify(data),
		},
		false
	);
};
