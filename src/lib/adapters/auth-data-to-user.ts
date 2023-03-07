import type { AuthDataResponse, User } from '~/types';

export function authDataToUser(data: AuthDataResponse): User {
	return {
		id: data.user_id,
		username: data.username,
		email: data.email,
		avatar: data.avatar
	};
}
