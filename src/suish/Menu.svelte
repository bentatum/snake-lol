<script>
  import Popover from "./Popover.svelte";
  import List from "./List";

  export let anchorEl;
  export let open;
  export let anchorOrigin;
</script>

<Popover {open} on:close {anchorEl} {anchorOrigin}>
  <List>
    <slot />
  </List>
</Popover>
