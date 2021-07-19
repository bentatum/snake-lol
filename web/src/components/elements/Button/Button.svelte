<script lang="ts">
  import ButtonBase from "../ButtonBase";
  import cx from "classnames";

  // type Variant = "text" | "contained" | "outlined";
  // export let variant: Variant = "contained";

  type Size = "small" | "medium" | "large";
  export let size: Size = "medium";

  type Color = "black" | "gray" | "primary" | "secondary";
  export let color: Color = "gray";

  const getBgColorClass = () => {
    switch (color) {
      case "primary":
        return "primary-500";
      case "secondary":
        return "secondary-500";
      case "gray":
        return "gray-300";
      default:
        return color;
    }
  };

  const getTextColorClass = () => {
    switch (color) {
      case "primary":
        return "primary-500";
      case "secondary":
        return "secondary-500";
      case "gray":
        return "gray-700";
      case "black":
        return "white";
      default:
        return color;
    }
  };

  const getTextSizeClass = () => {
    switch (size) {
      case "small":
        return "sm";
      case "large":
        return "lg";
      case "medium":
      default:
        return "base";
    }
  };

  $: className = cx({
    [`bg-${getBgColorClass()}`]: true,
    [`text-${getTextColorClass()}`]: true,
    [`text-${getTextSizeClass()}`]: true,
    "rounded text-base leading-none font-sans": true,
    "px-2 h-7": size === "small",
    "px-4 h-12": size === "medium",
    "px-5 h-14": size === "large",
    [$$props.class]: !!$$props.class,
  });
</script>

<ButtonBase {...$$props} on:click class={className}>
  <slot />
</ButtonBase>
