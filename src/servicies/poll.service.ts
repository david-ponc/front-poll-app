export const PollService = {
	getPolls,
	getPoll,
	createPoll,
	vote
};

async function getPolls() {
	const response = await fetch('/api/polls');

	const { polls } = await response.json();

	return polls;
}

async function getPoll(id: string) {
	const response = await fetch(`/api/polls/${id}`);

	const { poll } = await response.json();

	return poll;
}

async function createPoll(data: {
	question: string;
	description: string;
	duration: number;
	options: Array<{ id: string; value: string }>;
}) {
	const response = await fetch('/polls', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify(data)
	});

	const { poll } = await response.json();

	return poll;
}

async function vote(id: string, option: { id: string; value: string }) {
	const response = await fetch(`/vote/${id}`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify({ option })
	});

	const { poll } = await response.json();

	return poll;
}
