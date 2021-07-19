<script lang="ts">
  import cx from "classnames";
  import { focusRing } from "../utils/focusRing";

  export let name;
  export let label = "";
  export let gutterBottom = false;
  export let fullWidth = false;
  export let disabled = false;

  let inputClass;
  $: inputClass = cx({
    [focusRing]: true,
    "font-normal text-gray-700 h-9 font-mono leading-none block border rounded pl-2 py-2 text-sm": true,
    "placeholder-gray-400": true,
    [$$props.class]: Boolean($$props.class),
    "w-full": fullWidth,
    "mb-3": gutterBottom,
    "bg-gray-50": disabled,
  });
</script>

<div class="text-left">
  {#if label}
    <label class="font-mono text-sm font-medium" for={name}>{label}</label>
  {/if}
  <slot {inputClass} />
</div>
