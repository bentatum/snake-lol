<script lang="ts">
  import { renderable, height, width, score } from "../game";
  import { writable } from "svelte/store";
  import { createEventDispatcher } from "svelte";
  // import { swipe, Hammer } from "svelte-hammer";
  // const { swipe, Hammer } = hammer; // todo -- this should work -- import { swipe } from "svelte-hammer";

  // const hammertime = new Hammer(window);
  // console.log(hammertime);

  // hammertime.get("swipe").set({ direction: Hammer.DIRECTION_VERTICAL });

  const dispatch = createEventDispatcher();
  let started = false;

  // game world
  export let speed = 7;
  let tileSize = 10;
  let gridSizeX = Math.floor($width / tileSize); // 20 x 20 = 400
  let gridSizeY = Math.floor($height / tileSize);
  let nextY = 0;
  let nextX = 0;

  // snake
  let defaultTailSize = 2;
  // let tailSize = defaultTailSize;
  let snakeTrail = [];
  let snakeY = 10;
  let snakeX = (snakeY = 10);

  // apple
  let appleY = 15;
  let appleX = 15;

  function draw(context) {
    gridSizeX = Math.floor($width / tileSize);
    gridSizeY = Math.floor($height / tileSize);

    snakeX += nextX;
    snakeY += nextY;

    // snake over game world?
    if (snakeX < 0) {
      snakeX = gridSizeX - 1;
    }
    if (snakeX > gridSizeX - 1) {
      snakeX = 0;
    }

    if (snakeY < 0) {
      snakeY = gridSizeY - 1;
    }
    if (snakeY > gridSizeY - 1) {
      snakeY = 0;
    }

    // snake ate the apple
    if (snakeX == appleX && snakeY == appleY) {
      score.update((s) => s + 1);
      // tailSize += 1;

      dispatch("scoreChange", $score);

      appleX = Math.floor(Math.random() * gridSizeX);
      appleY = Math.floor(Math.random() * gridSizeY);
    }

    // paint background
    context.fillStyle = getComputedStyle(
      document.documentElement
    ).getPropertyValue("--bg--main");
    context.fillRect(0, 0, context.canvas.width, context.canvas.height);

    // paint snake
    context.fillStyle = "green";
    for (var i = 0; i < snakeTrail.length; i++) {
      context.fillRect(
        snakeTrail[i].x * tileSize,
        snakeTrail[i].y * tileSize,
        tileSize,
        tileSize
      );

      // snake bit itself
      if (started && snakeTrail[i].x == snakeX && snakeTrail[i].y == snakeY) {
        dispatch("gameOver");
      }
    }

    // paint apple
    context.fillStyle = "red";
    context.fillRect(appleX * tileSize, appleY * tileSize, tileSize, tileSize);

    // set snake trail
    snakeTrail.push({ x: snakeX, y: snakeY });
    while (snakeTrail.length > $score + defaultTailSize) {
      snakeTrail.shift();
    }
  }

  const interval = writable(0);

  renderable(({ context, time, ...rest }) => {
    if ($interval === 0 || $interval % Math.max(1, 10 - speed) === 0) {
      draw(context);
    }
    interval.set($interval + 1);
  });

  function controlSwitch(dir) {
    switch (dir) {
      case "left":
        started = true;
        nextX = -1;
        nextY = 0;
        break;
      case "up":
        started = true;
        nextX = 0;
        nextY = -1;
        break;
      case "right":
        started = true;
        nextX = 1;
        nextY = 0;
        break;
      case "down":
        started = true;
        nextX = 0;
        nextY = 1;
        break;
      default:
        break;
    }
  }

  function onKeyDown(e) {
    controlSwitch(
      {
        ArrowLeft: "left",
        ArrowRight: "right",
        ArrowDown: "down",
        ArrowUp: "up",
      }[e.key]
    );
  }

  const onSwipe = (dir) => () => {
    controlSwitch(dir);
  };

  function reset() {
    started = false;
    nextY = 0;
    nextX = 0;
    // tailSize = defaultTailSize;
    snakeTrail = [];
    snakeY = 10;
    snakeX = 10;
    appleY = 15;
    appleX = 15;
    score.set(0);
  }
  // use:swipe={{ direction: Hammer.DIRECTION_ALL }}
  /**
   * on:swipeleft={onSwipe('left')}
  on:swiperight={onSwipe('right')}
  on:swipeup={onSwipe('up')}
  on:swipedown={onSwipe('down')}
  */
</script>

<svelte:window on:keydown={onKeyDown} />

<slot {reset} />
