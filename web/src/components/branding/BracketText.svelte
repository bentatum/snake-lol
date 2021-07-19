<script lang="ts">
  type Variant = "static" | "hover";

  export let variant: Variant = "static";
</script>

<style>
  div {
    position: relative;
    padding: 0.5em 1.5em;
  }

  .hover:hover:before,
  .hover:hover:after {
    display: block;
  }

  .static:before,
  .static:after {
    display: block;
  }

  div:before,
  div:after {
    display: none;
    color: #66ff66;
    position: absolute;
    top: 0;
    line-height: 1;
    font-size: 3em;
    font-weight: 100;
  }

  div:before {
    content: "[";
    left: 0;
    top: 0.05em;
  }
  div:after {
    content: "]";
    right: 0;
    top: 0.05em;
  }
</style>

<div class="leading-8 {variant} {$$props.class}">
  <slot />
</div>
