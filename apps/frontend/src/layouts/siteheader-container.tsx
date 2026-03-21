import { useEffect, useState, useCallback } from "react";
import { SiteHeader } from "@/components/site-header";
import { useNotificationStore } from "@/store/notification-store";

export function SiteHeaderContainer() {
	const { notifications, fetchNotifications } = useNotificationStore();

	const [open, setOpen] = useState(false);

	useEffect(() => {
		fetchNotifications();
	}, [fetchNotifications]);

	const handleToggle = useCallback(() => {
		setOpen(prev => !prev);
	}, []);

	return (
		<SiteHeader
			title="DASHBOARD"
			notifications={notifications}
			isOpen={open}
			onToggle={handleToggle}
		/>
	);
}
