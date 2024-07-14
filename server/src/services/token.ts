import jwt from 'jsonwebtoken';
import {AuthJwtPayload} from "../types";

const ACCESS_TOKEN_SECRET = 'your-access-token-secret';
const REFRESH_TOKEN_SECRET = 'your-refresh-token-secret';

const generateAccessToken = (userId: number) => {
    return jwt.sign({ userId }, ACCESS_TOKEN_SECRET, { expiresIn: '15m' });
}

const generateRefreshToken = (userId: number) => {
    return jwt.sign({ userId }, REFRESH_TOKEN_SECRET, { expiresIn: '60m' });
}

const verifyAccessToken = (token: string) => {
    try {
        return jwt.verify(token, ACCESS_TOKEN_SECRET);
    } catch {
        return null;
    }
}

const verifyRefreshToken = (token: string) => {
    try {
        return jwt.verify(token, REFRESH_TOKEN_SECRET);
    } catch {
        return null;
    }
}

const regenerateAccessToken = (token: string) => {
    const decoded = verifyRefreshToken(token) as AuthJwtPayload;
    if (!decoded) {
        return null;
    }
    return generateAccessToken(decoded.userId);
}

export const tokenService = {
    generateAccessToken,
    generateRefreshToken,
    verifyAccessToken,
    verifyRefreshToken,
    regenerateAccessToken,
};
