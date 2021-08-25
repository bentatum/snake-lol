<script lang="ts">
	import IconButton from './IconButton.svelte';
	import FlaskIcon from './icons/FlaskIcon.svelte';
	import FyeAfIcon from './icons/FyeAFIcon.svelte';
	import GithubIcon from './icons/GithubIcon.svelte';
	import ResamplIcon from './icons/ResamplIcon.svelte';
	import TwitterIcon from './icons/TwitterIcon.svelte';
</script>

<nav class="select-none">
	<IconButton href="https://twitter.com/benjtatum" target="_blank">
		<TwitterIcon />
	</IconButton>
	<IconButton href="https://github.com/bentatum" target="_blank">
		<GithubIcon />
	</IconButton>
	<IconButton href="https://fye.af" target="_blank">
		<FyeAfIcon />
	</IconButton>
	<IconButton href="https://resampl.com" target="_blank">
		<ResamplIcon />
	</IconButton>
	<IconButton href="https://yieldxscience.com" target="_blank">
		<FlaskIcon />
	</IconButton>
</nav>
