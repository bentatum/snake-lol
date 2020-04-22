<script>
  import cx from "../lib/cx";
  export let gutterBottom;
  export let variant;
</script>

<p class={cx('-card-text', { 'gutter-bottom': gutterBottom }, variant)}>
  <slot />
</p>
