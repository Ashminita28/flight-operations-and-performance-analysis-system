"use client";

import * as React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuthStore } from "../store/auth-store";
import {
	Sidebar,
	SidebarContent,
	SidebarFooter,
	SidebarHeader,
	SidebarRail,
} from "@/components/ui/sidebar";

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
	const user = useAuthStore(s => s.user);
	const logout = useAuthStore(s => s.logout);
	const navigate = useNavigate();

	const handleLogout = async () => {
		await logout();
		navigate("/login");
	};

	// decide dashboard route based on role
	const getDashboardRoute = () => {
		if (user?.roles?.includes("Manager")) return "/manager";
		if (user?.roles?.includes("Analyst")) return "/analyst";
		if (user?.roles?.includes("Operations")) return "/operations";
		return "/";
	};
	return (
		<Sidebar
			collapsible="icon"
			{...props}
		>
			<SidebarHeader>Fligo</SidebarHeader>
			<SidebarContent>
				{/* Dashboard */}
				<Link
					to={getDashboardRoute()}
					className="block px-4 py-2 rounded-md bg-sky-800"
				>
					Dashboard
				</Link>

				{/* Profile */}
				<Link
					to="/profile"
					className="block px-4 py-2 rounded-md bg-sky-800"
				>
					User Profile
				</Link>
			</SidebarContent>
			<SidebarFooter>
				<button
					onClick={handleLogout}
					className="w-full bg-white text-sky-950 px-4 py-2 rounded-md"
				>
					Logout
				</button>
			</SidebarFooter>
			<SidebarRail />
		</Sidebar>
	);
}
