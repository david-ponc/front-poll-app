import { API_URL } from '$env/static/private';
import { authDataToUser } from '~/lib/adapters/auth-data-to-user';
import type { AuthDataResponse } from '~/types';
import type { RequestHandler } from './$types';

export const POST = (async ({ request, cookies, fetch }) => {
	const { email, password } = await request.json();

	const response = await fetch(`${API_URL}/login`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify({ email, password })
	});

	if (!response.ok) {
		return new Response(JSON.stringify({ error: 'Invalid credentials' }), {
			status: 401,
			headers: { 'Content-Type': 'application/json' }
		});
	}

	const { token, ...rawUser }: AuthDataResponse = await response.json();

	cookies.set('token', token, {
		path: '/',
		maxAge: 60 * 60 * 24 * 7,
		sameSite: 'lax',
		httpOnly: true,
		secure: true
	});

	const user = authDataToUser(rawUser);

	return new Response(JSON.stringify({ user }), {
		status: 200,
		headers: { 'Content-Type': 'application/json' }
	});
}) satisfies RequestHandler;
