import { action } from "@storybook/addon-actions";
import { withKnobs, select, boolean, text } from "@storybook/addon-knobs";
import Component from "./IconButton.Story.svelte";

export default {
  title: "IconButton",
  decorators: [withKnobs]
};

export const Demo = () => ({
  Component,
  props: {
    slot: "Hello",
    variant: select("variant", ["text", "contained", "outlined"])
  },
  on: { click: action("clicked") }
});