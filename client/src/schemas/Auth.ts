import {z} from "zod";

export const AuthInputs = z.object({
    email: z.string().email(),
    password: z.string().min(6)
});

export const AuthResponse = z.object({
    accessToken: z.string(),
    refreshToken: z.string()
});

export const TokenValidationResponse = z.object({
    message: z.string()
});

export type AuthInputsType = z.infer<typeof AuthInputs>;
export type AuthResponseType = z.infer<typeof AuthResponse>;
export type TokenValidationResponseType = z.infer<typeof TokenValidationResponse>;
