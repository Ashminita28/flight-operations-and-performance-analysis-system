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
			className="border-r border-gray-200 bg-white"
			aria-label="Main navigation"
			{...props}
		>
			<SidebarHeader className="border-b border-gray-100 px-4 py-3">
				<SidebarMenu>
					<SidebarMenuItem>
						<SidebarMenuButton
							asChild
							aria-label="Fligo home"
							className="hover:bg-transparent"
						>
							<div className="flex items-center gap-2">
								<div className="flex h-8 w-8 items-center justify-center rounded-lg bg-sky-950">
									<Plane className="size-4 text-white" />
								</div>
								<span className="text-base font-semibold text-gray-900">
									Fligo
								</span>
							</div>
						</SidebarMenuButton>
					</SidebarMenuItem>
				</SidebarMenu>
			</SidebarHeader>

			<SidebarContent className="px-2 py-2">
				<NavMain
					items={navItems}
					isAdmin={isAdmin}
				/>
			</SidebarContent>

			<SidebarFooter className="border-t border-gray-100 px-2 py-2">
				<NavUser
					user={user}
					onLogout={onLogout}
				/>
			</SidebarFooter>
		</Sidebar>
	);
}
