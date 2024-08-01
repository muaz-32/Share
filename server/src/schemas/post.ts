import {z} from "zod";

export const createPostSchema = z.object({
    title: z.string().min(1),
    content: z.string().min(1),
    domainId: z.number(),
});

export const updatePostSchema = z.object({
    title: z.string().min(1),
    content: z.string().min(1),
    domainId: z.number(),
});

export const postParamsSchema = z.object({
    id: z.number(),
});

export type CreatePost = z.infer<typeof createPostSchema>;
export type UpdatePost = z.infer<typeof updatePostSchema>;
export type PostParams = z.infer<typeof postParamsSchema>;
