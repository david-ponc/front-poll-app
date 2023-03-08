<script lang="ts">
	import { fly } from 'svelte/transition';
	import { cn } from '~/lib/utils/cn';

	export let name: string;
	export let label = '';
	export let value = '';
	export let required = false;
	export let disabled = false;
	export let error = '';
	let className = '';

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
	<select
		{name}
		{disabled}
		bind:value
		class={cn(
			'w-full col-span-6 px-4 py-3 rounded-lg bg-black/30 outline-none',
			value ? 'text-zinc-50' : 'text-zinc-500'
		)}
	>
		<slot />
	</select>
	{#if error}
		<span transition:fly|local={{ y: -5 }} class="pl-3 text-sm text-rose-400">{error}</span>
	{/if}
</fieldset>
