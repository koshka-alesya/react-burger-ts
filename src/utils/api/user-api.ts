import { UpdateUserRequest, UserResponse } from '../types';
import { checkResponse, fetchWithAuth } from './api-helper';

const API_BASE_URL = 'https://norma.nomoreparties.space/api';

export const USER_API_ENDPOINTS = {
	LOGIN: `${API_BASE_URL}/auth/login`,
	REGISTER: `${API_BASE_URL}/auth/register`,
	LOGOUT: `${API_BASE_URL}/auth/logout`,
	REFRESH_TOKEN: `${API_BASE_URL}/auth/token`,
	USER_INFO: `${API_BASE_URL}/auth/user`,
};

export async function getUserInfo(): Promise<UserResponse> {
	const response = await fetchWithAuth(USER_API_ENDPOINTS.USER_INFO, {
		method: 'GET',
		headers: {
			'Content-Type': 'application/json',
		},
	});

	return checkResponse(response);
}

export async function updateUserInfo(
	data: UpdateUserRequest
): Promise<UserResponse> {
	const response = await fetchWithAuth(USER_API_ENDPOINTS.USER_INFO, {
		method: 'PATCH',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify(data),
	});

	return checkResponse(response);
}
