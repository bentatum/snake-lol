<script lang="ts">
	export let viewBox: string = '0 0 24 24';
</script>

<svg {viewBox} {...$$props}>
	<slot />
</svg>

<style>
	svg {
		fill: currentColor;
		width: 1em;
		height: 1em;
		display: inline-block;
		flex-shrink: 0;
		user-select: none;
	}
</style>
