<script lang="ts">
	import { onDestroy, onMount } from 'svelte';
	import { spotify_token, type SpotifyTokens } from './store';
	import {
		Player as SpotifyPlayer,
		loadPlayerOnReady,
		subscribePlayState,
		subscribePlayer,
		type PlayState
	} from '../spotify/player';
	import Player from './Player.svelte';
	let token: SpotifyTokens | null;
	const unsub = spotify_token.subscribe((data) => {
		token = data;
	});
	let player: SpotifyPlayer | null = null;

	let state: PlayState;

	const unsubPlayer = subscribePlayer(async (p) => {
		player = p;
	});

	const unsubPlayState = subscribePlayState(async (p) => {
		state = p;
	});

	loadPlayerOnReady(spotify_token);

	function loadPlayer() {
		let params = new URLSearchParams(window.location.search);

		let access_token = params.get('access_token');
		let refresh_token = params.get('refresh_token');

		if (access_token && refresh_token) {
			if(player) {
				player.disconnect();
			}
			spotify_token.set({
				access_token,
				refresh_token
			});
		}
	}

	onDestroy(() => {
		if (player) {
			player.disconnect();
		}
	});

	onMount(() => {
		loadPlayer();

		// window.history.replaceState({}, document.title, '/');
	});
	// $: loadPlayer();
</script>

<!-- <h1>Welcome to Music together</h1> -->
{#if token}

	<p>logged in</p>
	{#if player !== null}

		<div>
			<button
				on:click={async () => {
					if(!player){
						console.log(player);
					}
					await player?.playOnThis(token?.access_token || '');
				}}>play on this</button
			>
		</div>
	{/if}
{:else}
	<a href="login">Login</a>
{/if}
