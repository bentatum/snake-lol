<script>
  import { cx } from "./lib";

  let className = "";
  export { className as class };
  export let style = "";
  export let height = "";
  export let width = "";

  export let border = false;

  export let p = 0;
  export let px = 0;
  export let py = 0;
  export let pt = 0;
  export let pb = 0;
  export let pl = 0;
  export let pr = 0;

  export let m = 0;
  export let mx = 0;
  export let my = 0;
  export let mt = 0;
  export let mb = 0;
  export let ml = 0;
  export let mr = 0;

  export let bg = "";

  export let textAlign = "left";
  export let round = false;
  export let rounded = false;

  let computedStyle = "";
  $: computedStyle = `
    ${height ? `height: ${height};` : ""}
    ${width ? `width: ${width}` : ""}
    ${bg ? `background-color: var(--color--${bg});` : ""}
    ${style}
  `
    .replace(/\s\s+/g, " ")
    .trim();

  let computedClass = "";
  $: computedClass = cx(
    "suish-box",
    p && `p${p}`,
    pt && `pt${pt}`,
    pb && `pb${pb}`,
    pr && `pr${pr}`,
    pl && `pl${pl}`,
    px && `px${px}`,
    py && `py${py}`,
    m && `m${m}`,
    mt && `mt${mt}`,
    mb && `mb${mb}`,
    mr && `mr${mr}`,
    ml && `ml${ml}`,
    mx && `mx${mx}`,
    my && `my${my}`,
    round && "round",
    rounded && "rounded",
    `text-${textAlign}`,
    className,
    border && "border"
  );
</script>

<div class={computedClass} style={computedStyle} on:click>
  <slot />
</div>
