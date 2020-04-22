<script>
  import cx from "../lib/cx";
</script>

<style>
  :global(.suish-tabs) {
    padding: 0 calc(var(--space) * 2);
  }
</style>

<nav class={cx('-tabs')}>
  <slot />
</nav>
