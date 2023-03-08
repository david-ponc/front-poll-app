import type { ApiPoll, Poll } from '~/types';
import type { PageServerLoad } from './$types';
import { formatInTimeZone, utcToZonedTime } from 'date-fns-tz';
import { API_URL } from '$env/static/private';

export const load = (async ({ parent, fetch }) => {
	const { user, token } = await parent();

	const response = await fetch(`${API_URL}/polls`, {
		headers: {
			Authorization: `Bearer ${token}`
		}
	});

	const [data] = await response.json();

	let polls: Array<Poll> = data.map(apiPollToPoll);

	function calculateStatus(duration: number, createdAt: string) {
		const now = new Date().getTime();
		// consider locale time
		const pollDuration = new Date(createdAt).getTime() + duration;
		return now < pollDuration ? 'active' : 'finished';
	}
	console.log(polls);
	polls = polls.map((poll) => ({
		...poll,
		status: calculateStatus(poll.duration, poll.createdAt),
		// createdAt: new Date(
		// 	new Date(poll.createdAt).getTime() - new Date(poll.createdAt).getTimezoneOffset() * 60_000
		// ).toLocaleString('en-US', { timeZone: 'America/Mexico_City' })
		createdAt: utcToZonedTime(new Date(poll.createdAt), 'America/Mexico_City', {}).toLocaleString()
	}));

	return {
		user,
		polls
	};
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
