import { derived, type Readable } from 'svelte/store';
import { spotify_token, type SpotifyTokens as UserTokens } from '../routes/store';
import { fetchSpotify } from './requests';

export type SpotifyProfile = {
	username: string;
	country: string;
	email: string;
	product: string;
	images: string[];
};

async function getProfile(token: string): Promise<SpotifyProfile | null> {
	const url = 'https://api.spotify.com/v1/me';

	const data = await fetchSpotify(url, token, 'GET');
	const json = await data.json();

	const { display_name, country, email, product, images } = json;
	if (display_name && country && email && product && images instanceof Array) {
		const ans = {
			username: display_name,
			country,
			email,
			product,
			images: images.map((a) => a?.url)
		};
        return ans;
	}

	return null;
}

export const current_profile = derived(spotify_token, (token, set) => {
	if (token) {
		getProfile(token.access_token).then((data) => set(data));
	}
	set(null);
	// return null;
}) satisfies Readable<SpotifyProfile | null>;
