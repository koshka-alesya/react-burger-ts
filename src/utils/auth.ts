export function getAccessToken(): string | null {
	const rawToken = localStorage.getItem('accessToken');
	if (!rawToken) return null;

	return rawToken.startsWith('Bearer ') ? rawToken.slice(7) : rawToken;
}

export function getRawAccessToken(): string | null {
	return localStorage.getItem('accessToken');
}

export function clearAccessToken(): void {
	localStorage.removeItem('accessToken');
}
