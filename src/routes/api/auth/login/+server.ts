import { json, redirect, type RequestHandler } from '@sveltejs/kit';

const redirect_uri = 'http://localhost:5173/api/auth/login/callback';
import { VITE_SPOTIFY_CLIENT_ID as client_id } from '$env/static/private';

function generateRandomString(length: number) {
	let result = ' ';
	const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
	const charactersLength = characters.length;
	for (let i = 0; i < length; i++) {
		result += characters.charAt(Math.floor(Math.random() * charactersLength));
	}

	return result;
}

export const GET: RequestHandler = ({ request }) => {
	var state = generateRandomString(16);
	var scope =
		'user-read-private user-read-email streaming user-read-playback-state user-modify-playback-state user-read-currently-playing';

	// request.redirect;
	throw redirect(
		302,
		(
			'https://accounts.spotify.com/authorize?' +
			new URLSearchParams({
				response_type: 'code',
				client_id: client_id,
				scope: scope,
				redirect_uri: redirect_uri,
				state: state
			})
		).toString()
	);
};
