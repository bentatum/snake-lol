<script>
  let className = "";
  export { className as class };
  export let style = "";
  export let href = "";
  export let tag = "";
  export let type = "button";
  export let disabled = false;
  export let target = "";
  export let id = "";
</script>

<style>
  :global(.suish-button-base) {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    position: relative;
    font-size: 1.4rem;
    background-color: transparent;
    -webkit-appearance: none;
    -webkit-tap-highlight-color: transparent;
    border: 0;
    outline: 0;
    border-radius: 0;
    margin: 0;
    padding: 0;
    cursor: pointer;
    transition: background-color 150ms ease-in-out;
    text-decoration: none;
    letter-spacing: 1px;
    /* font-family: var(--sans); */
    user-select: none;
    vertical-align: middle;
    -moz-appearance: none;
    -webkit-appearance: none;
    color: inherit;
  }
  :global(.suish-button-base::-moz-focus-inner) {
    border-style: none;
  }

  :global(.suish-button-base:disabled) {
    pointer-events: none;
    cursor: default;
    opacity: 0.9;
  }

  a:hover,
  a:visited,
  a:active {
    color: inherit;
  }
</style>

{#if href.length || tag === 'a'}
  <a
    {style}
    {id}
    {href}
    {target}
    aria-disabled={disabled}
    role="button"
    on:click
    on:hover
    class="suish-button-base {className}">
    <slot />
  </a>
{:else if tag === 'li'}
  <li
    {style}
    {id}
    aria-disabled={disabled}
    role="button"
    on:click
    on:hover
    class="suish-button-base {className}">
    <slot />
  </li>
{:else}
  <button
    {id}
    {type}
    {disabled}
    {style}
    on:click
    on:hover
    class="suish-button-base {className}">
    <slot />
  </button>
{/if}
