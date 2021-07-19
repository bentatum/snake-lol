<script lang="ts">
  export let viewBox: string = "0 0 24 24";
</script>

<style>
  svg {
    fill: currentColor;
    width: 1em;
    height: 1em;
    display: inline-block;
    /* font-size: 2.3rem; */
    /* transition: fill 200ms cubic-bezier(0.4, 0, 0.2, 1) 0ms; */
    flex-shrink: 0;
    user-select: none;
  }
</style>

<svg {viewBox} {...$$props}>
  <slot />
</svg>
