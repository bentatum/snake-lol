<script>
  import cx from "../lib/cx";
</script>

<style>
  :global(.suish-list-item-secondary-action) {
    position: absolute;
    right: var(--space);
  }
</style>

<div class={cx('-list-item-secondary-action')}>
  <slot />
</div>
