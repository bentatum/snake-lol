<script lang="ts">
  import createRipple from "../../../utils/ripple";
  import cx from "classnames";

  type Component = "a" | "button" | "div";

  export let component: Component = "button";

  export let disableRipple: boolean = false;

  export let href: string = null;

  $: className = cx({
    "inline-flex items-center relative overflow-hidden p-4 rounded-full": true,
    "hover:bg-gray-400 hover:bg-opacity-10": true,
    "focus:outline-none focus:ring ring-inset ring-blue-500 ring-opacity-20": true,
    [$$props.class]: true,
  });

  type Color = "primary" | "default";
  export let color: Color = "default";
  export let colorMap: Record<Color, string> = {
    default: "gray",
    primary: "primary",
  };

  $: ripple = createRipple(colorMap[color], {
    disabled: disableRipple,
    centered: true,
  });
</script>

{#if href || component === 'a'}
  <a use:ripple on:click {href} role="button" class={className}>
    <slot />
  </a>
{:else if component === 'div'}
  <div use:ripple on:click role="button" class={className}>
    <slot />
  </div>
{:else}
  <button use:ripple on:click class={className}>
    <slot />
  </button>
{/if}
