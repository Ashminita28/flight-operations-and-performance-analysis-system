"use client";

import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useAuthStore } from "../store/auth-store";

export function Navbar1() {
	const user = useAuthStore(s => s.user);
	const logout = useAuthStore(s => s.logout);
	const navigate = useNavigate();

	const handleLogout = async () => {
		await logout();
		navigate("/");
	};

	return (
		<nav className="bg-sky-950 text-white px-6 py-4 flex justify-between items-center">
			<Link
				to="/"
				className="text-xl font-bold"
			>
				Fligo
			</Link>

			<div className="flex gap-4 items-center">
				{user ? (
					<>
						<span className="text-sm">Welcome, {user.name}</span>
						<Button
							variant="outline"
							className="bg-white text-sky-950"
							onClick={handleLogout}
						>
							Logout
						</Button>
					</>
				) : (
					<>
						<Link to="/login">
							<Button
								variant="outline"
								className="bg-white text-sky-950"
							>
								Login
							</Button>
						</Link>
					</>
				)}
			</div>
		</nav>
	);
}
