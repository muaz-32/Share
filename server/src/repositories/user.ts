import { User } from "@prisma/client";
import {prisma} from "../prisma";

const createUser = async (data: Omit<User, "id">): Promise<User> => {
  return prisma.user.create({ data });
}

const getUserByEmail = async (email: string): Promise<User | null> => {
  return prisma.user.findUnique({ where: { email } });
}

const getUserById = async (id: number): Promise<User | null> => {
    return prisma.user.findUnique({ where: { id } });
}

export const userRepository = {
    createUser,
    getUserByEmail,
    getUserById,
};
