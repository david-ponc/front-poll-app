import type { RequestHandler } from './$types';

export const GET = (({ cookies }) => {
	cookies.set('token', '', {
		path: '/',
		maxAge: 0,
		sameSite: 'lax',
		httpOnly: true,
		secure: true
	});

	return new Response();
}) satisfies RequestHandler;
