import jwt from "jsonwebtoken";

type User = {
	id: number;
	email: string;
	password: string;
};

const users: User[] = [];
const tokens: string[] = [];
const SECRET = "secret";

// REGISTER
export async function registerUser(email: string, password: string) {
	const exists = users.find(u => u.email === email);
	if (exists) throw new Error("User already exists");

	const user: User = {
		id: Date.now(),
		email,
		password,
	};

	users.push(user);

	return { id: user.id, email: user.email };
}

// LOGIN
export async function loginUser(email: string, password: string) {
	const user = users.find(u => u.email === email && u.password === password);
	if (!user) throw new Error("Invalid credentials");

	const token = jwt.sign({ email: user.email }, SECRET);

	return token;
}

// VERIFY TOKEN
export function verifyToken(token: string): any {
	if (tokens.includes(token)) {
		throw new Error("Token invalid");
	}
	return jwt.verify(token, SECRET);
}

// LOGOUT
export function logoutUser(token: string): boolean {
	tokens.push(token);
	return true;
}
