import { UUID } from "node:crypto";
import User from "../models/user";

// 1.check if the email already exists in the database
export const findUserByEmail = (email: string) =>
	User.findOne({ where: { email } });

export const createUser = (data: any) => User.create(data);

export const findUserById = (id: string) => User.findByPk(id);

export const findAllUsers = () => {
	User.findAll();
};

export const updateUser = (data: any) => User.destroy(data);
