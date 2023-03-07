<script lang="ts">
	import { cn } from '~/lib/utils/cn';

	export let status: 'active' | 'finished' | 'cancelled';

	const LABEL = {
		active: 'Active',
		finished: 'Finished',
		cancelled: 'Cancelled'
	} satisfies {
		[key in typeof status]: string;
	};

	const VARIANT = {
		active: 'bg-emerald-900/60 text-emerald-300',
		finished: 'bg-sky-900/60 text-sky-300',
		cancelled: 'bg-rose-900/60 text-rose-300'
	} satisfies {
		[key in typeof status]: string;
	};

	const label = LABEL[status];
	const variant = VARIANT[status];
</script>

<span class={cn('text-xs font-medium px-2 py-1 rounded-full', variant)}>
	{label}
</span>
