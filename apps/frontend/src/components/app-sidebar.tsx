import {
	Sidebar,
	SidebarHeader,
	SidebarContent,
	SidebarFooter,
	SidebarMenu,
	SidebarMenuItem,
	SidebarMenuButton,
} from "@/components/ui/sidebar";
import { Plane } from "lucide-react";
import { NavMain } from "@/components/nav-main";
import { NavUser } from "@/components/nav-user";
import { useAuthStore } from "@/store/auth-store";

export function AppSidebar(props: React.ComponentProps<typeof Sidebar>) {
	const user = useAuthStore(s => s.user);

	const navItems = [
		{
			title: "Profile",
			url: "/profile",
			roles: ["Admin", "Manager", "Operations", "Analyst"],
		},
		{ title: "Manage User", url: "/register", roles: ["Admin"] },
		{
			title: "Flights",
			url: "/flight-dashboard",
			roles: ["Admin", "Operations"],
		},
		{ title: "Aircraft", url: "/aircraft", roles: ["Admin", "Operations"] },
		{ title: "Analytics", url: "/analytics", roles: ["Admin", "Analyst"] },
		{ title: "Reports", url: "/reports", roles: ["Admin", "Manager"] },
	];

	const filteredNav = navItems.filter(item =>
		user?.roles?.some(role => item.roles.includes(role)),
	);

	return (
		<Sidebar
			collapsible="offcanvas"
			{...props}
		>
			<SidebarHeader>
				<SidebarMenu>
					<SidebarMenuItem>
						<SidebarMenuButton asChild>
							<a href="/">
								<Plane className="size-5" />
								<span className="text-base font-semibold">Fligo</span>
							</a>
						</SidebarMenuButton>
					</SidebarMenuItem>
				</SidebarMenu>
			</SidebarHeader>

			<SidebarContent>
				<NavMain items={filteredNav} />
			</SidebarContent>

			<SidebarFooter>
				<NavUser user={user} />
			</SidebarFooter>
		</Sidebar>
	);
}
