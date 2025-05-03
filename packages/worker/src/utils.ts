export const getTokenFromCookie = (cookie: string) => {
	const cookies = cookie.split(';').map((cookie) => cookie.trim());
	const token = cookies.find((cookie) => cookie.startsWith('bili_jct='));
	if (token) {
		return token.split('=')[1];
	}
};
