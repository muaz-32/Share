import {z} from "zod";

export const PostResponse = z.object({
    id: z.number(),
    title: z.string(),
    content: z.string(),
    author: z.object({
        id: z.number(),
        email: z.string(),
    }),
    votes: z.array(z.object({
        id: z.number(),
        value: z.boolean(),
        postId: z.number(),
        userId: z.number(),
    })),
    comments: z.array(z.object({
        id: z.number(),
        content: z.string(),
        authorId: z.number(),
        postId: z.number(),
    })),
    domain: z.object({
        id: z.number(),
        name: z.string(),
    }),
});

export type PostResponseType = z.infer<typeof PostResponse>;
