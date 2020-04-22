<script>
  import Box from "../Box.svelte";
  export let rounded = true;
  export let p = 0;
  export let pt = 0;
  export let pb = 0;
  export let px = 0;
  export let py = 0;
  export let m = 0;
  export let mt = 0;
  export let mb = 0;
  export let mx = 0;
  export let my = 0;
</script>

<Box bg="--sheet-bg" {rounded} {p} {pt} {pb} {px} {py} {m} {mt} {mb} {mx} {my}>
  <slot />
</Box>
