import {z} from "zod";

export const AllPostsResponse = z.array(z.object({
    id: z.number(),
    title: z.string(),
    author: z.string(),
    domain: z.string(),
    comments: z.number(),
    newVotes: z.number(),
}));

export type AllPostsResponseType = z.infer<typeof AllPostsResponse>;
