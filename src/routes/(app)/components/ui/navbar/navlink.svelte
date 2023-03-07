<script lang="ts">
	import { page } from '$app/stores';
	import { cn } from '~/lib/utils/cn';

	export let href: string;
	let active: boolean = $page.url.pathname === href;
</script>

<a
	{href}
	class={cn(
		'text-sm font-medium',
		active ? 'text-indigo-300' : 'text-zinc-400 hover:text-zinc-300'
	)}
>
	<slot />
</a>
