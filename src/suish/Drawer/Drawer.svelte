<script>
  import Modal from "../Modal.svelte";
  import { createEventDispatcher } from "svelte";
  import cx from "../lib/cx";
  import { tweened } from "svelte/motion";
  import * as easing from "svelte/easing";
  import { slide } from "svelte/transition";

  export let open = false;
  export let anchor = "left";

  let className = "";
  export { className as class };

  const dispatch = createEventDispatcher();
</script>

<style>
  :global(.suish-drawer) {
    overflow-y: auto;
    display: flex;
    flex-direction: column;
    height: 100%;
    flex: 1 0 auto;
    z-index: 100;
    -webkit-overflow-scrolling: touch;
    position: fixed;
    top: 0;
    outline: 0;
  }

  :global(.suish-drawer--anchor-left) {
    left: 0;
    right: auto;
  }

  :global(.suish-drawer--anchor-right) {
    left: auto;
    right: 0;
  }

  :global(.suish-drawer--anchor-top) {
    top: 0;
    left: 0;
    bottom: auto;
    right: 0;
    height: auto;
    max-height: 100%;
  }

  :global(.suish-drawer--anchor-bottom) {
    top: auto;
    left: 0;
    bottom: 0;
    right: 0;
    height: auto;
    max-height: 100%;
  }
</style>

<Modal {open} on:backdropClick={e => dispatch('close', e)}>
  {#if open}
    <div
      transition:slide={{ duration: 250 }}
      class={cx(className, '-drawer', `-drawer--anchor-${anchor}`, 'bg--main', 'shadow--10')}>
      <slot />
    </div>
  {/if}
</Modal>
