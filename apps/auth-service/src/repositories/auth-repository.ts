import { UUID } from "node:crypto";
import User from "../models/user";
// import {setCache,getCache} from '../config/redis';

export const findUserByEmail = (email: string) =>
	User.findOne({ where: { email } });

export const createUser = (data: any) => User.create(data);

export const findUserById = (id: string) => User.findByPk(id);

export const findAllUsers = () => {
	User.findAll();
};
