<script lang="ts">
	import Header from './Header.svelte';
	import Player from './Player.svelte';
	import Queue from './Queue.svelte';
</script>

<div class="container">
	<Header />
	<div class="sub-container">

		<main>
			<slot />
		</main>
		<Queue/>
	</div>
	<div class="player">
		<Player />
	</div>
</div>

<style>
	.sub-container {
		display: flex;
		flex-direction: row;
		flex-grow: 1;
	}
	.container,
	:global(body),
	:global(html) {
		margin: 0;
		color: white;
		background-color: rgb(24, 24, 24);
		width: 100%;
		height: 100%;
	}
	.container {
		display: flex;
		flex-direction: column;
	}
	main {
		flex: 1;
		display: flex;
		flex-direction: column;
		padding: 1rem;
		width: 100%;
		max-width: 64rem;
		margin: 0 auto;
	}
</style>
