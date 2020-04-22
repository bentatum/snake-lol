<script>
  import { cx } from "../lib";
  export let color = "default";
  let className = "";
  export { className as class }
</script>

<style>
  i {
    width: 1em;
    height: 1em;
    overflow: hidden;
    font-size: 2rem;
    flex-shrink: 0;
    user-select: none;
  }

  .suish-icon--color-primary {
    color: var(--color--primary);
  }
</style>

<i class={cx(className, 'material-icons', 'suish-icon', `suish-icon--color-${color}`)}>
  <slot />
</i>
