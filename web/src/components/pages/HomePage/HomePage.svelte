<script lang="ts">
  import Canvas from "../../Canvas.svelte";
  import Button from "../../elements/Button";
  import Dialog from "../../elements/Dialog";
  import Snake from "../../Snake.svelte";

  import { score, time } from "../../../game";

  const onScoreChange = () => {};

  let showGameOverDialog: boolean = false;

  const onGameOverDialogClose = () => {};
</script>

<div class="h-screen grid place-items-center">
  <div>
    <div class="shadow-lg relative">
      <div class="text-white absolute right-2 top-2 z-10 font-mono text-xs">
        {$score}
      </div>
      <Canvas let:stop let:start>
        <Snake
          let:reset
          speed={7}
          on:scoreChange={onScoreChange}
          on:gameOver={() => {
            showGameOverDialog = true;
            stop();
          }}>
          <Dialog open={showGameOverDialog} on:close={onGameOverDialogClose}>
            <div class="p4 flex col center">
              <h2 class="m1">Game Over</h2>
              <Button
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
      <div class="absolute right-2 bottom-2 font-mono text-xs text-white z-10">
        {new Date($time * 1000).toISOString().substr(11, 8)}
      </div>
    </div>
  </div>
</div>
