<script lang="ts">
	import { user } from '~/lib/stores/user';
	import type { LayoutData } from './$types';
	import { Navbar } from './components/ui/navbar';

	export let data: LayoutData;

	user.set(data.user);
</script>

<section class="min-h-screen grid grid-rows-[auto_1fr]">
	<Navbar />
	<slot />
</section>
