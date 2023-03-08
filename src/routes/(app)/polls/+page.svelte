<script lang="ts">
	import Badge from '../components/badge.svelte';
	import { Table, THead, THeadRow, TBody, TRow, TCell } from '../components/ui/table';
	import type { PageData } from './$types';
	import RelativeTime from 'svelte-relative-time';
	import formatDuration from 'date-fns/formatDuration';

	export let data: PageData;

	const { polls } = data;
	console.log(polls);
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
		<a
			href="/polls/new"
			class="text-sm font-medium px-4 py-2 rounded-lg bg-gradient-to-b from-indigo-400 to-indigo-600 mt-3 enabled:active:scale-x-[0.98] enabled:active:scale-[0.98]"
		>
			New poll
		</a>
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
				{#each polls as poll}
					<TRow>
						<TCell>
							<div>
								<p class="text-sm font-bold truncate">{poll.question}</p>
								<p class="text-xs text-zinc-400 truncate">{poll.description}</p>
							</div>
						</TCell>
						<TCell>{formatDuration({ minutes: poll.duration / 60_000 })}</TCell>
						<TCell>{poll.totalVotes}</TCell>
						<TCell>
							<Badge status={poll.status} />
						</TCell>
						<TCell>
							{poll.createdAt}
							<!-- <RelativeTime date={new Date(poll.createdAt)} locale="es-MX" /> -->
						</TCell>
					</TRow>
				{/each}
			</TBody>
		</Table>
	</main>
</section>
