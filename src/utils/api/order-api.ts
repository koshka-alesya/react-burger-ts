import { request } from './api-helper';
import { API_ENDPOINTS } from './endpoints';

export const addOrder = async (ingredientIds: string[]) => {
	return request(API_ENDPOINTS.ORDERS, {
		method: 'POST',
		body: JSON.stringify({ ingredients: ingredientIds }),
	});
};
