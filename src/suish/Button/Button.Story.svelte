<script>
  import Button from "./Button.svelte";
</script>

<div class="layout">
  <Button {...$$props} on:click style="margin-right: var(--space)">I'm a Button</Button>
  <Button {...$$props} href="/">I'm a Link</Button>
</div>
