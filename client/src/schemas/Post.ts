import {z} from "zod";

export const PostResponse = z.object({
    id: z.string(),
    title: z.string(),
    content: z.string(),
    author: z.object({
        id: z.string(),
        email: z.string(),
    }),
    votes: z.array(z.object({
        id: z.string(),
        value: z.boolean(),
        postId: z.string(),
        userId: z.number(),
    })),
    comments: z.array(z.object({
        id: z.string(),
        content: z.string(),
        authorId: z.string(),
        postId: z.string(),
    })),
    domain: z.object({
        id: z.string(),
        name: z.string(),
    }),
});

export type PostResponseType = z.infer<typeof PostResponse>;
