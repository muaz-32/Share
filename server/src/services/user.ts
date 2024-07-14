import bcrypt from 'bcryptjs';
import { userRepository } from "../repositories/user";
import {tokenService} from "./token";

const signup = async (email: string, password: string) => {
    const user = await userRepository.getUserByEmail(email);
    if (user) {
        return null;
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await userRepository.createUser({email: email, password: hashedPassword});
    const accessToken = tokenService.generateAccessToken(newUser.id);
    const refreshToken = tokenService.generateRefreshToken(newUser.id);
    return { accessToken, refreshToken };
}

const login = async (email: string, password: string) => {
    const user = await userRepository.getUserByEmail(email);
    if (!user) {
        return null;
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
        return null;
    }
    const accessToken = tokenService.generateAccessToken(user.id);
    const refreshToken = tokenService.generateRefreshToken(user.id);
    return { accessToken, refreshToken };
}

const getUserEmailById = async (id: number) => {
    const user = await userRepository.getUserById(id);
    if (!user) {
        return null;
    }
    return user.email;
}

export const userService = {
    signup,
    login,
    getUserEmailById,
};
