<script>
  import BarSpacer from './BarSpacer.svelte'
  import { cx } from "../lib";
  export let elevation = 0;
  export let absolute = false;
  export let fixed = false;
  export let color = null;
  export let bottom = false;
  export let disableSpacer = false;
  export let disableGutters = false;

  let className = "";
  export { className as class };

  let y;
  export let hideOnScroll = true;
  export let scrollThreshold = 200;

  let shouldHide = hideOnScroll ? y > scrollThreshold : false;
  $: {
    shouldHide = hideOnScroll ? y > scrollThreshold : false;
  }
</script>

<style>
  :root {
    --bar--height: 55px;
  }

  :global(.suish-bar) {
    display: flex;
    height: var(--bar--height);
    align-items: center;
    width: -webkit-fill-available;
    z-index: 5;
    background-color: var(--bg--alt);
  }

  :global(.suish-bar--gutters) {
    padding: 0 calc(var(--space) * 2);
  }

  :global(.suish-bar--absolute) {
    position: absolute;
  }

  :global(.suish-bar--fixed) {
    position: fixed;
  }
  :global(.suish-bar--bottom) {
    bottom: 0;
  }
</style>

<svelte:window bind:scrollY={y} />

{#if (fixed || absolute) && !disableSpacer}
  <BarSpacer />
{/if}

<div
  class={cx(className, '-bar', {
    '-bar--absolute': absolute,
    '-bar--fixed': fixed,
    '-bar--bottom': bottom,
    '-bar--gutters': !disableGutters,
    [`shadow--${elevation}`]: elevation > 0,
    [`bg--${color}`]: !!color,
  })}
  style={shouldHide ? 'transform: translate(0,var(--bar--height)px)' : ''}>
  <slot />
</div>
