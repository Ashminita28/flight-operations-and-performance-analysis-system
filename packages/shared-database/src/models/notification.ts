import { Model, DataTypes, Optional } from "sequelize";
import sequelize from "../sequelize-connection";

interface NotificationAttributes {
	id: string;
	flight_id: string;
	title: string;
	message: string;
	type: string;
	is_read: boolean;
	createdAt?: Date;
	updatedAt?: Date;
}

type NotificationCreationAttributes = Optional<
	NotificationAttributes,
	"id" | "createdAt" | "updatedAt"
>;

export class Notification
	extends Model<NotificationAttributes, NotificationCreationAttributes>
	implements NotificationAttributes
{
	declare id: string;
	declare flight_id: string;
	declare title: string;
	declare message: string;
	declare type: string;
	declare is_read: boolean;
	declare createdAt: Date;
	declare updatedAt: Date;
}

Notification.init(
	{
		id: {
			allowNull: false,
			primaryKey: true,
			type: DataTypes.UUID,
			defaultValue: DataTypes.UUIDV4,
		},
		flight_id: {
			type: DataTypes.UUID,
			allowNull: false,
		},
		title: {
			type: DataTypes.STRING(100),
			allowNull: false,
		},
		message: {
			type: DataTypes.TEXT,
			allowNull: false,
		},
		type: {
			type: DataTypes.STRING(30),
			allowNull: false,
		},
		is_read: {
			type: DataTypes.BOOLEAN,
			defaultValue: false,
		},
		createdAt: {
			allowNull: false,
			type: DataTypes.DATE,
			defaultValue: DataTypes.NOW,
		},
		updatedAt: {
			allowNull: false,
			type: DataTypes.DATE,
			defaultValue: DataTypes.NOW,
		},
	},
	{
		sequelize,
		tableName: "notifications",
		timestamps: true,
	},
);
