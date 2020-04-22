import { action } from "@storybook/addon-actions";
import { withKnobs, select, boolean, text } from "@storybook/addon-knobs";
import Component from "./Button.Story.svelte";
import { linkTo } from '@storybook/addon-links'

export default {
  title: "Button",
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