export const AuthService = {
	signUp,
	signIn,
	logout
};

async function signIn(credentials: { email: string; password: string }) {
	console.log('antes');
	const response = await fetch('http://localhost:5173/sign-in', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify(credentials)
	});

	if (response.statusText === 'Unauthorized') {
		const { error } = await response.json();
		throw new Error(error);
	}

	const { user } = await response.json();

	return user;
}

async function logout() {
	const response = await fetch('http://localhost:5173/api/logout');

	if (response.ok) {
		localStorage.removeItem('user');
	}
}

async function signUp(data: {
	username: string;
	email: string;
	password: string;
	confirmPassword: string;
}) {
	const response = await fetch('http://localhost:5173/sign-up', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify(data)
	});

	if (response.statusText === 'Unauthorized') {
		const { error } = await response.json();
		throw new Error(error);
	}

	const { user } = await response.json();

	return user;
}

async function getUser() {
	const response = await fetch('http://localhost:5173/');

	if (response.ok) {
		const { user } = await response.json();

		return user;
	}
}
