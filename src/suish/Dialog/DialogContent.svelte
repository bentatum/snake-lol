<script>
  import cx from "../lib/cx";

  let className = "";
  export { className as class };
</script>

<div class={cx('px2 my1', className)}>
  <slot />
</div>
