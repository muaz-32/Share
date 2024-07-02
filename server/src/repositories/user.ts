import { PrismaClient, User } from "@prisma/client";
import {CreateUserInput} from "../types";

const prisma = new PrismaClient();

const createUser = async (data: CreateUserInput): Promise<User> => {
  return prisma.user.create({ data });
};

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
