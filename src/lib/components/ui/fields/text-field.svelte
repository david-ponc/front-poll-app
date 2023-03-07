<script lang="ts">
	import { fly } from 'svelte/transition';
	import { cn } from '~/lib/utils/cn';

	export let name: string;
	export let label: string;
	export let placeholder: string;
	export let type: 'text' | 'email' = 'text';
	export let value: string;
	export let required = false;
	export let disabled = false;
	export let error = '';

	const onInput = (event: Event) => {
		value = (event.target as HTMLInputElement).value;
	};
</script>

<fieldset class="flex flex-col gap-1">
	{#if label}
		<label for="" class="text-sm font-medium text-zinc-400">{label}</label>
	{/if}
	<input
		{name}
		{type}
		{value}
		{placeholder}
		{required}
		{disabled}
		on:input={onInput}
		on:change
		on:keyup
		on:blur
		class={cn(
			'px-4 py-3 rounded-lg bg-black/30 border',
			error ? 'bg-rose-900/10 border-rose-500/50 focus:ring-rose-500/20' : 'border-transparent'
		)}
	/>
	{#if error}
		<span transition:fly|local={{ y: -5 }} class="pl-3 text-sm text-rose-400">{error}</span>
	{/if}
</fieldset>
