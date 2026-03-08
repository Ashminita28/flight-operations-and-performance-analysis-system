import { notificationRepository } from "../repositories/notification-repository";

export const notificationService = {
	async getAllNotifications() {
		return notificationRepository.findAll();
	},

	async markAsRead(id: string) {
		return notificationRepository.markAsRead(id);
	},
};
