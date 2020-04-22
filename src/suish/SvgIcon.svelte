<script>
  import { cx, subscribe } from "./lib";

  let className = "";
  export { className as class };
  export let viewBox;
  export let fill = "";
  export let listen = undefined;
  export let tabindex = "-1";
</script>

<style>
  :root {
    --svg-icon--font-size: 2rem;
  }

  :global(.suish-svg-icon) {
    --font-size: var(--svg-icon--font-size)
  }

  :global(.suish-svg-icon) {
    user-select: none;
    height: 1em;
    width: 1em;
    display: inline-block;
    fill: currentColor;
    flex-shrink: 0;
    outline: none;
    font-size: var(--font-size);
  }
</style>

<svg
  {viewBox}
  {fill}
  {tabindex}
  class={cx('-svg-icon', className)}
  on:focus
  on:blur
  on:keypress
  on:click
  use:subscribe={listen}>
  <slot />
</svg>
