<script lang="ts">
	import { user } from '~/lib/stores/user';
</script>

<section class="flex gap-4 cursor-pointer py-1.5 px-2.5 rounded-xl hover:bg-zinc-800">
	<div class="text-right">
		<p class="text-sm font-medium text-zinc-300">{$user.username}</p>
		<p class="text-xs font-semibold text-zinc-400">{$user.email}</p>
	</div>
	<figure class="bg-white/10 w-10 h-10 rounded-full overflow-hidden">
		<img src={$user.avatar} alt={$user.username} class="w-full h-full object-cover" />
	</figure>
</section>
