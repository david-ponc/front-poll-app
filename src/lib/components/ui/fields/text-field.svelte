<script lang="ts">
	import { fly } from 'svelte/transition';
	import { cn } from '~/lib/utils/cn';

	export let name = '';
	export let label = '';
	export let placeholder = '';
	export let type: 'text' | 'email' = 'text';
	export let value = '';
	export let required = false;
	export let disabled = false;
	export let error = '';
	export let size: 'sm' | 'md' = 'md';
	let className = '';

	const onInput = (event: Event) => {
		value = (event.target as HTMLInputElement).value;
	};

	export { className as class };
</script>

<fieldset class={cn('flex flex-col gap-1', className)}>
	{#if label}
		<label
			for=""
			class={cn(
				'text-sm font-medium text-zinc-400',
				required ? 'after:content-["*"] after:ml-0.5 after:text-rose-400' : ''
			)}>{label}</label
		>
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
			'w-full rounded-lg bg-black/30 border placeholder:text-zinc-500',
			size === 'sm' ? 'text-sm py-2 px-4' : 'text-base px-4 py-3',
			error ? 'bg-rose-900/10 border-rose-500/50 focus:ring-rose-500/20' : 'border-transparent'
		)}
	/>
	{#if error}
		<span transition:fly|local={{ y: -5 }} class="pl-3 text-sm text-rose-400">{error}</span>
	{/if}
</fieldset>
