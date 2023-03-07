import { authDataToUser } from '~/lib/adapters/auth-data-to-user';
import type { AuthDataResponse } from '~/types';
import type { RequestHandler } from './$types';

export const POST = (async ({ request, cookies }) => {
	const { email, password } = await request.json();

	const data: AuthDataResponse = {
		user_id: crypto.randomUUID(),
		token: btoa(`{"fake":"true"}.${email}:${password}).{"fake":"true"}`),
		username: 'johndoe',
		email,
		avatar: 'https://unavatar.io/johndoe'
	};

	cookies.set('token', data.token, {
		path: '/',
		maxAge: 60 * 60 * 24 * 7,
		sameSite: 'lax',
		httpOnly: true,
		secure: true
	});

	const user = authDataToUser(data);

	return new Response(JSON.stringify({ user }), {
		status: 200,
		headers: { 'Content-Type': 'application/json' }
	});
}) satisfies RequestHandler;
