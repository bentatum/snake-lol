<script>
  import { fade } from "svelte/transition";
  export let open = false;
  export let invisible = false;
</script>

<style>
  .backdrop {
    z-index: 5;
    position: fixed;
    display: flex;
    align-items: center;
    justify-content: center;
    right: 0;
    bottom: 0;
    top: 0;
    left: 0;
    background: var(--bg--backdrop);
    -webkit-tap-highlight-color: transparent;
    touch-action: none;
  }
  .invisible {
    background-color: transparent;
  }
</style>

{#if open}
  <div aria-hidden class="backdrop" class:invisible on:click transition:fade={{ duration: 200 }}>
    <slot />
  </div>
{/if}
