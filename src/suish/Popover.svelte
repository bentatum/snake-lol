<script>
  import Sheet from "./Sheet";
  import Box from "./Box.svelte";
  import Modal from "./Modal.svelte";
  import ownerWindow from "./lib/ownerWindow";
  import ownerDocument from "./lib/ownerDocument";
  import { tick, createEventDispatcher } from "svelte";
  import cx from "./lib/cx";

  const dispatch = createEventDispatcher();

  export let open = false;
  export let anchorEl;
  let getContentAnchorEl; // todo
  export let anchorOrigin = {
    vertical: "top",
    horizontal: "left"
  };
  export let marginThreshold = 16;

  /*
   * This determines which anchor prop to refer to to set
   * the position of the popover.
   * "anchorEl" | "anchorPosition" | "none"
   */
  export let anchorReference = "anchorEl";

  function getTransformOriginValue({ horizontal, vertical }) {
    return [horizontal, vertical]
      .map(n => (typeof n === "number" ? `${n}px` : n))
      .join(" ");
  }

  export function getOffsetTop(rect, vertical) {
    let offset = 0;

    if (typeof vertical === "number") {
      offset = vertical;
    } else if (vertical === "center") {
      offset = rect.height / 2;
    } else if (vertical === "bottom") {
      offset = rect.height;
    }

    return offset;
  }

  export function getOffsetLeft(rect, horizontal) {
    let offset = 0;

    if (typeof horizontal === "number") {
      offset = horizontal;
    } else if (horizontal === "center") {
      offset = rect.width / 2;
    } else if (horizontal === "right") {
      offset = rect.width;
    }

    return offset;
  }

  let top;
  let left;
  let transformOrigin = {
    horizontal: 0,
    vertical: 0
  };
  let sheet;

  // Return the base transform origin using the element
  // and taking the content anchor offset into account if in use
  function getTransformOrigin(elemRect, contentAnchorOffset = 0) {
    return {
      vertical:
        getOffsetTop(elemRect, transformOrigin.vertical) + contentAnchorOffset,
      horizontal: getOffsetLeft(elemRect, transformOrigin.horizontal)
    };
  }

  function getContentAnchorOffset(element) {
    let contentAnchorOffset = 0;

    if (getContentAnchorEl && anchorReference === "anchorEl") {
      const contentAnchorEl = getContentAnchorEl(element);

      if (contentAnchorEl && element.contains(contentAnchorEl)) {
        const scrollTop = getScrollParent(el, contentAnchorEl);
        contentAnchorOffset =
          contentAnchorEl.offsetTop +
            contentAnchorEl.clientHeight / 2 -
            scrollTop || 0;
      }

      // != the default value
      if (process.env.NODE_ENV !== "production") {
        if (anchorOrigin.vertical !== "top") {
          console.error(
            [
              "SUISH: you can not change the default `anchorOrigin.vertical` value ",
              "when also providing the `getContentAnchorEl` prop to the popover component.",
              "Only use one of the two props.",
              "Set `getContentAnchorEl` to `null | undefined`" +
                " or leave `anchorOrigin.vertical` unchanged."
            ].join("\n")
          );
        }
      }
    }

    return contentAnchorOffset;
  }

  function getAnchorEl(anchorEl) {
    return typeof anchorEl === "function" ? anchorEl() : anchorEl;
  }

  function getAnchorOffset(contentAnchorOffset) {
    if (anchorReference === "anchorPosition") {
      if (process.env.NODE_ENV !== "production") {
        if (!anchorPosition) {
          console.error(
            "SUISH: you need to provide a `anchorPosition` prop when using " +
              '<Popover anchorReference="anchorPosition" />.'
          );
        }
      }
      return anchorPosition;
    }

    const resolvedAnchorEl = getAnchorEl(anchorEl);
    const containerWindow = ownerWindow(resolvedAnchorEl);

    // If an anchor element wasn't provided, just use the parent body element of this Popover
    const anchorElement =
      resolvedAnchorEl instanceof containerWindow.Element
        ? resolvedAnchorEl
        : ownerDocument(sheet).body;
    const anchorRect = anchorElement.getBoundingClientRect();

    if (process.env.NODE_ENV !== "production") {
      const box = anchorElement.getBoundingClientRect();

      if (
        process.env.NODE_ENV !== "test" &&
        box.top === 0 &&
        box.left === 0 &&
        box.right === 0 &&
        box.bottom === 0
      ) {
        console.warn(
          [
            "Material-UI: the `anchorEl` prop provided to the component is invalid.",
            "The anchor element should be part of the document layout.",
            "Make sure the element is present in the document or that it's not display none."
          ].join("\n")
        );
      }
    }

    const anchorVertical =
      contentAnchorOffset === 0 ? anchorOrigin.vertical : "center";

    return {
      top: anchorRect.top + getOffsetTop(anchorRect, anchorVertical),
      left: anchorRect.left + getOffsetLeft(anchorRect, anchorOrigin.horizontal)
    };
  }

  function getPositioningStyle(element) {
    // Check if the parent has requested anchoring on an inner content node
    const contentAnchorOffset = getContentAnchorOffset(element);
    const elemRect = {
      width: element.offsetWidth,
      height: element.offsetHeight
    };

    // Get the transform origin point on the element itself
    const elemTransformOrigin = getTransformOrigin(
      elemRect,
      contentAnchorOffset
    );

    if (anchorReference === "none") {
      return {
        top: null,
        left: null,
        transformOrigin: getTransformOriginValue(elemTransformOrigin)
      };
    }

    // Get the offset of of the anchoring element
    const anchorOffset = getAnchorOffset(contentAnchorOffset);

    // Calculate element positioning
    let top = anchorOffset.top - elemTransformOrigin.vertical;
    let left = anchorOffset.left - elemTransformOrigin.horizontal;
    const bottom = top + elemRect.height;
    const right = left + elemRect.width;

    // Use the parent window of the anchorEl if provided
    const containerWindow = ownerWindow(getAnchorEl(anchorEl));

    // Window thresholds taking required margin into account
    const heightThreshold = containerWindow.innerHeight - marginThreshold;
    const widthThreshold = containerWindow.innerWidth - marginThreshold;

    // Check if the vertical axis needs shifting
    if (top < marginThreshold) {
      const diff = top - marginThreshold;
      top -= diff;
      elemTransformOrigin.vertical += diff;
    } else if (bottom > heightThreshold) {
      const diff = bottom - heightThreshold;
      top -= diff;
      elemTransformOrigin.vertical += diff;
    }

    // Check if the horizontal axis needs shifting
    if (left < marginThreshold) {
      const diff = left - marginThreshold;
      left -= diff;
      elemTransformOrigin.horizontal += diff;
    } else if (right > widthThreshold) {
      const diff = right - widthThreshold;
      left -= diff;
      elemTransformOrigin.horizontal += diff;
    }

    return {
      top: `${Math.round(top)}px`,
      left: `${Math.round(left)}px`,
      transformOrigin: getTransformOriginValue(elemTransformOrigin)
    };
  }

  async function setPositioningStyles() {
    await tick();

    if (!sheet) {
      return;
    }

    const positioning = getPositioningStyle(sheet);

    if (positioning.top !== null) {
      sheet.style.top = positioning.top;
    }
    if (positioning.left !== null) {
      sheet.style.left = positioning.left;
    }
    sheet.style.transformOrigin = positioning.transformOrigin;
  }

  $: if (open) {
    setPositioningStyles();
  }

  function onResize() {
    if (open) {
      setPositioningStyles();
    }
  }
</script>

<style>
  .suish-popover {
    position: absolute;
    min-width: 16px;
    max-width: calc(100% - 32px);
    z-index: 1000;
  }

  :global(.suish-popover__sheet) {
    overflow-y: auto;
    overflow-x: hidden;
    min-height: 16px;
    max-height: calc(100% - 32px);
    outline: 0;
  }
</style>

<svelte:window on:resize={onResize} />

<Modal
  {open}
  BackdropProps={{ invisible: true }}
  on:backdropClick={event => dispatch('close', event)}>
  <div bind:this={sheet} class={cx('-popover')}>
    <Sheet elevation="2" class={cx('-popover__sheet')}>
      <slot />
    </Sheet>
  </div>
</Modal>
