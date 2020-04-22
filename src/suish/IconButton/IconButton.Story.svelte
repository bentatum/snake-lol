<script>
  import IconButton from "./IconButton.svelte";
  import MelodyNestIcon from '../../components/MelodyNestIcon.svelte'
</script>

<div class="layout">
  <IconButton {...$$props} on:click style="margin-right: var(--space)">
    <MelodyNestIcon />
  </IconButton>
  <IconButton {...$$props} href="/">
    <MelodyNestIcon />
  </IconButton>
</div>
