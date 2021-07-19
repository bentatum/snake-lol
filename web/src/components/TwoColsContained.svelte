<script lang="ts">
  import cx from "classnames";

  export let leftBgClass: string = "";
  export let rightBgClass: string = "";
</script>

<div
  class={cx({
    'relative grid grid-cols-2 h-full w-full': true,
    [$$props.class]: !!$$props.class,
  })}>
  <div
    class={cx({
      'col-span-2 lg:col-span-1 h-full w-full': true,
      [leftBgClass]: true,
    })} />
  <div
    class={cx({
      'col-span-2 lg:col-span-1 h-full w-full': true,
      [rightBgClass]: true,
    })} />
  <div class="absolute top-0 left-0 right-0 bottom-0 mx-auto container">
    <slot />
  </div>
</div>
