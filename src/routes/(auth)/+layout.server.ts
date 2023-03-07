import { redirect } from '@sveltejs/kit';
import type { LayoutServerLoad } from './$types';

export const load = (({ cookies }) => {
	const token = cookies.get('token');

	if (token) {
		throw redirect(307, '/polls');
	}
}) satisfies LayoutServerLoad;
