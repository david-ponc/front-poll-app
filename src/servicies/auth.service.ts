async function signIn(credentials: { email: string; password: string }) {
	const response = await fetch('http://localhost:5173/sign-in', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify(credentials)
	});

	const { user } = await response.json();

	return user;
}

async function logout() {
	const response = await fetch('http://localhost:5173/api/logout');

	if (response.ok) {
		localStorage.removeItem('user');
	}
}

export const AuthService = {
	signIn,
	logout
};
