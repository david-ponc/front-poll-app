<script lang="ts">
	import Badge from '../components/badge.svelte';
	import { Table, THead, THeadRow, TBody, TRow, TCell } from '../components/ui/table';
</script>

<svelte:head>
	<title>Poll app | polls</title>
</svelte:head>

<section class="w-full h-full max-w-6xl mx-auto">
	<header class="flex items-center justify-between">
		<div>
			<h1 class="text-2xl font-bold">Polls</h1>
			<p class="text-sm text-zinc-400">A list of all polls you have created.</p>
		</div>
		<button
			class="text-sm font-medium px-4 py-2 rounded-lg bg-gradient-to-b from-indigo-400 to-indigo-600 mt-3 enabled:active:scale-x-[0.98] enabled:active:scale-[0.98]"
		>
			New poll
		</button>
	</header>
	<main class="my-8">
		<Table>
			<THead>
				<THeadRow>Title</THeadRow>
				<THeadRow>Duration</THeadRow>
				<THeadRow>Votes</THeadRow>
				<THeadRow>Status</THeadRow>
				<THeadRow>Created at</THeadRow>
			</THead>
			<TBody>
				<TRow>
					<TCell>
						<div>
							<p class="text-sm font-bold truncate">What is your favorite color?</p>
							<p class="text-xs text-zinc-400 truncate">
								Lorem ipsum dolor sit amet consectetur adipisicing elit.
							</p>
						</div>
					</TCell>
					<TCell>1 min</TCell>
					<TCell>0</TCell>
					<TCell>
						<Badge status="finished" />
					</TCell>
					<TCell>today</TCell>
				</TRow>
			</TBody>
		</Table>
	</main>
</section>
