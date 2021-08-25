<script lang="ts">
	import Canvas from '../Canvas.svelte';
	import Button from '../elements/Button';
	import Snake from '../Snake.svelte';

	import { score, time } from '../../game';

	const onScoreChange = () => {};

	let isGameOver = false;

	const onGameOverDialogClose = () => {};
</script>

<div class="h-screen grid place-items-center">
	<div class="relative">
		<div class="shadow-lg relative flex items-center justify-center rounded-xl overflow-hidden">
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
					<div class="absolute right-2 bottom-2 font-mono text-xs text-white z-10">
						{new Date($time * 1000).toISOString().substr(11, 8)}
					</div>
					{#if isGameOver}
						<div class="z-10 absolute text-center w-full space-y-7 p-7">
							<h2 class="text-white font-mono font-black text-xl">Game over</h2>
							<Button
								color="primary"
								on:click={() => {
									reset();
									start();
									isGameOver = false;
								}}
							>
								Start over
							</Button>
							<!-- <div class="grid grid-cols-2 gap-2"> -->
							<!-- <Button disabled color="primary">Save score</Button> -->
							<!-- </div> -->
						</div>
					{/if}
				</Snake>
			</Canvas>
		</div>
		<nav class="text-center text-sm py-7 flex space-x-4 justify-center">
			<div>Made by <a href="https://benjtatum.com">Ben</a></div>
			<div>|</div>
			<a href="https://cash.app/$benjtatum">Donate</a>
		</nav>
		<!-- <nav class="text-gray-400 text-center p-4">
      <a>Donate</a>
      |
      <a>Foo</a>
    </nav> -->
	</div>
</div>
