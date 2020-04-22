<script>
  import { onMount } from "svelte";
  import Canvas from "./Canvas.svelte";
  import Snake from "./Snake.svelte";
  import { writable } from "svelte/store";
  import {
    Dialog,
    DialogTitle,
    DialogActions,
    DialogContent,
    Button
  } from "./suish";

  const score = writable(0);

  function onScoreChange({ detail }) {
    score.set(detail);
  }

  let showGameOverDialog = false;

  function onGameOver() {
    showGameOverDialog = true;
  }

  function onGameOverDialogClose() {
    showGameOverDialog = false;
  }
</script>

<style>
  :global(body) {
    overflow: hidden;
  }

  h1 {
    position: absolute;
    top: 0;
    right: calc(var(--space) * 2);
  }
</style>

<Canvas let:stop let:start>
  <Snake
    let:reset
    let:score
    speed={7}
    on:scoreChange={onScoreChange}
    on:gameOver={() => {
      showGameOverDialog = true;
      stop();
    }}>
    <Dialog
      open={showGameOverDialog}
      on:close={onGameOverDialogClose}
      fullWidth
      maxWidth="xs">
      <div class="p4 flex col center">
        <h2 class="m1">Game Over</h2>
        <Button
          primary
          on:click={() => {
            showGameOverDialog = false;
            reset();
            start();
          }}>
          Play Again
        </Button>
      </div>
    </Dialog>
  </Snake>
</Canvas>

<h1>{$score}</h1>
