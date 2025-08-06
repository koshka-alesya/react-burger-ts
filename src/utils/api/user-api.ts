import { UpdateUserRequest, UserResponse } from '../types';
import { request } from './api-helper';
import { API_ENDPOINTS } from './endpoints';

export async function getUserInfo(): Promise<UserResponse> {
	return request(API_ENDPOINTS.USER_INFO, {
		method: 'GET',
	});
}

export async function updateUserInfo(
	data: UpdateUserRequest
): Promise<UserResponse> {
	return request(API_ENDPOINTS.USER_INFO, {
		method: 'PATCH',
		body: JSON.stringify(data),
	});
}
