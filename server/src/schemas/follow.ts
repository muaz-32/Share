import {z} from "zod";

export const followParamsSchema = z.object({
    id: z.number()
});

export type FollowParams = z.infer<typeof followParamsSchema>;
