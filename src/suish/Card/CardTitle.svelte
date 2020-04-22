<script>
  import cx from '../lib/cx'
</script>

<style>
  :global(.suish-card-title) {
    align-items: center;
    display: flex;
    flex-wrap: wrap;
    word-break: break-all;
  }
</style>

<h3 class={cx('-card-title')}>
  <slot />
</h3>
