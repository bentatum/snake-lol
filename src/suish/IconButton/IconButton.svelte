<script>
  import ButtonBase from "../ButtonBase.svelte";
  import cx from "../lib/cx";

  let className = "";
  export { className as class };
  export let href = "";
  export let target = "";
  export let primary = false;
  export let contained = false;
  export let edge = "" // "left" | "right"
  export let disabled = false
  export let fontSize = "md"
</script>

<style>
  :global(.suish-icon-button) {
    flex: 0 0 auto;
    padding: calc(var(--space) / 1.2);
    overflow: visible;
    text-align: center;
    transition: background-color 150ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
    border-radius: 50%;
    transition: background-color 100ms cubic-bezier(0.39, 0.575, 0.565, 1);
  }

  :global(.suish-icon-button:focus) {
    outline: none;
  }

  :global(.suish-icon-button:hover),
  :global(.suish-icon-button:focus) {
    background-color: var(--color--grey--alpha-4);
  }

  :global(.suish-icon-button.suish-icon-button--primary:hover),
  :global(.suish-icon-button.suish-icon-button--primary:focus) {
    background-color: var(--color--primary--alpha-4);
  }

  :global(.suish-icon-button--variant-contained) {
    background-color: var(--color--grey);
  }

  :global(.suish-icon-button--contained.suish-icon-button--primary) {
    background-color: var(--color--primary);
    color: var(--color--primary--contrast);
  }

  :global(.suish-icon-button--contained.suish-icon-button--primary:hover),
  :global(.suish-icon-button--contained.suish-icon-button--primary:focus) {
    background-color: var(--color--primary--darken-1);
    color: var(--color--primary--contrast);
  }

  :global(.suish-icon-button--edge-left) {
    margin-left: calc(var(--space) * -1.5);
  }
  :global(.suish-icon-button--edge-right) {
    margin-right: calc(var(--space) * -1.5);
  }

  /* Font Size */
  :global(.suish-icon-button--font-size--sm .suish-svg-icon) {
    font-size: 1.7rem;
  }
  :global(.suish-icon-button--font-size--md .suish-svg-icon) {
    font-size: 2.7rem;
  }
  :global(.suish-icon-button--font-size--lg .suish-svg-icon) {
    font-size: 3.4rem;
  }
</style>

<ButtonBase
  {href}
  {target}
  {disabled}
  class={cx('-icon-button', className, {
    '-icon-button--primary': !!primary,
    '-icon-button--contained': !!contained,
    '-icon-button--edge-right': edge === 'right',
    '-icon-button--edge-left': edge === 'left',
    [`-icon-button--font-size--${fontSize}`]: true
  })}
  on:click
  on:focusin
  on:focusout
  on:mouseenter
  on:mouseleave>
  <slot />
</ButtonBase>

<!-- {#if href.length}
  <a
    role="button"
    {href}
    {target}
    class="suish-icon-button suish-icon-button--variant-{variant} {className}"
    class:color-primary={color === 'primary'}
    on:click
    on:focusin
    on:focusout
    on:mouseenter
    on:mouseleave>
    <slot />
  </a>
{:else}
  <button
    class="suish-icon-button suish-icon-button--variant-{variant} {className}"
    class:color-primary={color === 'primary'}
    class:variant-text={variant === 'text'}
    on:click
    on:focusin
    on:focusout
    on:mouseenter
    on:mouseleave>
    <slot />
  </button>
{/if} -->
