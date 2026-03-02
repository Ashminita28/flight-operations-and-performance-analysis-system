import * as React from "react";
import { useEffect } from "react";
import { IconChartBar, IconUsers } from "@tabler/icons-react";
import { NavMain } from "@/components/nav-main";
import { NavUser } from "@/components/nav-user";
import {
	Sidebar,
	SidebarContent,
	SidebarFooter,
	SidebarHeader,
	SidebarMenu,
	SidebarMenuButton,
	SidebarMenuItem,
} from "@/components/ui/sidebar";
import { Plane } from "lucide-react";
import { api } from "@/api/api";

const data = {
	navMain: [
		{
			title: "Manage User",
			url: "/register",
			icon: IconUsers,
		},
		{
			title: "Flights",
			url: "/flight-dashboard",
			icon: IconChartBar,
		},
		{
			title: "Aircraft",
			url: "/aircraft",
			icon: IconChartBar,
		},
		{
			title: "Analytics",
			url: "/analytics",
			icon: IconChartBar,
		},
	],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
	const [user, setUser] = React.useState<{
		name: string;
		email: string;
		avatar: string;
	} | null>(null);

	useEffect(() => {
		async function fetchUser() {
			try {
				const res = await api("/profile", {
					method: "GET",
				});
				setUser(res);
			} catch (error) {
				console.error("Failed to fetch user");
			}
		}
		fetchUser();
	}, []);

	return (
		<Sidebar
			collapsible="offcanvas"
			{...props}
		>
			<SidebarHeader>
				<SidebarMenu>
					<SidebarMenuItem>
						<SidebarMenuButton
							asChild
							className="data-[slot=sidebar-menu-button]:p-1.5!"
						>
							<a href="/">
								<Plane className="size-5!" />
								<span className="text-base font-semibold">Fligo</span>
							</a>
						</SidebarMenuButton>
					</SidebarMenuItem>
				</SidebarMenu>
			</SidebarHeader>
			<SidebarContent>
				<NavMain items={data.navMain} />
			</SidebarContent>
			<SidebarFooter>
				<NavUser user={user} />
			</SidebarFooter>
		</Sidebar>
	);
}
