import {prisma} from "../prisma";
import {Comment} from "@prisma/client";

const addComment = async (comment: Omit<Comment, "id">): Promise<Comment> => {
    return prisma.comment.create({ data: comment });
}

const getCommentById = async (id: number): Promise<Comment | null> => {
    return prisma.comment.findUnique({ where: { id } });
}

const updateComment = async (id: number, comment: Omit<Comment, "id">): Promise<Comment | null> => {
    return prisma.comment.update({
        where: { id },
        data: comment,
    });
}

const deleteComment = async (id: number): Promise<Comment | null> => {
    return prisma.comment.delete({
        where: { id },
    });
}

const getCommentCount = async (postId: number): Promise<number> => {
    return prisma.comment.count({
        where: {
            postId,
        },
    });
}

export const commentRepository = {
    addComment,
    getCommentById,
    updateComment,
    deleteComment,
    getCommentCount,
};
