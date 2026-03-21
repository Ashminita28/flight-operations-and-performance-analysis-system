import type { Notification } from "../types/notification-types";
export interface SiteHeaderProps {
	title: string;
	notifications: Notification[];
	isOpen: boolean;
	onToggle: () => void;
}
