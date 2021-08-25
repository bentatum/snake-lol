<script lang="ts">
  import InputBase from "../InputBase";

  export let name;
</script>

<InputBase {name} let:inputClass {...$$props}>
  <input {name} {...$$props} class={inputClass} />
</InputBase>
