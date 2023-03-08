<script lang="ts">
	import { PollService } from '~/servicies/poll.service';
	import type { PageData, PageServerData } from './$types';

	export let data: PageServerData;

	const { poll } = data;

	function handleVote(option: { id: string; value: string }) {
		PollService.vote(poll.id, option);
	}
</script>

<section class="w-full h-screen flex items-center justify-center">
	<main
		class="bg-zinc-800 p-8 rounded-2xl flex flex-col gap-3 shadow-2xl border border-zinc-700/40 w-full max-w-sm"
	>
		<h1
			class="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-tr from-indigo-200 to-indigo-400 tracking-tight"
		>
			{poll.question}
		</h1>
		<p class="text-xl text-zinc-400/80 bg-clip-text">{poll.description}</p>
		<div class="flex flex-col gap-4">
			{#each poll.options as option}
				<button
					on:click={() => handleVote(option)}
					class="bg-zinc-700/50 hover:bg-zinc-700 text-white rounded-lg p-2"
				>
					{option.value}
				</button>
			{/each}
		</div>
	</main>
</section>
