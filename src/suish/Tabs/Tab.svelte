<script>
  import ButtonBase from "../ButtonBase.svelte";
  import cx from '../lib/cx'
  export let href;
</script>

<style>
:global(.suish-tab) {
    padding: 0 calc(var(--space) * 2);
}
</style>

<ButtonBase {href} class={cx('-tab')}>
  <slot />
</ButtonBase>
