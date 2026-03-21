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
import type { AppSidebarProps } from "../props/sidebar-props";

export function AppSidebar({
	user,
	navItems,
	isAdmin,
	onLogout,
	...props
}: AppSidebarProps) {
	return (
		<Sidebar
			collapsible="offcanvas"
			{...props}
		>
			<SidebarHeader>
				<SidebarMenu>
					<SidebarMenuItem>
						<SidebarMenuButton asChild>
							<Plane className="size-5" />
							<span className="text-base font-semibold">Fligo</span>
						</SidebarMenuButton>
					</SidebarMenuItem>
				</SidebarMenu>
			</SidebarHeader>

			<SidebarContent>
				<NavMain
					items={navItems}
					isAdmin={isAdmin}
				/>
			</SidebarContent>

			<SidebarFooter>
				<NavUser
					user={user}
					onLogout={onLogout}
				/>
			</SidebarFooter>
		</Sidebar>
	);
}
