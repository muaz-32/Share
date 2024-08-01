import {z} from "zod";

export const addCommentSchema = z.object({
    content: z.string(),
    postId: z.number()
});

export const updateCommentSchema = z.object({
    content: z.string()
});

export const commentParamsSchema = z.object({
    id: z.number()
});

export const commentCountParamsSchema = z.object({
    postId: z.number()
})

export type AddComment = z.infer<typeof addCommentSchema>;
export type UpdateComment = z.infer<typeof updateCommentSchema>;
export type CommentParams = z.infer<typeof commentParamsSchema>;
export type CommentCountParams = z.infer<typeof commentCountParamsSchema>;
