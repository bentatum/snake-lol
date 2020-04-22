<script>
  import Box from "../Box.svelte";
  import cx from "../lib/cx";

  let className = "";
  export { className as class };

  export let href = "";
  export let style = ""
</script>

<style>
  :global(.suish-card) {
    --width: 300px;
    --background-color: var(--bg--alt);
    --spacing: calc(var(--space) * 1.25);
  }

  :global(.suish-card) {
    max-width: 100%;
    width: var(--width);
    overflow: hidden;
    position: relative;
    background-color: var(--bg--alt);
    height: 100%;
    display: block;
  }

  :global(.suish-card-title, .suish-card-subtitle, .suish-card-text) {
    padding: var(--spacing);
  }

  :global(.suish-card-title + .suish-card-subtitle) {
    margin-top: calc(var(--spacing) * -1);
  }

  :global(.suish-card-title + .suish-card-subtitle, .suish-card-title
      + .suish-card-text) {
    padding-top: 0;
  }
</style>

{#if href}
  <a class={cx('-card', className)} {href} {style}>
    <slot />
  </a>
{:else}
  <div class={cx('-card', className)} on:click {style}>
    <slot />
  </div>
{/if}
