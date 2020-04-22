<script>
  import cx from "../lib/cx";

  let className = "";
  export { className as class };
</script>

<h2 class={cx('px2 my1', className)}>
  <slot />
</h2>
