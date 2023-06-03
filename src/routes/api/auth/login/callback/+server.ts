import { error, json, redirect, type RequestHandler } from '@sveltejs/kit';

// const client_id = (import.meta.env.VITE_SPOTIFY_CLIENT_ID as string) || '';
// const client_secret = (import.meta.env.VITE_SPOTIFY_CLIENT_SECRET as string) || '';

import {
	VITE_SPOTIFY_CLIENT_ID as client_id,
	VITE_SPOTIFY_CLIENT_SECRET as client_secret
} from '$env/static/private';
const redirect_uri = 'http://localhost:5173/api/auth/login/callback';

export const GET: RequestHandler = async ({ url }) => {
	const code = url.searchParams.get('code') || null;
	const state = url.searchParams.get('state') || null;
	if (code === null || state === null) {
		throw error(400, 'not valid request');
	}
	let res = await fetch(
		'https://accounts.spotify.com/api/token?' +
			new URLSearchParams({
				grant_type: 'authorization_code',
				code,
				redirect_uri: redirect_uri
			}).toString(),
		{
			method: 'POST',
			headers: {
				'Content-Type': 'application/x-www-form-urlencoded',
				Authorization: 'Basic ' + Buffer.from(client_id + ':' + client_secret).toString('base64')
			}
		}
	);
	let data = await res.json();

	throw redirect(302,"/?" + new URLSearchParams(data).toString());
	// return json(data);
};
