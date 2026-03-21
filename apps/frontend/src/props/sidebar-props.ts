import type { User } from "@/services/auth-service";
import type { NavItem } from "./nav-props";
import { Sidebar } from "../components/ui/sidebar";

export interface AppSidebarProps extends React.ComponentProps<typeof Sidebar> {
	user: User | null;
	navItems: NavItem[];
	isAdmin: boolean;
	onLogout: () => void;
}

export type AppSidebarContainerProps = Omit<
	AppSidebarProps,
	"user" | "navItems" | "isAdmin" | "onLogout"
>;
