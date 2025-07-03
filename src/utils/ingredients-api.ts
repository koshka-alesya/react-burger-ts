const API_INGREDIENTS_URL = 'https://norma.nomoreparties.space/api/ingredients';

export const fetchIngredients = async () => {
	const res = await fetch(API_INGREDIENTS_URL);
	if (!res.ok) {
		throw new Error(`Ошибка ${res.status}`);
	}
	return res.json();
};
