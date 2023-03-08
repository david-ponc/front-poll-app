import { API_URL } from '$env/static/private';
import type { ApiPoll, Poll } from '~/types';
import type { RequestHandler } from './$types';

export const POST = (async ({ request, cookies, fetch }) => {
	const { question, description, duration, options } = await request.json();
	const token = cookies.get('token');

	const response = await fetch(`${API_URL}/polls`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
			Authorization: `Bearer ${token}`
		},
		body: JSON.stringify({
			title: question,
			description,
			duration,
			options,
			anonymous_poll: true,
			public_poll: true,
			public_result: true
		})
	});

	if (!response.ok) {
		return new Response(JSON.stringify({ error: 'Invalid credentials' }), {
			status: 401,
			headers: { 'Content-Type': 'application/json' }
		});
	}

	const data = await response.json();

	const poll = apiPollToPoll(data);

	return new Response(JSON.stringify(poll), {
		status: 201,
		headers: { 'Content-Type': 'application/json' }
	});
}) satisfies RequestHandler;

function apiPollToPoll(apiPoll: ApiPoll): Poll {
	return {
		id: apiPoll.poll_id,
		question: apiPoll.title,
		description: apiPoll.description,
		duration: apiPoll.duration,
		options: apiPoll.options,
		createdAt: new Date(apiPoll.created_at).toISOString(),
		updatedAt: new Date(apiPoll.updated_at).toISOString(),
		totalVotes: apiPoll.total_votes,
		status: 'active'
	} satisfies Poll;
}
