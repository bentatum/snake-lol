<script>
  import cx from "../lib/cx";
</script>

<style>
  :global(.suish-dialog-actions > *:not(:last-child)) {
    margin-right: calc(var(--space) / 2);
  }
</style>

<div class={cx('-dialog-actions', 'flex row end p1')}>
  <slot />
</div>
