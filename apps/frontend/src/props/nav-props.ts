import { type Icon } from "@tabler/icons-react";

export interface NavItem {
	title: string;
	url: string;
	icon?: Icon;
}

export interface NavMainProps {
	items: NavItem[];
	isAdmin: boolean;
}

export interface NavUserProps {
	user: { name: string; email: string } | null;
	onLogout: () => void;
}
