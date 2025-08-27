export const BASE_URL = 'https://norma.nomoreparties.space/api';
export const BASE_WS_URL = 'wss://norma.nomoreparties.space';

export const API_ENDPOINTS = {
	LOGIN: '/auth/login',
	REGISTER: '/auth/register',
	LOGOUT: '/auth/logout',
	REFRESH_TOKEN: '/auth/token',
	FORGOT_PASSWORD: '/password-reset',
	RESET_PASSWORD: '/password-reset/reset',
	USER_INFO: '/auth/user',
	INGREDIENTS: '/ingredients',
	ORDERS: '/orders',
};

export const WS_URL_ALL = `${BASE_WS_URL}/orders/all`;
export const WS_URL_USER = `${BASE_WS_URL}/orders`;
