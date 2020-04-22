<script>
  import cx from "../lib/cx";
</script>

<style>
:global(.suish-card-actions) {
    display: flex;
    justify-content: flex-end;
    padding: 0 6px 6px;
}
</style>

<div class={cx('-card-actions')}>
  <slot />
</div>
