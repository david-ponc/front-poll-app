import { redirect } from '@sveltejs/kit';
import { authDataToUser } from '~/lib/adapters/auth-data-to-user';
import type { AuthDataResponse } from '~/types';
import type { RequestHandler } from './$types';

export const GET = (async ({ cookies }) => {
	const token = cookies.get('token');

	if (!token) {
		cookies.set('token', '', {
			path: '/',
			maxAge: 0,
			sameSite: 'lax',
			httpOnly: true,
			secure: true
		});
		throw redirect(307, '/sign-in');
	}

	// fetch user data from API

	const data: AuthDataResponse = {
		user_id: crypto.randomUUID(),
		username: 'johndoe',
		email: 'john@mail.com',
		avatar: 'https://unavatar.io/johndoe',
		token
	};

	const user = authDataToUser(data);

	return new Response(JSON.stringify({ user }), {
		status: 200,
		headers: { 'Content-Type': 'application/json' }
	});
}) satisfies RequestHandler;
