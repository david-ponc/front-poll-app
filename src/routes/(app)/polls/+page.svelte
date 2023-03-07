<script lang="ts">
	// import { invalidateAll } from '$app/navigation';
	// import { AuthService } from '~/servicies/auth.service';

	// const logout = () => {
	// 	AuthService.logout().then(() => invalidateAll());
	// };
</script>

<svelte:head>
	<title>Poll app | polls</title>
</svelte:head>

<section class="w-full h-full max-w-6xl mx-auto">
	<header class="flex items-center justify-between">
		<h1 class="text-3xl font-bold">Polls</h1>
		<button
			class="text-sm font-medium px-4 py-2 rounded-lg bg-gradient-to-b from-indigo-400 to-indigo-600 mt-3 enabled:active:scale-x-[0.98] enabled:active:scale-[0.98]"
		>
			New poll
		</button>
	</header>
	<main />
</section>
