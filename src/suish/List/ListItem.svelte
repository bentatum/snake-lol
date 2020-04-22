<script>
  import cx from "../lib/cx";
  import ButtonBase from "../ButtonBase.svelte";

  let className = "";
  export { className as class };

  export let tag = "li";
  export let href = "";
  export let button = false;
  export let selected = false;
  export let disabled = false;
  export let disableGutters = false;

  const computedClass = cx(
    className,
    "-list-item",
    selected && "-list-item--selected",
    button && "-list-item--button",
    !disableGutters && "-list-item--gutters"
  );
</script>

<style>
  :root {
    --list-item--hover-bg: rgba(0, 0, 0, 0.1);
  }

  @media (prefers-color-scheme: dark) {
    :root {
      --list-item--hover-bg: rgba(255, 255, 255, 0.1);
    }
  }

  :global(.suish-list-item) {
    --hover-bg: var(--list-item--hover-bg);
  }

  :global(.suish-list-item) {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    position: relative;
    text-decoration: none;
    width: 100%;
    box-sizing: border-box;
    text-align: left;
    padding-top: var(--space);
    padding-bottom: var(--space);
    font-weight: var(--font-weight-regular);
  }
  :global(.suish-list-item:hover),
  :global(.suish-list-item:focus),
  :global(.suish-list-item:focus-visible, .suish-list-item--selected) {
    background-color: var(--hover-bg);
  }

  :global(.suish-list-item:disabled) {
    opacity: 0.5;
  }
  :global(.suish-list-item--gutters) {
    padding-left: 16px;
    padding-right: 16px;
  }
  :global(.suish-list-item--button:hover) {
    background-color: var(--color--grey-a1);
  }
</style>

{#if button || tag}
  <ButtonBase {tag} {href} on:click class={computedClass}>
    <slot />
  </ButtonBase>
{:else}
  <li on:click {disabled} class={computedClass}>
    <slot />
  </li>
{/if}
