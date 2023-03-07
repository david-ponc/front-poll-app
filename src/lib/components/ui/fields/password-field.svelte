<script lang="ts">
	import { fly } from 'svelte/transition';
	import { cn } from '~/lib/utils/cn';
	import { EyeIcon, EyeOffIcon } from '../icons';

	export let name: string;
	export let label: string;
	export let placeholder: string;
	export let type: 'password' | 'text' = 'password';
	export let value: string;
	export let required = false;
	export let disabled = false;
	export let error = '';

	const onInput = (event: Event) => {
		value = (event.target as HTMLInputElement).value;
	};

	const toggleType = () => {
		type = type === 'password' ? 'text' : 'password';
	};
</script>

<fieldset class="flex flex-col gap-1 relative">
	{#if label}
		<label for="" class="text-sm font-medium text-zinc-400">{label}</label>
	{/if}
	<div
		class={cn(
			'flex rounded-lg bg-black/30 p-2 focus-within:ring-4 transition-shadow duration-150 border',
			error
				? 'bg-rose-900/10 border-rose-500/50 focus-within:ring-rose-500/20'
				: 'focus-within:ring-indigo-500/50 border-transparent'
		)}
	>
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
			class="w-full bg-transparent pl-2 focus:ring-0 pr-2"
		/>
		<button
			type="button"
			on:click={toggleType}
			class="shrink-0 h-8 w-8 flex items-center justify-center rounded-lg bg-white/5 border border-white/5 text-zinc-400 transition-all enabled:hover:bg-white/10 enabled:active:scale-x-90 enabled:active:scale-90 focus:ring-0"
		>
			{#if type === 'password'}
				<EyeIcon />
			{:else}
				<EyeOffIcon />
			{/if}
		</button>
	</div>
	{#if error}
		<span transition:fly|local={{ y: -5 }} class="text-sm text-red-400">{error}</span>
	{/if}
</fieldset>
