<svelte:head>
	<title>Poll app</title>
</svelte:head>

<section class="w-full h-screen flex items-center justify-center flex-col gap-2">
	<section class="w-full max-w-7xl text-left grid gap-4 grid-cols-12">
		<section class="col-span-5 grid gap-4">
			<h1
				class="text-7xl font-black tracking-tight text-transparent bg-gradient-to-r from-violet-300 to-purple-300 bg-clip-text leading-[1.1] pb-1 w-full max-w-3xl break-words"
			>
				Know what your audience is thinking
			</h1>
			<p class="text-zinc-400 text-lg">
				We help you create polls and share them with your audience, know the results in real time
				and get actionable insights.
			</p>

			<section class="flex w-full max-w-[216px] mt-6">
				<a
					href="/sign-in"
					class="grow text-center text-sm font-medium px-6 py-3 rounded-lg bg-gradient-to-b from-indigo-400 to-indigo-600 enabled:active:scale-x-[0.98] enabled:active:scale-[0.98]"
				>
					Start now
				</a>
			</section>
		</section>
		<section class="col-span-7 bg-zinc-800" />
	</section>
</section>
