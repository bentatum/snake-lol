<script context="module">
  export const FORM = {};
</script>

<script>
  import cx from "../lib/cx";
  import { setContext, createEventDispatcher, onMount } from "svelte";
  import { writable } from "svelte/store";

  let className = "";
  export { className as class };

  const dispatch = createEventDispatcher();
  const values = writable({});
  const errors = writable({});
  const touched = writable({});
  const isSubmitting = writable(false);

  let isValid;
  let form;
  let fields;

  export let initialValues = {};
  const initialValuesStore = writable(initialValues);

  $: {
    initialValuesStore.set(initialValues);
  }

  initialValuesStore.subscribe(initValues => {
    resetForm(initValues);
  });

  function resetForm(data = $initialValuesStore) {
    const nextValues = {};
    if (fields) {
      fields.forEach(({ path, multiple }) => {
        nextValues[path] = data && data[path] ? data[path] : multiple ? [] : "";
      });
    }
    values.set(nextValues)
    touched.set({})
    errors.set({})
    isValid = undefined;
  }

  export let schema = null;
  export let validateOnChange = true;
  export let validateOnBlur = true;

  onMount(() => {
    fields = Array.from(form.querySelectorAll("input,textarea,select"))
      .filter(el => !!el.name)
      .map(el => ({
        path: el.name
      }))
      .reduce((allElements, currentElement) => {
        const isCurrentElement = el => el.path === currentElement.path;
        const multiple = !!allElements.find(isCurrentElement);

        return [
          ...allElements.filter(el => !isCurrentElement(el)),
          { ...currentElement, multiple }
        ];
      }, []);

    resetForm();
  });

  setContext(FORM, {
    touchField,
    setValue,
    getValue,
    validate,
    values,
    errors,
    touched,
    isSubmitting,
    validateOnBlur,
    validateOnChange
  });

  async function validate() {
    if (!schema) {
      isValid = true;
      return;
    }
    try {
      await schema.validate($values, {
        abortEarly: false
      });
      errors.set({});
      isValid = true;
    } catch (err) {
      errors.set({});
      const errs = {};
      err.inner.forEach(error => {
        errs[error.path] = error.message;
      });
      errors.set(errs);
      isValid = false;
    }
  }

  function touchField(name, shouldValidate = false) {
    if (validateOnBlur || shouldValidate) {
      touched.set({ ...$touched, [name]: true });
      validate();
    }
  }

  function setValue(name, value) {
    touched.set({ ...$touched, [name]: true });
    values.set({ ...$values, [name]: value });

    if (validateOnChange) {
      validate();
    }
  }

  function getValue(name) {
    return $values ? $values[name] : undefined;
  }

  function handleResetClick() {
    resetForm();
    dispatch("reset");
  }

  async function onSubmit() {
    // touch all fields
    const touchAll = {};
    fields.forEach(({ path }) => {
      touchAll[path] = true;
    });
    touched.set(touchAll);
    // then validate.
    await validate();
    if (!schema || isValid) {
      isSubmitting.set(true);
      dispatch("submit", {
        values: $values,
        setSubmitting: value => {
          isSubmitting.set(value);
        },
        resetForm,
        setError(name, error) {
          errors.set({
            ...$errors,
            [name]: error
          })
        }
      });
    }
  }
</script>

<form
  on:submit|preventDefault={onSubmit}
  on:reset={handleResetClick}
  class={cx('-form', className)}
  bind:this={form}>
  <slot
    {isValid}
    {setValue}
    {getValue}
    {touchField}
    {validate}
    values={$values}
    errors={$errors}
    touched={$touched}
    isSubmitting={$isSubmitting} />
</form>
