import { BASE_URL } from './endpoints';
import { refreshToken } from './session-api';

export const checkResponse = async (res: Response) => {
	if (!res.ok) {
		throw new Error(`Ошибка ${res.status}`);
	}
	return res.json();
};

export async function request(
	endpoint: string,
	init: RequestInit = {},
	withAuth: boolean = true
) {
	const headers = new Headers(init.headers || {});

	if (!headers.has('Content-Type') && init.body) {
		headers.set('Content-Type', 'application/json');
	}

	if (withAuth) {
		let accessToken = localStorage.getItem('accessToken');
		if (!accessToken) {
			const tokens = await refreshToken();
			accessToken = tokens.accessToken;
		}
		headers.set('Authorization', accessToken || '');
	}

	let response = await fetch(`${BASE_URL}${endpoint}`, {
		...init,
		headers,
	});

	if (withAuth && response.status === 401) {
		const tokens = await refreshToken();
		headers.set('Authorization', tokens.accessToken || '');

		response = await fetch(`${BASE_URL}${endpoint}`, {
			...init,
			headers,
		});
	}

	return checkResponse(response);
}
