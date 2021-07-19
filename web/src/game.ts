import { getContext, onMount } from "svelte";
import { writable, derived } from "svelte/store";

export const width = writable(350);
export const height = writable(350);
export const pixelRatio = writable(
  (process as any).browser ? window.devicePixelRatio : 0
);
export const context = writable(null);
export const canvas = writable(null);
export const time = writable(0);
export const score = writable(0);

export const props = deriveObject({
  context,
  canvas,
  width,
  height,
  pixelRatio,
  time,
});

export const key = Symbol();

export const getState = () => {
  const api = getContext(key);
  // @ts-ignore
  return api.getState();
};

export const renderable = (render) => {
  const api = getContext(key);
  const element = {
    ready: false,
    mounted: false,
  };
  // @ts-ignore
  if (typeof render === "function") element.render = render;
  else if (render) {
    // @ts-ignore
    if (render.render) element.render = render.render;
    // @ts-ignore
    if (render.setup) element.setup = render.setup;
  }
  // @ts-ignore
  api.add(element);
  onMount(() => {
    element.mounted = true;
    return () => {
      // @ts-ignore
      api.remove(element);
      element.mounted = false;
    };
  });
};

function deriveObject(obj) {
  const keys = Object.keys(obj);
  const list = keys.map((key) => {
    return obj[key];
  });
  // @ts-ignore
  return derived(list, (array) => {
    return array.reduce((dict, value, i) => {
      dict[keys[i]] = value;
      return dict;
    }, {});
  });
}
