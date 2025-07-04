export const checkResponse = async (res: Response) => {
	if (!res.ok) {
		throw new Error(`Ошибка ${res.status}`);
	}
	return res.json();
};
