import { onMount } from 'svelte';
import { writable, type Writable } from 'svelte/store';
import type { SpotifyTokens } from '../routes/store';

function onSpotifyWebSdkReady(f: () => Promise<void> | void) {
	onMount(() => {
		if (!(window as any).Spotify) {
			const script = document.createElement('script');
			script.id = 'spotify_data';
			script.src = 'https://sdk.scdn.co/spotify-player.js';
			script.async = true;

			document.body.appendChild(script);

			(window as any).onSpotifyWebPlaybackSDKReady = f;
		}
	});
}

export class Player {
	private ctx: AudioContext;

	constructor(private player: any, private id: string) {
		this.player = player;
		this.ctx = new AudioContext({});
	}
	resume(): Promise<void> {
		return this.player.resume();
	}
	pause(): Promise<void> {
		return this.player.pause();
	}
	disconnect(): void {
		return this.player.disconnect();
	}
	nextTrack(): Promise<any> {
		return this.player.nextTrack();
	}
	activateElement(): Promise<void> {
		return this.player.activateElement();
	}
	async toggle(): Promise<void> {
		// return this.pla/yer.play();
	}
	async playOnThis(token: string): Promise<void> {
		let data = [
			'https://api.spotify.com/v1/me/player',
			{
				method: 'PUT',
				headers: {
					Authorization: 'Bearer ' + token,
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({
					device_ids: [this.id],
					play: true
				})
			}
		] as [string, any];
		await fetch(data[0], data[1]);
	}
	async playTrack(data:SpotifyTrackData) {
		// await fetch()
	}
}

export type SpotifyTrackData = {
	uri: string;
	id: string | null;
	type: string;
	media_type: string;
	name: string;
	is_playable: boolean;
	album: {
		uri: string;
		name: string;
		images: { url: string }[];
	};
	artists: { uri: string; name: string }[];
};

export type PlayState = {
	active: boolean;
	paused: boolean;
	track: SpotifyTrackData | null;
	next: SpotifyTrackData[];
};

const spotifyPlayState = writable<PlayState>({
	active: false,
	paused: false,
	track: null,
	next: []
});
const spotifyPlayer = writable<Player | null>();

export function loadPlayerOnReady(state: Writable<SpotifyTokens | null>) {
	if (state) {
		onSpotifyWebSdkReady(() => {
			state.subscribe(async (data) => {
				if (data) {
					const player = new (window as any).Spotify.Player({
						name: 'Web Playback SDK',
						getOAuthToken: (cb: (_: string) => void) => {
							cb(data.access_token);
						},
						volume: 0.5
					});
					player.addListener('initialization_error', ({ message }: any) => {
						console.error(message);
					});

					player.addListener('authentication_error', ({ message }: any) => {
						console.error(message);
					});

					player.addListener('account_error', ({ message }: any) => {
						console.error(message);
					});

					player.addListener('player_state_changed', (data: any) => {
						spotifyPlayState.set({
							active: data ? true : false,
							paused: data?.paused || false,
							track: data?.track_window?.current_track,
							next: data?.track_window?.next_tracks || []
						});
					});
					await player.setName('Music Together');
					await player.connect();
					let wait = new Promise<string>((resolve) => {
						player.addListener('ready', ({ device_id }: any) => {
							resolve(device_id);
						});
					});

					let id = await wait;

					let ctx = await new AudioContext().resume();

					spotifyPlayer.set(new Player(player, id));
				}
			});
		});
	}
}

export const subscribePlayer = spotifyPlayer.subscribe;
export const subscribePlayState = spotifyPlayState.subscribe;
