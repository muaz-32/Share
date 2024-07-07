import { userService } from "../services/user";
import { Request, Response } from "express";
import {tokenService} from "../services/token";

const signup = async (req: Request, res: Response) => {
    const { email, password } = req.body;
    const tokens = await userService.signup(email, password);
    if (tokens) {
        res.status(200).json(tokens);
    } else {
        res.status(400).json({ message: "User already exists" });
    }
};

const login = async (req: Request, res: Response) => {
    const { email, password } = req.body;
    const tokens = await userService.login(email, password);
    if (tokens) {
        res.status(200).json(tokens);
    } else {
        res.status(401).json({ message: "Invalid email or password" });
    }
}

const refreshToken = async (req: Request, res: Response) => {
    const { token } = req.body;
    const newAccessToken = tokenService.regenerateAccessToken(token);
    if (newAccessToken) {
        res.status(200).json({ accessToken: newAccessToken });
    } else {
        res.status(403).json({ message: "Invalid refresh token" });
    }
}

const dashboard = async (req: Request, res: Response) => {
    res.status(200).json({ message: "Dashboard" });
}

export const userController = {
    signup,
    login,
    dashboard,
    refreshToken,
};
