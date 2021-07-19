<script lang="ts">
  import { onMount } from "svelte";
  import { writable } from "svelte/store";
  import CircularProgress from "../CircularProgress";

  const size = writable<{ height: number; width: number }>({
    height: undefined,
    width: undefined,
  });
  export let loading = false;

  let el;

  onMount(() => {
    size.set({
      height: el.offsetHeight,
      width: el.offsetWidth,
    });
  });

  let style!: string;
  $: {
    style =
      $size.height && $size.width
        ? `min-height:${$size.height}px;min-width:${$size.width}px;`
        : "";
  }
</script>

<style>
  .label {
    width: inherit;
    user-select: none;
  }
</style>

<span
  bind:this={el}
  class="z-10 inline-flex items-center justify-center label"
  {style}>
  {#if !loading}
    <slot />
  {:else}
    <CircularProgress />
  {/if}
</span>
