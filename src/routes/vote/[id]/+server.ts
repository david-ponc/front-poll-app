import { API_URL } from '$env/static/private';
import type { RequestHandler } from './$types';

export const POST = (async ({ request, params, fetch }) => {
	const { id } = params;
	const { option } = await request.json();

	const response = await fetch(`${API_URL}/polls/vote/${id}`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify({ option })
	});

	if (!response.ok) {
		return new Response(JSON.stringify({ error: 'Bad request' }), {
			status: 400,
			headers: { 'Content-Type': 'application/json' }
		});
	}

	const data = await response.json();

	return new Response(JSON.stringify(data), {
		status: 201,
		headers: { 'Content-Type': 'application/json' }
	});
}) satisfies RequestHandler;
