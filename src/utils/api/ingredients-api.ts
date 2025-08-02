import { request } from './api-helper';
import { API_ENDPOINTS } from './endpoints';

export const fetchIngredients = async () => {
	return request(API_ENDPOINTS.INGREDIENTS, { method: 'GET' }, false);
};
