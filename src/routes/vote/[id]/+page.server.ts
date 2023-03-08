import { API_URL } from '$env/static/private';
import type { ApiPoll, Poll } from '~/types';
import type { PageServerLoad } from './$types';

export const load = (async ({ params, fetch }) => {
	const { id } = params;
	const response = await fetch(`${API_URL}/polls/${id}`);

	const data = await response.json();

	const poll = apiPollToPoll(data);

	return { poll };
}) satisfies PageServerLoad;

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
