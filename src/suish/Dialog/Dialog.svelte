<script>
  import Modal from "../Modal.svelte";
  import cx from "../lib/cx";
  import { createEventDispatcher } from "svelte";
  import DialogTitle from "./DialogTitle.svelte";
  import IconButton from "../IconButton";
  import CloseIcon from "../internal/CloseIcon.svelte";

  const dispatch = createEventDispatcher();

  let className = "";
  export { className as class };

  export let open;
  export let title = "";
  export let maxWidth = "";
  export let fullWidth = false;
  export let fullScreen = false;
  export let hideCloseButton = false;

  function dispatchClose() {
    dispatch("close");
  }
</script>

<style>
  .root {
    position: fixed;
    top: 0;
    z-index: 5;
    pointer-events: none;
  }

  .paper {
    pointer-events: all;
    z-index: 6;
  }

  .full-screen {
    height: 100%;
    width: 100%;
  }

  .max-width-xs {
    max-width: var(--screen-xs);
  }

  .max-width-sm {
    max-width: var(--screen-sm);
  }

  .max-width-md {
    max-width: var(--screen-md);
  }

  .max-width-lg {
    max-width: var(--screen-lg);
  }

  .max-width-xl {
    max-width: var(--screen-xl);
  }

  .full-width {
    width: 100%;
  }
</style>

<Modal {open} on:backdropClick={dispatchClose}>
  <div
    class="root vh100 vw100 flex align-items--center justify-content--center">
    <div
      class={cx('paper scroll-y shadow--10 bg--main', className, {
        m2: !fullScreen,
        rounded: !fullScreen,
        'full-width': fullWidth,
        [`max-width-${maxWidth}`]: !!maxWidth,
        'full-screen': fullScreen
      })}>
      {#if title}
        <header class="flex row">
          <DialogTitle>{title}</DialogTitle>
          {#if !hideCloseButton}
            <div style="flex:1" />
            <div class="flex center">
              <IconButton on:click={dispatchClose} class="mx1">
                <CloseIcon />
              </IconButton>
            </div>
          {/if}
        </header>
      {/if}
      <slot />
    </div>
  </div>
</Modal>
