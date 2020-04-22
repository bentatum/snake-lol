<script>
  import { ListItem } from "./List";
  export let tag;
  export let href;
</script>

<style>
:global(.s-menu-item) {
  display: flex;
  padding-top: 6px;
  padding-bottom: 6px;
  font-weight: var(--font-weight-regular);
}
:global(.s-menu-item:hover) {
  background-color: var(--color--grey-a1);
}
</style>

<ListItem button class="s-menu-item" {tag} {href} on:click>
  <slot />
</ListItem>
