import { checkResponse, fetchWithAuth } from './api-helper';

export const orderApiConfig = {
	baseUrl: 'https://norma.nomoreparties.space/api/orders',
	headers: {
		'Content-Type': 'application/json',
	},
};

export const addOrder = async (ingredientIds: string[]) => {
	const res = await fetchWithAuth(orderApiConfig.baseUrl, {
		method: 'POST',
		headers: orderApiConfig.headers,
		body: JSON.stringify({ ingredients: ingredientIds }),
	});
	return checkResponse(res);
};
