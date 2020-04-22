<script>
  import Portal from "./Portal.svelte";
  import Backdrop from "./Backdrop.svelte";
  import { createEventDispatcher } from "svelte";

  const dispatch = createEventDispatcher();

  export let open = false;
  export let BackdropProps = {};
  export let disableBackdropClick = false;

  function onBackdropClick(event) {
    if (event.detail.target !== event.detail.currentTarget) {
      return;
    }
    if (!disableBackdropClick) {
      dispatch("backdropClick", event);
    }
  }
</script>

<style>
  .modal {
    display: none;
    z-index: 2;
  }

  .open {
    display: block;
  }
</style>

<Portal>
  <Backdrop {open} {...BackdropProps} on:click={onBackdropClick} />
  <div role="presentation" class="modal" class:open>
    <slot />
  </div>
</Portal>
