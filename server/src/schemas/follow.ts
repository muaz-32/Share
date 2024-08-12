import {z} from "zod";

export const followParamsSchema = z.object({
    id: z.string()
});

export type FollowParams = z.infer<typeof followParamsSchema>;
