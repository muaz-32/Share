import {z} from "zod";

export const giveVoteSchema = z.object({
    postId: z.number(),
    value: z.boolean(),
});

export const updateVoteSchema = z.object({
    postId: z.number(),
    value: z.boolean(),
});

export const deleteVoteSchema = z.object({
    postId: z.number(),
});

export const voteParamsSchema = z.object({
    postId: z.string(),
});

export type GiveVote = z.infer<typeof giveVoteSchema>;
export type UpdateVote = z.infer<typeof updateVoteSchema>;
export type DeleteVote = z.infer<typeof deleteVoteSchema>;
export type VoteParams = z.infer<typeof voteParamsSchema>;
