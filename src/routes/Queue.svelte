<script lang="ts">
	import { subscribePlayState, type SpotifyTrackData, Player, subscribePlayer } from '../spotify/player';
	import SpotifyTrack from './SpotifyTrack.svelte';

	let datas: SpotifyTrackData[] = [];

	subscribePlayState((a) => {
		datas = a.next;
	});

	let player: Player | null = null;

    subscribePlayer(a=>{
        player = a;
    })
</script>

<div class="queue">
	<h3>Queue</h3>
	{#each datas as data, i}
		<SpotifyTrack {data} on:click={() => {
            if(player) {
                player.playTrack(data);
            }
        }} />
	{/each}
</div>

<style>
	.queue {
		width: 20rem;
		height: 100%;
	}
</style>
