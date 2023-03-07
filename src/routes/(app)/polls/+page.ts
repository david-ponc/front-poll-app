import type { PageLoad } from './$types';

export const load = (async ({ parent }) => {
	const { user } = await parent();

	return {
		user
	};
}) satisfies PageLoad;
