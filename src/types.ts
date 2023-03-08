export type User = {
	id: string;
	username: string;
	email: string;
	avatar: string | null;
};

export type AuthDataResponse = {
	user_id: string;
	username: string;
	email: string;
	avatar: string | null;
	token: string;
};

export type ApiPoll = {
	title: string;
	description: string;
	duration: number;
	options: Array<{ id: string; value: string }>;
	owner: string;
	deleted_at: null;
	poll_id: string;
	total_votes: number;
	anonymous_poll: boolean;
	public_poll: boolean;
	public_result: boolean;
	user_registred: boolean;
	created_at: Date;
	updated_at: Date;
};

export type Poll = {
	id: string;
	question: string;
	description: string;
	duration: number;
	options: Array<{ id: string; value: string }>;
	totalVotes: number;
	status: 'active' | 'finished';
	createdAt: string;
	updatedAt: string;
};
