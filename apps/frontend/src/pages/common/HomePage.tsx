import { Navbar1 } from "@/components/navbar1";
import { useAuthStore } from "../../store/auth-store";

export default function HomePage() {
	const user = useAuthStore(s => s.user);

	return (
		<div className="min-h-screen bg-sky-950 text-white">
			<Navbar1 />

			<div className="flex flex-col items-center justify-center mt-32 text-center px-6">
				<h1 className="text-5xl font-bold mb-6">Welcome to Fligo</h1>

				<p className="text-lg opacity-80">
					Your Complete Flight Management System
				</p>

				{user && <p className="mt-4 text-sm">Logged in as: {user.email}</p>}
			</div>
		</div>
	);
}
