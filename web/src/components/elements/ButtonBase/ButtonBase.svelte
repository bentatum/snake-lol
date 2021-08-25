<script lang="ts">
	import createRipple from '../../../lib/ripple';
	import cx from 'classnames';
	import focusRing from '../utils/focusRing';
	import Children from './Label.svelte';

	type Component = 'a' | 'button' | 'div';

	export let component: Component = 'button';

	export let href: string = null;

	export let disableRipple: boolean = false;

	type Color = 'primary' | 'secondary' | 'gray';
	export let color: Color = 'gray';

	export let loading = false;

	$: className = cx({
		[focusRing]: true,
		[`relative overflow-hidden text-center inline-flex items-center justify-center`]: true,
		[$$props.class]: Boolean($$props.class)
	});

	$: ripple = createRipple(color, { disabled: disableRipple });
</script>

{#if href || component === 'a'}
	<a on:click use:ripple {href} class={className} role="button">
		<Children {loading}>
			<slot />
		</Children>
	</a>
{:else if component === 'div'}
	<div on:click use:ripple class={className} role="button">
		<Children {loading}>
			<slot />
		</Children>
	</div>
{:else}
	<button on:click use:ripple class={className}>
		<Children {loading}>
			<slot />
		</Children>
	</button>
{/if}
