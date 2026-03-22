import { IconCirclePlusFilled, IconMail } from "@tabler/icons-react";
import { Button } from "@/components/ui/button";
import {
	SidebarGroup,
	SidebarGroupContent,
	SidebarMenu,
	SidebarMenuButton,
	SidebarMenuItem,
} from "@/components/ui/sidebar";
import { useNavigate } from "react-router-dom";
import type { NavItem, NavMainProps } from "../props/nav-props";

/*NAV ITEM*/
function NavMenuItem({ title, url, icon: Icon }: NavItem) {
	const navigate = useNavigate();

	return (
		<SidebarMenuItem>
			<SidebarMenuButton
				tooltip={title}
				onClick={() => navigate(url)}
				aria-label={`Navigate to ${title}`}
				className="text-sm text-gray-700 hover:bg-sky-50 hover:text-sky-950 transition-colors"
			>
				{Icon && <Icon className="size-4 text-gray-500" />}
				<span>{title}</span>
			</SidebarMenuButton>
		</SidebarMenuItem>
	);
}

/*ADMIN ITEM*/
function AdminMenuItem() {
	const navigate = useNavigate();
	return (
		<SidebarMenuItem className="flex items-center gap-2">
			<SidebarMenuButton
				onClick={() => navigate("/register")}
				tooltip="Quick Create"
				aria-label="Register new user"
				className="bg-sky-950 text-white hover:bg-sky-900 hover:text-white active:bg-sky-900 active:text-white min-w-8 duration-200 ease-linear text-sm font-medium"
			>
				<IconCirclePlusFilled className="size 4" />
				<span>Register User</span>
			</SidebarMenuButton>

			<Button
				size="icon"
				className="size-8 group-data-[collapsible=icon]:opacity-0 border-gray-200 text-gray-600 hover:bg-gray-50"
				variant="outline"
				aria-label="Inbox"
			>
				<IconMail className="size-4" />
				<span className="sr-only">Inbox</span>
			</Button>
		</SidebarMenuItem>
	);
}

/*MAIN*/
export function NavMain({ items, isAdmin }: NavMainProps) {
	return (
		<SidebarGroup>
			<SidebarGroupContent className="flex flex-col gap-2">
				{isAdmin && (
					<SidebarMenu>
						<AdminMenuItem />
					</SidebarMenu>
				)}

				<SidebarMenu>
					{items.map(item => (
						<NavMenuItem
							key={item.title}
							title={item.title}
							url={item.url}
							icon={item.icon}
						/>
					))}
				</SidebarMenu>
			</SidebarGroupContent>
		</SidebarGroup>
	);
}
