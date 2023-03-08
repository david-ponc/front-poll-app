import type { AuthDataResponse, User } from '~/types';

export function authDataToUser(data: Omit<AuthDataResponse, 'token'>): User {
	return {
		id: data.user_id,
		username: data.username,
		email: data.email,
		avatar: data.avatar
	};
}
