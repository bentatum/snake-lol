<script>
  import { renderable, height, width } from "./game";
  import { writable } from "svelte/store";
  import { createEventDispatcher } from "svelte";

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
  let tailSize = defaultTailSize;
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

    //snake bite apple?
    if (snakeX == appleX && snakeY == appleY) {
      tailSize += 1;

      dispatch("scoreChange", tailSize - defaultTailSize);

      appleX = Math.floor(Math.random() * gridSizeX);
      appleY = Math.floor(Math.random() * gridSizeY);
    }

    //paint background
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
    while (snakeTrail.length > tailSize) {
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

  function onKeyDown(e) {
    switch (e.key) {
      case "ArrowLeft":
        started = true;
        nextX = -1;
        nextY = 0;
        break;
      case "ArrowUp":
        started = true;
        nextX = 0;
        nextY = -1;
        break;
      case "ArrowRight":
        started = true;
        nextX = 1;
        nextY = 0;
        break;
      case "ArrowDown":
        started = true;
        nextX = 0;
        nextY = 1;
        break;
      default:
        break;
    }
  }

  function reset() {
    started = false;
    nextY = 0;
    nextX = 0;
    tailSize = defaultTailSize;
    snakeTrail = [];
    snakeY = 10;
    snakeX = 10;
    appleY = 15;
    appleX = 15;
  }
</script>

<svelte:window on:keydown={onKeyDown} />

<slot {reset} />
