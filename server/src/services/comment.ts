import {commentRepository} from "../repositories/comment";

const addComment = async (content: string, postId: number, authorId: number) => {
    return commentRepository.addComment({ content: content, postId: postId, authorId: authorId});
}

const updateComment = async (id: number, content: string, authorId: number) => {
    const comment = await commentRepository.getCommentById(id);
    if (!comment) {
        return null;
    }
    if (comment.authorId !== authorId) {
        return null;
    }
    return commentRepository.updateComment(id, { postId: comment.postId, authorId: comment.authorId, content: content });
}

const deleteComment = async (id: number, authorId: number) => {
    const comment = await commentRepository.getCommentById(id);
    if (!comment) {
        return null;
    }
    if (comment.authorId !== authorId) {
        return null;
    }
    return commentRepository.deleteComment(id);
}

const getCommentCount = async (postId: number) => {
    return commentRepository.getCommentCount(postId);
}

export const commentService = {
    addComment,
    updateComment,
    deleteComment,
    getCommentCount
};
