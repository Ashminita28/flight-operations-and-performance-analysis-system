import { QueryInterface } from "sequelize";
import bcrypt from "bcrypt";
import crypto from "crypto";
import Role from "../models/role";
import Permission from "../models/permission";
import User from "../models/user";
import constants from "../utils/constants";

export default {
	async up(queryInterface: QueryInterface) {
		const roles = await Role.bulkCreate(
			[
				{ name: constants.ROLE_ADMIN },
				{ name: constants.ROLE_MANAGEMENT },
				{ name: constants.ROLE_ANALYST },
				{ name: constants.ROLE_OPERATIONS },
			],
			{ returning: true },
		);

		const permissions = await Permission.bulkCreate(
			[
				{ name: constants.PERMISSION_VIEW_ADMIN_DASHBOARD },
				{ name: constants.PERMISSION_VIEW_ALL_USERS },
			],
			{ returning: true },
		);

		const adminUser = await User.create({
			name: "Ashminita Baliarsingh",
			email: "hello@gmail.com",
			password: await bcrypt.hash("ashminit@11!", 10),
			phone: "9876543210",
		});

		const adminRole = await Role.findOne({
			where: { name: constants.ROLE_ADMIN },
		});

		if (!adminRole) {
			throw new Error("Admin role not created");
		}

		if (!adminRole) {
			throw new Error("Admin role not created");
		}

		// UserRoles insert
		await queryInterface.bulkInsert("UserRoles", [
			{
				id: crypto.randomUUID(),
				user_id: adminUser.get("id"),
				role_id: adminRole.get("id"),
			},
		]);

		// role_permissions insert
		await queryInterface.bulkInsert(
			"role_permissions",
			permissions.map(p => ({
				id: crypto.randomUUID(),
				role_id: adminRole.get("id"),
				permission_id: p.get("id"),
			})),
		);
	},

	async down(queryInterface: QueryInterface) {
		await queryInterface.bulkDelete("UserRoles", {});
		await queryInterface.bulkDelete("role_permissions", {});
		await queryInterface.bulkDelete("Users", {});
		await queryInterface.bulkDelete("Roles", {});
		await queryInterface.bulkDelete("Permissions", {});
	},
};
