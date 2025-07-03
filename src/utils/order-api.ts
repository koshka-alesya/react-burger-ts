export const orderApiConfig = {
	baseUrl: 'https://norma.nomoreparties.space/api/orders',
	headers: {
		'Content-Type': 'application/json',
	},
};

export const addOrder = async (ingredientIds: string[]) => {
	const res = await fetch(orderApiConfig.baseUrl, {
		method: 'POST',
		headers: orderApiConfig.headers,
		body: JSON.stringify({ ingredients: ingredientIds }),
	});
	if (!res.ok) {
		throw new Error(`Ошибка ${res.status}`);
	}

	return res.json();
};
