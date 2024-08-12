import {z} from "zod";

export const AuthInputs = z.object({
    email: z.string().email(),
    password: z.string().min(3)
});

export const AuthResponse = z.object({
    accessToken: z.string(),
    refreshToken: z.string()
});

export type AuthInputsType = z.infer<typeof AuthInputs>;
