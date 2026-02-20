import { useAuthStore } from "../../store/auth-store";

export default function Profile() {
	const user = useAuthStore(s => s.user);

	if (!user) return null;

	return (
		<div className="p-6">
			<h1 className="text-2xl font-bold text-sky-950 mb-6">User Profile</h1>

			<div className="bg-white rounded-xl p-6 shadow-md space-y-4">
				<p>
					<strong>Name:</strong> {user.name}
				</p>
				<p>
					<strong>Email:</strong> {user.email}
				</p>
				<p>
					<strong>Roles:</strong> {user.roles?.join(", ")}
				</p>
			</div>
		</div>
	);
}
