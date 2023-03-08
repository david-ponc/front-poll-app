<script lang="ts">
	import { invalidateAll } from '$app/navigation';
	import PasswordField from '$lib/components/ui/fields/password-field.svelte';
	import TextField from '$lib/components/ui/fields/text-field.svelte';
	import Spinner from '$lib/components/ui/spinner.svelte';
	import { cn } from '$lib/utils/cn';
	import { createForm } from 'svelte-forms-lib';
	import * as yup from 'yup';
	import { user } from '~/lib/stores/user';
	import { AuthService } from '~/servicies/auth.service';

	let loading = false;

	const { form, errors, isValid, handleSubmit, handleChange } = createForm({
		initialValues: { username: '', email: '', password: '', confirmPassword: '' },
		onSubmit: (values) => {
			loading = true;
			AuthService.signUp(values)
				.then((userInfo) => user.set(userInfo))
				.then(() => invalidateAll())
				.finally(() => (loading = false));
		},
		validationSchema: yup.object().shape({
			username: yup.string().required(),
			email: yup.string().email().required(),
			password: yup.string().min(8).max(32).required(),
			confirmPassword: yup
				.string()
				.oneOf([yup.ref('password')], 'Passwords must match')
				.required()
		})
	});
</script>

<svelte:head>
	<title>Poll app | Sign up</title>
</svelte:head>

<section class="w-full h-screen flex items-center justify-center flex-col gap-2">
	<form
		on:submit={handleSubmit}
		class={cn(
			'bg-zinc-800 p-8 rounded-2xl grid lg:grid-cols-6 gap-3 shadow-2xl border border-zinc-700/40 w-full max-w-lg',
			!$isValid ? 'shadow-rose-600/10' : 'shadow-indigo-600/10'
		)}
	>
		<h1
			class="text-2xl tracking-tight font-bold text-center text-transparent bg-clip-text bg-gradient-to-tr from-indigo-200 to-indigo-400 col-span-6"
		>
			Sign up
		</h1>
		<TextField
			name="username"
			label="Username"
			placeholder="johndoe"
			class="col-span-6"
			on:keyup={handleChange}
			bind:value={$form.username}
			error={$errors.username}
		/>
		<TextField
			name="email"
			label="Email address"
			placeholder="example@domain.com"
			class="col-span-6"
			on:keyup={handleChange}
			bind:value={$form.email}
			error={$errors.email}
		/>
		<PasswordField
			name="password"
			label="Password"
			placeholder="Secret key"
			class="col-span-3"
			on:keyup={handleChange}
			bind:value={$form.password}
			error={$errors.password}
		/>
		<PasswordField
			name="confirmPassword"
			label="Confirm"
			placeholder="Confirm secret key"
			class="col-span-3"
			on:keyup={handleChange}
			bind:value={$form.confirmPassword}
			error={$errors.confirmPassword}
		/>
		<button
			disabled={loading}
			class="w-full col-span-6 text-sm font-medium px-6 py-3 rounded-lg bg-gradient-to-b from-indigo-400 to-indigo-600 mt-3 enabled:active:scale-x-[0.98] enabled:active:scale-[0.98]"
		>
			{#if loading}
				<span class="flex justify-center items-center gap-2"><Spinner />Loading...</span>
			{:else}
				Sign in
			{/if}
		</button>
		<p class="text-sm text-zinc-400 text-center col-span-6">
			Already have an account? <a
				href="/sign-in"
				class="text-indigo-300 underline underline-offset-2"
			>
				Sign in
			</a>
		</p>
	</form>
</section>
