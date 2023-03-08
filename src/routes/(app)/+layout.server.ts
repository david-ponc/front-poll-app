import { redirect } from '@sveltejs/kit';
import type { User } from '~/types';
import type { LayoutServerLoad } from './$types';

export const load = (async ({ cookies, fetch }) => {
	const token = cookies.get('token');

	if (!token) {
		throw redirect(307, '/sign-in');
	}

	const response = await fetch('/api/user');

	const { user }: { user: User } = await response.json();

	if (!user) {
		throw redirect(307, '/sign-in');
	}

	return {
		user,
		token
	};
}) satisfies LayoutServerLoad;
