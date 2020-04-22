<script>
  import { createEventDispatcher } from "svelte";
  const dispatch = createEventDispatcher();
  import { writable } from "svelte/store";

  const SLOTS = $$props.$$slots;
  let isSelect = SLOTS && SLOTS.default;

  let className = "";
  export { className as class };

  import { cx } from "../lib";
  import Box from "../Box.svelte";

  import { getContext } from "svelte";
  import { FORM } from "../Form";

  export let name;
  export let multiline = false;
  export let type = "text";
  export let label = "";
  export let placeholder = "";
  export let id = "";
  export let helperText = "";
  export let value = "";
  export let error = false;
  export let style = "";
  export let showErrorMessage = true;

  const { touchField, setValue, values, errors, touched } = getContext(FORM);

  function onInput({ target }) {
    let value = target.value;
    if (type === "number") value = +target.value;
    if (type === "checkbox") value = target.checked;
    setValue(name, value);
  }

  function onBlur() {
    touchField(name);
  }

  let showLabel;
  let errorMsg;
  let computedValue;

  $: {
    computedValue = ($values && $values[name]) || value;
    showLabel = !computedValue && label;
    errorMsg = $touched && $touched[name] && $errors && $errors[name];
    error = !!errorMsg;
  }

  const rootClass = cx(
    "suish-input",
    error && "suish-input--error",
    multiline && "suish-input--multiline",
    className
  );
</script>

<style>
  :root {
    --input--font-size: 1.4rem;
    --input--padding: 0 var(--space);
    --input--border-radius: var(--border-radius);
    --input--border-top-left-radius: var(--border-radius);
    --input--border-bottom-left-radius: var(--border-radius);
    --input--border-top-right-radius: var(--border-radius);
    --input--border-bottom-right-radius: var(--border-radius);
    --input--box-shadow: var(--shadow);
    --input--label--margin: 0 0 0 var(--space);
  }

  input,
  select,
  textarea {
    flex: 1 1 auto;
    max-width: -webkit-fill-available;
    min-width: 0px;
    width: 100%;
    font-size: var(--input--font-size);
    outline: none;
    border: none;
    font-weight: var(--font-weight-medium);
    background-color: transparent;
    color: var(--text-color);
  }

  input {
    padding: var(--input--padding);
  }

  textarea {
    padding: calc(var(--input--textarea--padding), var(--input--padding));
  }

  input,
  select {
    line-height: 2.5rem;
    height: 40px;
  }

  select {
    padding: calc(
      var(--input--select--padding),
      0 calc(var(--input--padding) - 4px)
    );
  }

  label {
    font-size: var(--input--font-size);
    position: absolute;
    font-weight: var(--font-weight-medium);
    cursor: text;
    color: var(--color--grey--contrast);
    pointer-events: none;
    margin: var(--input--label--margin);
  }

  :global(.suish-input--error) {
    color: var(--color--error--lighten-2);
  }
  :global(.suish-input--error .suish-input__input-label-container) {
    background-color: var(--color--error--lighten-2);
  }
  :global(.suish-input--error label, .suish-input--error
      input, .suish-input--error textarea) {
    color: var(--color--white);
  }

  :global(.suish-input__input-label-container) {
    cursor: text;
    display: flex;
    align-items: center;
    position: relative;
    overflow: hidden;
    background-color: var(--bg--alt);
    box-shadow: var(--input--box-shadow);
    border-radius: var(--input--border-radius);
    border-top-left-radius: var(--input--border-top-left-radius);
    border-bottom-left-radius: var(--input--border-bottom-left-radius);
    border-top-right-radius: var(--input--border-top-right-radius);
    border-bottom-right-radius: var(--input--border-bottom-right-radius);
  }

  :global(.suish-input--multiline .suish-input__input-label-container) {
    align-items: flex-start;
  }
  :global(.suish-input--multiline label) {
    margin-top: 9px;
  }

  :global(.suish-input--select) {
    cursor: pointer;
  }

  :global(.suish-input--select .suish-input__input-label-container) {
    height: 40px;
  }
</style>

<div
  class={cx('-input', className, {
    '-input--error': error,
    '-input--multiline': multiline,
    '-input--select': isSelect
  })}>
  <div class={cx('-input__input-label-container')} {style}>
    {#if showLabel}
      <label for={name}>{label}</label>
    {/if}
    {#if isSelect}
      <select {name} value={computedValue} on:input={onInput}>
        {#if showLabel}
          <option selected disabled />
        {/if}
        <slot />
      </select>
    {:else if multiline}
      <textarea
        {name}
        id={id || name}
        on:input={onInput}
        placeholder={showLabel ? '' : placeholder}>{computedValue}</textarea>
      <!--
        Warning: formatting breaks this! It should never have spaces.
        If you auto-format this document, the line above must look like this: `>{computedValue}</textarea`
        https://github.com/UnwrittenFun/prettier-plugin-svelte/issues/59
      -->
    {:else}
      <input
        {type}
        {name}
        value={computedValue}
        placeholder={showLabel ? '' : placeholder}
        id={id || name}
        on:input={onInput} />
    {/if}
  </div>
  {#if helperText || (showErrorMessage && errorMsg)}
    <p class="body2 mt1">{helperText || errorMsg}</p>
  {/if}
</div>
