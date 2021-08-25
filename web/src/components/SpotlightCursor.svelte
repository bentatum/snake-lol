<script lang="ts">
	import { tweened, spring } from 'svelte/motion';
	import * as easing from 'svelte/easing';
	// import { longpress } from '../lib/longpress.js';
	import { onMount } from 'svelte';
	let dotCoords = spring(
		{ x: 0, y: 0 },
		{
			stiffness: 1,
			damping: 1
		}
	);
	let outlineCoords = spring(
		{ x: 0, y: 0 },
		{
			stiffness: 0.03,
			damping: 0.5
		}
	);
	const OUTLINE_SIZE = 20;
	const DOT_SIZE = 2;

	let outlineSize = tweened(OUTLINE_SIZE, {
		duration: 1000,
		easing: easing.elasticInOut
	});
	let dotSize = tweened(DOT_SIZE, {
		duration: 200
	});
	let cursorVisible = false;
	function onMouseMove({ pageX: x, pageY: y }) {
		dotCoords.set({ x, y });
		outlineCoords.set({ x, y });
	}
	function onMouseOver({ pageX: x, pageY: y }) {
		cursorVisible = true;
		dotCoords.set({ x, y });
		outlineCoords.set({ x, y });
	}
	function onMouseOut({ pageX: x, pageY: y }) {
		dotCoords.set({ x, y });
		outlineCoords.set({ x, y });
		cursorVisible = false;
	}
	function onMouseDown() {
		dotSize.set($dotSize + 1);
		outlineSize.set($outlineSize * 1.5);
	}

	function onMouseUp() {
		dotSize.set(DOT_SIZE);
		outlineSize.set(OUTLINE_SIZE);
	}
	onMount(() => {
		const x = window.innerWidth / 2;
		const y = window.innerHeight / 2;
		dotCoords.set({ x, y });
		outlineCoords.set({ x, y });
	});
</script>

<svelte:body on:mousemove={onMouseMove} on:mouseover={onMouseOver} on:mouseout={onMouseOut} />

<svg class="w-full h-full absolute z-20 pointer-events-none">
	<circle
		class="opacity-10"
		cx={$outlineCoords.x}
		cy={$outlineCoords.y}
		r={$outlineSize > 0 ? $outlineSize : 0}
	/>
	<circle
		cx={$dotCoords.x}
		cy={$dotCoords.y}
		r={$dotSize > 0 ? $dotSize : 0}
		on:mousedown={onMouseDown}
		on:mouseup={onMouseUp}
	/>
</svg>

<style>
	:global(body),
	:global(a) {
		cursor: none !important;
	}
	circle {
		fill: black;
	}
	@media (prefers-color-scheme: dark) {
		circle {
			fill: white;
		}
	}
</style>
