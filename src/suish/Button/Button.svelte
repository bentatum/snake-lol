<script>
  import cx from "../lib/cx";
  import ButtonBase from "../ButtonBase.svelte";

  import { createEventDispatcher } from "svelte";
  const dispatch = createEventDispatcher();

  let className = "";
  export { className as class };
  export let style = "";

  export let raised = false;
  export let text = false;
  export let outlined = false;
  export let elevation = raised ? 1 : 0;
  export let href = "";
  // export let color = "default";
  export let fullWidth = false;
  export let type = "";
  export let disabled = false;
  export let primary = false;
  export let success = false;
  export let warning = false;
  export let error = false;

  let computedClassName = cx(className, "-button", {
    "-button--text": text,
    "-button--outlined": outlined,
    [`shadow--${elevation}`]: elevation > 0,
    "-button--full-width": fullWidth,
    "-button--color-primary": primary,
    "-button--color-success": success,
    "-button--color-warning": warning,
    "-button--color-error": error
  });
</script>

<style>
  :global(.suish-button) {
    --button--box-shadow: var(--shadow);
    --button--border-radius: var(--border-radius);
    --button--border-top-left-radius: var(--border-radius);
    --button--border-bottom-left-radius: var(--border-radius);
    --button--border-top-right-radius: var(--border-radius);
    --button--border-bottom-right-radius: var(--border-radius);
  }

  :global(.suish-button-base.suish-button) {
    padding: 10px 8px;
    -webkit-appearance: none;
    -webkit-tap-highlight-color: transparent;
    border: 0;
    outline: 0;
    text-transform: uppercase;
    cursor: pointer;
    transition: background-color 150ms ease-in-out;
    text-decoration: none;
    letter-spacing: 1px;
    line-height: 1;
    background-color: transparent;
    box-shadow: var(--button--box-shadow);
    border-radius: var(--button--border-radius);
    border-top-left-radius: var(--button--border-top-left-radius);
    border-bottom-left-radius: var(--button--border-bottom-left-radius);
    border-top-right-radius: var(--button--border-top-right-radius);
    border-bottom-right-radius: var(--button--border-bottom-right-radius);
  }

  /* Hover */
  :global(.suish-button-base.suish-button:hover) {
    background-color: var(--color--grey--alpha-1);
  }
  /* Active */
  :global(.suish-button-base.suish-button:active) {
    box-shadow: none;
  }

  /* Default Primary */
  :global(.suish-button-base.suish-button.suish-button--color-primary) {
    color: var(--color--primary);
  }
  :global(.suish-button-base.suish-button.suish-button--color-primary:hover) {
    background-color: var(--color--primary--darken-1);
  }

  /* Outlined */
  :global(.suish-button-base.suish-button.suish-button--outlined) {
    border: var(--border);
  }

  /* Default Variant */
  :global(.suish-button-base.suish-button) {
    background-color: var(--bg--alt);
    color: var(--color--text);
  }
  /* Default Variant -- Primary */
  :global(.suish-button-base.suish-button.suish-button--color-primary) {
    color: var(--color--primary--contrast);
    background-color: var(--color--primary);
  }
  /* Default Variant -- Success */
  :global(.suish-button-base.suish-button.suish-button--color-success) {
    color: var(--color--success--contrast);
    background-color: var(--color--success);
  }
  /* Default Variant -- Warning */
  :global(.suish-button-base.suish-button.suish-button--color-warning) {
    color: var(--color--warning--contrast);
    background-color: var(--color--warning);
  }
  /* Default Variant -- Error */
  :global(.suish-button-base.suish-button.suish-button--color-error) {
    color: var(--color--error--contrast);
    background-color: var(--color--error);
  }

  /* Text Variant */
  /* Primary */
  :global(.suish-button-base.suish-button.suish-button--text.suish-button--color-primary),
  :global(.suish-button-base.suish-button.suish-button--outlined.suish-button--color-primary) {
    color: var(--color--primary);
  }
  :global(.suish-button-base.suish-button.suish-button--text.suish-button--color-primary:hover),
  :global(.suish-button-base.suish-button.suish-button--outlined.suish-button--color-primary:hover) {
    background-color: var(--color--primary--alpha-4);
  }

  :global(.suish-button-base.suish-button.suish-button--variant-outlined) {
    border: var(--border);
  }

  :global(.suish-button-base.suish-button.suish-button--color-inherit) {
    color: inherit;
  }

  :global(.suish-button-base.suish-button.suish-button--full-width) {
    width: -webkit-fill-available;
  }

  @media (prefers-color-scheme: dark) {
    :global(.suish-button-base.suish-button) {
      color: var(--text-color);
    }
  }
</style>

<ButtonBase
  on:click
  on:hover
  class={computedClassName}
  {href}
  {type}
  {disabled}
  {style}
  tag={href.length ? 'a' : 'button'}>
  <slot />
</ButtonBase>
