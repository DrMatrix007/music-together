export function fetchSpotify(url: string, token: string, method: 'GET' | 'POST') {
	return fetch(url, {
        method: method,
		headers: {
			Authorization: 'Bearer ' + token
		}
	});
}
