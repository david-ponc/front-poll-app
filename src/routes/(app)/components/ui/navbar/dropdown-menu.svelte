<script lang="ts">
	import { invalidateAll } from '$app/navigation';
	import { AuthService } from '~/servicies/auth.service';

	let open = false;
	let firstElement: HTMLButtonElement;

	$: if (open && firstElement) {
		firstElement.focus();
	}

	const logout = () => {
		AuthService.logout().then(() => invalidateAll());
	};

	function toggle() {
		open = !open;
	}

	function close() {
		open = false;
	}

	function handleEscapeKey(event: KeyboardEvent) {
		if (event.key === 'Escape') {
			close();
		}
	}
</script>

<svelte:window on:keyup={handleEscapeKey} />

<div class="relative">
	<button on:click={toggle} class="rounded-xl">
		<slot />
	</button>

	{#if open}
		<!-- svelte-ignore a11y-click-events-have-key-events -->
		<div aria-label="overlay" class="fixed inset-0" on:click={close} />
		<section
			class="absolute w-full bg-zinc-800 border border-zinc-700 rounded-lg text-zinc-400 mt-2"
		>
			<button
				bind:this={firstElement}
				on:click={close}
				class="px-6 py-3 hover:bg-zinc-700/50 w-full text-sm font-medium flex items-center justify-between focus:bg-zinc-700/50 focus:ring-0 hover:text-zinc-50 focus:text-zinc-50"
			>
				<svg viewBox="0 0 16 16" width="16" height="16">
					<path
						fill="currentColor"
						d="M10.561 8.073a6.005 6.005 0 0 1 3.432 5.142.75.75 0 1 1-1.498.07 4.5 4.5 0 0 0-8.99 0 .75.75 0 0 1-1.498-.07 6.004 6.004 0 0 1 3.431-5.142 3.999 3.999 0 1 1 5.123 0ZM10.5 5a2.5 2.5 0 1 0-5 0 2.5 2.5 0 0 0 5 0Z"
					/>
				</svg>
				Mi perfil
			</button>
			<button
				on:click={logout}
				on:click={close}
				class="px-6 py-3 hover:bg-rose-900/20 w-full text-sm font-medium flex items-center justify-between focus:bg-rose-900/20 focus:ring-0 bg-rose-900/5 hover:text-rose-300 focus:text-rose-300"
			>
				<svg viewBox="0 0 16 16" width="16" height="16">
					<path
						fill="currentColor"
						d="M2 2.75C2 1.784 2.784 1 3.75 1h2.5a.75.75 0 0 1 0 1.5h-2.5a.25.25 0 0 0-.25.25v10.5c0 .138.112.25.25.25h2.5a.75.75 0 0 1 0 1.5h-2.5A1.75 1.75 0 0 1 2 13.25Zm10.44 4.5-1.97-1.97a.749.749 0 0 1 .326-1.275.749.749 0 0 1 .734.215l3.25 3.25a.75.75 0 0 1 0 1.06l-3.25 3.25a.749.749 0 0 1-1.275-.326.749.749 0 0 1 .215-.734l1.97-1.97H6.75a.75.75 0 0 1 0-1.5Z"
					/>
				</svg>
				Logout
			</button>
		</section>
	{/if}
</div>
