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
