import {z} from "zod";

export const userSignupSchema = z.object({
    email: z.string().email(),
    password: z.string().min(3),
});

export const userLoginSchema = z.object({
    email: z.string().email(),
    password: z.string().min(3),
});

export const refreshTokenSchema = z.object({
    token: z.string(),
});

export type Signup = z.infer<typeof userSignupSchema>;
export type Login = z.infer<typeof userLoginSchema>;
export type RefreshToken = z.infer<typeof refreshTokenSchema>;
