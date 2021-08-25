<script lang="ts">
	import createRipple from '../lib/ripple';
	import cx from 'classnames';

	type Component = 'a' | 'button' | 'div';

	export let as: Component = 'button';
	export let disableRipple: boolean = false;
	export let href: string = null;
	export let size: 'small' | 'medium' = 'medium';

	$: className = cx({
		'p-1': size === 'small',
		'p-2': size === 'medium',
		'inline-flex items-center relative overflow-hidden rounded-full': true,
		'hover:bg-black hover:bg-opacity-10': true,
		'focus:outline-none focus:ring ring-inset ring-black ring-opacity-20': true,
		[$$props.class]: true
	});

	type Color = 'primary' | 'default';
	export let color: Color = 'default';
	export let colorMap: Record<Color, string> = {
		default: 'gray',
		primary: 'primary'
	};

	$: ripple = createRipple(colorMap[color], {
		disabled: disableRipple,
		centered: true
	});
</script>

{#if href || as === 'a'}
	<a {...$$props} use:ripple on:click {href} role="button" class={className}>
		<slot />
	</a>
{:else if as === 'div'}
	<div {...$$props} use:ripple on:click role="button" class={className}>
		<slot />
	</div>
{:else}
	<button {...$$props} use:ripple on:click class={className}>
		<slot />
	</button>
{/if}
