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
import type { NavItem, NavMainProps } from "./props/nav-props";

/*NAV ITEM*/
function NavMenuItem({ title, url, icon: Icon }: NavItem) {
	const navigate = useNavigate();

	return (
		<SidebarMenuItem>
			<SidebarMenuButton
				tooltip={title}
				onClick={() => navigate(url)}
			>
				{Icon && <Icon />}
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
				className="bg-primary text-primary-foreground hover:bg-primary/90 hover:text-primary-foreground active:bg-primary/90 active:text-primary-foreground min-w-8 duration-200 ease-linear"
			>
				<IconCirclePlusFilled />
				<span>Register User</span>
			</SidebarMenuButton>

			<Button
				size="icon"
				className="size-8 group-data-[collapsible=icon]:opacity-0"
				variant="outline"
			>
				<IconMail />
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
