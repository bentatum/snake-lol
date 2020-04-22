<script>
  export let disablePadding = false;
</script>

<style>
  ul {
    margin: 0;
    padding: 0;
    list-style-type: none;
    position: relative;
  }

  .padding {
    padding-top: 8px;
    padding-bottom: 8px;
  }
</style>

<ul class:padding={disablePadding != true}>
  <slot />
</ul>
