import { Notification } from "@package/shared-database";

export async function getAllNotifications() {
	return Notification.findAll({ order: [["createdAt", "DESC"]] });
}

export async function markAsRead(id: string) {
	return Notification.update({ is_read: true }, { where: { id } });
}
