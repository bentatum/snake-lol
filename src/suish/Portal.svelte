<script>
  import { onMount, onDestroy } from "svelte";

  let ref;
  let portal;
  
  const browser = typeof window !== "undefined";

  onMount(() => {
    if (browser) {
      portal = window.document.createElement("div");
      portal.className = "portal";
      window.document.body.appendChild(portal);
      portal.appendChild(ref);
    }
  });

  onDestroy(() => {
    if (browser) {
      window.document.body.removeChild(portal);
    }
  });
</script>

<style>
  .portal-clone {
    display: none;
  }
</style>

<div class="portal-clone">
  <div bind:this={ref}>
    <slot />
  </div>
</div>
