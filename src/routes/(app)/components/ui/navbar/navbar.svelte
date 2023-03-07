<script lang="ts">
	import DropdownMenu from './dropdown-menu.svelte';
	import Navlink from './navlink.svelte';
	import UserDisplay from './user-display.svelte';
</script>

<header class="sticky w-full py-3 px-6">
	<div class="w-full max-w-6xl mx-auto flex items-center justify-between">
		<a href="/polls" class="text-lg font-semibold"> Poll app </a>
		<section class="flex items-center gap-6">
			<nav class="flex items-center gap-4">
				<Navlink href="/polls">Polls</Navlink>
			</nav>
			<div class="w-px min-h-[40px] h-full bg-zinc-800" />
			<DropdownMenu>
				<UserDisplay />
			</DropdownMenu>
		</section>
	</div>
</header>
