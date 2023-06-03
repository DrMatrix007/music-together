import { writable } from 'svelte/store';

export type SpotifyTokens = {
	access_token: string;
	refresh_token: string;
};

export const spotify_token = writable<SpotifyTokens | null>(null);
