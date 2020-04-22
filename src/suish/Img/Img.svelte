<script>
  const SLOTS = $$props.$$slots;

  import { cx } from "../lib";
  import Box from "../Box.svelte";

  let className = "";
  export { className as class };

  export let m = 0;
  export let mb = 0;
  export let size = "";
  export let height = size;
  export let width = size;
  export let src;
  export let alt;
  export let round = false;
  export let rounded = false;
  export let elevation = 0;
  export let position = "center center";
  export let contain = false;
  export let blur = "";
  export let blurValue = "6px";
  export let opacity = null;
</script>

<style>
  :global(.suish-img) {
    height: 100%;
    width: 100%;
    position: relative;
    overflow: hidden;
    flex: 1 0 auto;
    max-width: 100%;
    display: flex;
  }

  :global(.suish-img__img) {
    height: 100%;
    width: 100%;
    position: absolute;
  }

  :global(.suish-img__img--contain) {
    background-size: contain;
  }

  :global(.suish-img__img--cover) {
    background-size: cover;
  }

  :global(.suish-img__slot) {
    z-index: 1;
    position: relative;
    overflow: hidden;
    flex: 1 0 auto;
    max-width: 100%;
    display: flex;
    flex-direction: column;
  }
</style>

<Box
  {round}
  {rounded}
  {height}
  {width}
  class={cx(className, '-img', elevation > 0 && `shadow--${elevation}`)}
  {m}
  {mb}
  on:click>
  <div
    class={cx('-img__img', contain && '-img__img--contain', !contain && '-img__img--cover')}
    aria-label={alt}
    role={alt ? 'img' : undefined}
    style={`${opacity ? `opacity: ${opacity};` : ''} background-image:url(${src}); background-position:${position}; ${blur ? `filter: blur(${blurValue}); transform: scale(1.25);` : ''}`} />
  {#if SLOTS && SLOTS.default}
    <div class={cx('-img__slot')}>
      <slot />
    </div>
  {/if}
</Box>
