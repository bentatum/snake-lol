<script>
  import Img from "../Img";
  export let size = "45px";
  export let src;
  export let alt;

  let className = "";
  export { className as class };
</script>

<Img {src} {alt} round height={size} width={size} class={className} />
