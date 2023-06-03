<script lang="ts">
	import type { SpotifyTrackData } from '../spotify/player';

	export let data: SpotifyTrackData;
	$: artists = data.artists.map((a) => a.name).join(', ');
</script>

<div class="container" on:click on:keydown>
	{#if data.album.images[0]}
		<img src={data.album.images[0].url} alt="album" width="70px" height="70px" />
	{/if}

	<div class="track-data">
		<p class="name">{data.name}</p>
		<p class="album">{data.album.name}</p>
		<p class="artist">{artists}</p>
	</div>
</div>

<style>
    .container {
        display: flex;
        margin:10px;
        color: black;
        padding: 5px;
        border-radius: 5px;
        background-color:rgb(30, 215, 96);
    }
	.track-data {
		margin: 1px 10px 1px 10px;
		display: flex;
		flex-direction: column;
		justify-content: space-between;
	}
	.track-data > p {
		margin: 0;
		padding: 0;
	}
	.album {
		color: rgb(58, 58, 58);
	}
	.artist {
		color: grey;
	}
    img {
        box-shadow: 0 0 10px black;
        border-radius: 10px;
    }
</style>
