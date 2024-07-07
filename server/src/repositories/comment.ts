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

export const commentRepository = {
    addComment,
    getCommentById,
    updateComment,
    deleteComment,
};
