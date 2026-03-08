import { Notification } from "@package/shared-database";

export const notificationRepository = {
	async findAll() {
		return Notification.findAll({
			order: [["createdAt", "DESC"]],
		});
	},

	async markAsRead(id: string) {
		return Notification.update({ is_read: true }, { where: { id } });
	},
};
