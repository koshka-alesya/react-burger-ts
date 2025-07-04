import { checkResponse } from './api-helper';

const API_INGREDIENTS_URL = 'https://norma.nomoreparties.space/api/ingredients';

export const fetchIngredients = async () => {
	const res = await fetch(API_INGREDIENTS_URL);
	return checkResponse(res);
};
