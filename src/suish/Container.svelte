<script>
  import { cx } from "./lib";
  let className = "";
  export { className as class };
  export let maxWidth = "lg";
</script>

<style>
  .suish-container {
    --gutters: calc(var(--space) * 2);
    margin: 0 auto;
    padding-left: var(--gutters);
    padding-right: var(--gutters);
    max-width: var(--screen-lg);
    height: 100%;
    width: -webkit-fill-available;
  }

  .suish-container--max-width-xs {
    max-width: var(--screen-xs);
  }

  .suish-container--max-width-sm {
    max-width: var(--screen-sm);
  }

  .suish-container--max-width-md {
    max-width: var(--screen-md);
  }

  .suish-container--max-width-lg {
    max-width: var(--screen-lg);
  }

  .suish-container--max-width-xl {
    max-width: var(--screen-xl);
  }
</style>

<div
  class={cx('suish-container', className, maxWidth && `suish-container--max-width-${maxWidth}`)}>
  <slot />
</div>
