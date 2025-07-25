import { refreshToken } from './session-api';

export const checkResponse = async (res: Response) => {
	if (!res.ok) {
		throw new Error(`Ошибка ${res.status}`);
	}
	return res.json();
};

export async function fetchWithAuth(
	input: RequestInfo,
	init: RequestInit = {}
) {
	let accessToken = localStorage.getItem('accessToken');

	if (!accessToken) {
		const tokens = await refreshToken();
		accessToken = tokens.accessToken;
	}

	const authHeaders = {
		...init.headers,
		Authorization: accessToken || '',
	};

	let response = await fetch(input, {
		...init,
		headers: authHeaders,
	});

	if (response.status === 401) {
		const tokens = await refreshToken();
		const retryHeaders = {
			...init.headers,
			Authorization: tokens.accessToken,
		};
		response = await fetch(input, {
			...init,
			headers: retryHeaders,
		});
	}

	return response;
}
