<script lang="ts">
  import Canvas from "../../Canvas.svelte";
  import Button from "../../elements/Button";
  import Dialog from "../../elements/Dialog";
  import Snake from "../../Snake.svelte";

  import { score, time } from "../../../game";

  const onScoreChange = () => {};

  let isGameOver = false;

  const onGameOverDialogClose = () => {};
</script>

<div class="h-screen grid place-items-center">
  <div class="relative">
    <div class="shadow-lg relative flex items-center justify-center">
      <div class="text-white absolute right-2 top-2 z-10 font-mono text-xs">
        {$score}
      </div>
      <Canvas let:stop let:start>
        <Snake
          let:reset
          speed={7}
          on:scoreChange={onScoreChange}
          on:gameOver={() => {
            stop();
            isGameOver = true;
          }}
        >
          <div
            class="absolute right-2 bottom-2 font-mono text-xs text-white z-10"
          >
            {new Date($time * 1000).toISOString().substr(11, 8)}
          </div>
          {#if isGameOver}
            <div class="z-10 absolute text-center w-full space-y-7 p-7">
              <h2 class="text-white font-mono font-black text-xl">Game over</h2>
              <div class="grid grid-cols-2 gap-2">
                <Button
                  on:click={() => {
                    reset();
                    start();
                    isGameOver = false;
                  }}>Start over</Button
                >
                <Button disabled class="secondary">Continue</Button>
                <Button disabled class="col-span-2" color="primary"
                  >Save score</Button
                >
              </div>
            </div>
          {/if}
        </Snake>
      </Canvas>
    </div>
  </div>
</div>
