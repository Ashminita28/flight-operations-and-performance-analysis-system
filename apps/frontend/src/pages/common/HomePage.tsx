import { Navbar1 } from "@/components/navbar1";
import { useAuthStore } from "../../store/auth-store";

export default function HomePage() {
	const user = useAuthStore(s => s.user);

	return (
		<div className="min-h-screen bg-sky-950 text-white">
			<Navbar1 />

			<div className="flex flex-col items-center justify-center h-[80vh] text-center px-6">
				<h1 className="text-5xl font-bold mb-6">
					Flight Operations Management System
				</h1>

				<p className="max-w-2xl text-lg opacity-80 mb-6">
					Manage flights, aircraft, crew and operations efficiently using Fligo
					Aviation Platform.
				</p>

				{user && (
					<p className="text-sm opacity-70">Logged in as {user.email}</p>
				)}
			</div>
		</div>
	);
}
