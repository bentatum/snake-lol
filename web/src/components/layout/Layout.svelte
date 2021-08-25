<script lang="ts">
	import MyLinksNav from '../MyLinksNav.svelte';
</script>

<div class="bg-yellow-50 dark:bg-black dark:text-white min-h-screen relative">
	<div class="h-screen grid place-items-center z-10 relative">
		<div class="text-center">
			<h1
				class="text-lg sm:text-2xl select-none font-black uppercase tracking-widest uppercase mb-7"
			>
				Ben Tatum
			</h1>
			<div class="text-base">
				<MyLinksNav />
			</div>
		</div>
	</div>
</div>
