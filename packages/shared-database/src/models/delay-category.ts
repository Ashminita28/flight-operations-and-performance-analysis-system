import { Model, DataTypes, Optional } from "sequelize";
import sequelize from "../sequelize-connection";

interface DelayCategoryAttributes {
	id: string;
	code: string;
	name: string;
	iata_code: string;
	description: string;
	is_controllable: boolean;
	createdAt?: Date;
	updatedAt?: Date;
}

type DelayCategoryCreationAttributes = Optional<
	DelayCategoryAttributes,
	"id" | "createdAt" | "updatedAt"
>;

export class DelayCategory
	extends Model<DelayCategoryAttributes, DelayCategoryCreationAttributes>
	implements DelayCategoryAttributes
{
	declare id: string;
	declare code: string;
	declare name: string;
	declare iata_code: string;
	declare description: string;
	declare is_controllable: boolean;
	declare createdAt: Date;
	declare updatedAt: Date;
}

DelayCategory.init(
	{
		id: {
			type: DataTypes.UUID,
			allowNull: false,
			primaryKey: true,
			defaultValue: DataTypes.UUIDV4,
		},
		code: {
			type: DataTypes.STRING(10),
			unique: true,
			allowNull: false,
		},
		name: {
			type: DataTypes.STRING(100),
			allowNull: false,
		},
		iata_code: {
			type: DataTypes.STRING(5),
		},
		description: {
			type: DataTypes.TEXT,
		},
		is_controllable: {
			type: DataTypes.BOOLEAN,
			allowNull: false,
		},
	},
	{
		sequelize,
		tableName: "delay_categories",
		timestamps: true,
	},
);
