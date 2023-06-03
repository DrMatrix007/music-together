<script lang="ts">
	import {
		subscribePlayer,
		type Player,
		type PlayState,
		subscribePlayState
	} from '../spotify/player';
	import SpotifyTrack from './SpotifyTrack.svelte';

	let player: Player | null;

	subscribePlayer((a) => {
		player = a;
	});

	let state: PlayState | null;

	subscribePlayState((a) => {
		state = a;
	});
</script>

<div class="player">
	{#if state?.track}
        <SpotifyTrack data={state?.track}/>
		<div class="bar">
			<div class="bar-buttons">
				<button
					on:click={async () => {
						await player?.toggle();
					}}>previous</button
				>
				{#if state.paused}
					<button
						on:click={async () => {
							await player?.resume();
						}}>resume</button
					>
				{:else}
					<button
						on:click={async () => {
							await player?.pause();
						}}>pause</button
					>
				{/if}

				<button
					on:click={async () => {
						await player?.nextTrack();
					}}>next</button
				>
			</div>
		</div>
	{:else}
		Not playing
	{/if}
</div>

<style>
	.bar {
		flex-grow: 1;
	}
	.bar-buttons {
        margin:10px;
		display: flex;
		flex-direction: row;
		flex-grow: 1;
		justify-content: center;
	}
	.bar-buttons > * {
		margin-left: 10px;
		margin-right: 10px;
	}
	.player {
		display: flex;
		background-color: black;
	}

</style>
