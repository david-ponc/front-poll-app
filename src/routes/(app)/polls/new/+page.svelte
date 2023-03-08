<script lang="ts">
	import { createForm } from 'svelte-forms-lib';
	import Select from '~/lib/components/ui/fields/select/select.svelte';
	import TextField from '~/lib/components/ui/fields/text-field.svelte';
	import * as yup from 'yup';
	import { generateUuid } from '~/lib/utils/uuid';
	import { PollService } from '~/servicies/poll.service';
	import { goto } from '$app/navigation';

	let loading = false;

	const { form, errors, isValid, handleSubmit, handleChange } = createForm({
		initialValues: {
			question: '',
			description: '',
			duration: '',
			options: [
				{ id: generateUuid(), value: '' },
				{ id: generateUuid(), value: '' }
			]
		},
		onSubmit: (values) => {
			loading = true;
			const data = {
				question: values.question,
				description: values.description,
				duration: Number(values.duration) * 60_000,
				options: values.options
			};
			PollService.createPoll(data)
				.then(() => goto('/polls'))
				.finally(() => (loading = false));
		},
		validationSchema: yup.object().shape({
			question: yup.string().required(),
			description: yup.string(),
			duration: yup.string().required(),
			options: yup
				.array()
				.of(
					yup.object().shape({
						id: yup.string().required(),
						value: yup.string().required()
					})
				)
				.min(2)
				.required()
		})
	});

	// let options = ['', ''];

	function addOption() {
		if ($form.options.length >= 5) return;
		// options = [...options, ''];
		$form.options = [...$form.options, { id: generateUuid(), value: '' }];
	}

	function removeOption(id: string) {
		if ($form.options.length <= 2) return;
		// options = options.filter((_, i) => i !== index);
		$form.options = $form.options.filter((option) => option.id !== id);
	}
</script>

<svelte:head>
	<title>New Poll</title>
	<meta name="description" content="Create a new poll" />
</svelte:head>

<section class="w-full h-full max-w-6xl mx-auto flex items-center justify-center">
	<form class="w-full max-w-md md:grid grid-cols-6 gap-4" on:submit|preventDefault={handleSubmit}>
		<TextField
			class="col-span-6"
			type="text"
			label="Question"
			name="question"
			placeholder="How are you?"
			required
			on:keyup={handleChange}
			bind:value={$form.question}
			error={$errors.question}
		/>
		<TextField
			class="col-span-6"
			type="text"
			label="Description"
			name="description"
			placeholder="Tell us about yourself."
			on:keyup={handleChange}
			bind:value={$form.description}
			error={$errors.description}
		/>
		<Select
			name="duration"
			label="Duration"
			required
			class="col-span-6"
			bind:value={$form.duration}
			error={$errors.duration}
		>
			<option value="">Select one duration</option>
			<option value="1">1m</option>
			<option value="2">2m</option>
			<option value="3">3m</option>
			<option value="5">5m</option>
			<option value="10">10m</option>
		</Select>
		<section class="w-full col-span-6 grid gap-2">
			<h3 class="text-xl">Options <span class="text-xs font-semibold">(Minimum 2)</span></h3>
			<ul class="flex flex-col gap-4">
				{#each $form.options as option}
					<li class="flex items-center gap-4">
						<TextField size="sm" class="grow" bind:value={option.value} />
						<button
							disabled={$form.options.length <= 2}
							on:click={() => removeOption(option.id)}
							type="button"
							class="shrink-0 p-1 rounded-full bg-zinc-800 text-zinc-400 shadow-inner shadow-zinc-700/80 disabled:opacity-30"
						>
							<svg viewBox="0 0 16 16" width="16" height="16" class="w-3 h-3">
								<path
									fill="currentColor"
									d="M3.72 3.72a.75.75 0 0 1 1.06 0L8 6.94l3.22-3.22a.749.749 0 0 1 1.275.326.749.749 0 0 1-.215.734L9.06 8l3.22 3.22a.749.749 0 0 1-.326 1.275.749.749 0 0 1-.734-.215L8 9.06l-3.22 3.22a.751.751 0 0 1-1.042-.018.751.751 0 0 1-.018-1.042L6.94 8 3.72 4.78a.75.75 0 0 1 0-1.06Z"
								/>
							</svg>
						</button>
					</li>
				{/each}
			</ul>
			<footer class="flex justify-end mt-2">
				<button
					type="button"
					disabled={$form.options.length >= 5}
					on:click={addOption}
					class="text-sm font-medium text-indigo-300 rounded disabled:text-zinc-600"
					>Add option</button
				>
			</footer>
		</section>
		<section class="col-span-6 flex items-center gap-4">
			<a
				href="/polls"
				class="w-full text-center text-sm font-medium px-4 py-2 rounded-lg bg-zinc-800 enabled:active:scale-x-[0.98] enabled:active:scale-[0.98]"
			>
				Cancel
			</a>
			<button
				disabled={!$isValid || loading}
				class="w-full text-sm font-medium px-4 py-2 rounded-lg bg-gradient-to-b from-indigo-400 to-indigo-600 enabled:active:scale-x-[0.98] enabled:active:scale-[0.98]"
			>
				Create poll
			</button>
		</section>
	</form>
</section>
