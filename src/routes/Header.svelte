<script lang="ts">
	import { current_profile, type SpotifyProfile } from '../spotify/profile';
	import Player from './Player.svelte';
	import { spotify_token as spotify_tokens } from './store';

	let activeTab = 'home';

	let data: SpotifyProfile | null;
	current_profile.subscribe((a) => {
		data = a;
	});
	$: prof_pic = data?.images.at(0);
</script>

<nav>
	<ul>
		<li><a href="/">Home</a></li>
		<li><a href="/">Search</a></li>
		<li><a href="/">Your Library</a></li>
		{#if data}
			<li><a href="/" on:click={() => spotify_tokens.set(null)}>Logout</a></li>
		{:else}
			<li><a href="/login">Login</a></li>
		{/if}
	</ul>
	<div class="profile">
		{#if data}
			<div class="profile-card">
				{#if prof_pic}
					<img src={prof_pic} height="30" alt="profile" />
				{/if}
				<p>name: {data.username}</p>
			</div>
		{/if}
	</div>
</nav>

<style>
	.profile {
		margin-left: auto;
		display: flex;
	}
	.profile-card {
		background-color: white;
		color: black;
		padding: 5px;
		border-radius: 5px;
		display: flex;
		align-items: center;
	}
    .profile-card img {
        box-shadow: 0px 0px 10px black;;
        border-radius: 5px;
    }
	.profile-card p {
		margin: 5px;
	}
	nav {
		background-color: rgb(18, 18, 18);
		color: rgb(30, 215, 96);
		font-family: Arial, sans-serif;
		padding: 10px;
		/* justify-items: center; */
		align-items: center;
		display: flex;
	}

	ul {
		list-style-type: none;
		margin: 0;
		padding: 0;
		display: flex;
	}

	li {
		margin-right: 10px;
	}

	a {
		color: inherit;
		text-decoration: none;
		padding: 5px;
		border-radius: 3px;
		transition-duration: 200ms;
	}

	a:hover {
		background-color: rgb(30, 215, 96);
		color: #fff;
	}
</style>
