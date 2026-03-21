import { useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "@/store/auth-store";
import { AppSidebar } from "../components/app-sidebar";
import { navItems } from "../types/sidebar-type";
import type { AppSidebarContainerProps } from "@/props/sidebar-props";

export function AppSidebarContainer(props: AppSidebarContainerProps) {
	const navigate = useNavigate();

	const user = useAuthStore(s => s.user);
	const logout = useAuthStore(s => s.logout);

	const roles = user?.roles ?? [];

	const filteredNav = navItems.filter(item =>
		item.roles.some(role => roles.includes(role)),
	);

	const isAdmin = user?.roles?.includes("Admin") ?? false;

	const handleLogout = useCallback(async () => {
		await logout();
		navigate("/login");
	}, [logout, navigate]);

	return (
		<AppSidebar
			{...props}
			user={user}
			navItems={filteredNav}
			isAdmin={isAdmin}
			onLogout={handleLogout}
		/>
	);
}
