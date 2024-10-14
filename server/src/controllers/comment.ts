import { Request, Response } from 'express';
import {commentService} from "../services/comment";
import {AddComment, CommentCountParams, CommentParams, UpdateComment} from "../schemas/comment";

const addComment = async (req: Request<unknown, unknown, AddComment, unknown>, res: Response) => {
    const { content, postId } = req.body;
    const comment = await commentService.addComment(content, postId, req.userId);
    if (comment) {
        res.status(200).json(comment);
    } else {
        res.status(400).json({ message: "Comment creation failed" });
    }
}

const updateComment = async (req: Request<CommentParams, unknown, UpdateComment, unknown>, res: Response) => {
    const { id } = req.params;
    const { content } = req.body;
    const comment = await commentService.updateComment(parseInt(id), content, req.userId);
    if (comment) {
        res.status(200).json(comment);
    } else {
        res.status(404).json({ message: "Comment not found" });
    }
}

const deleteComment = async (req: Request<CommentParams, unknown, unknown, unknown>, res: Response) => {
    const { id } = req.params;
    const comment = await commentService.deleteComment(parseInt(id), req.userId);
    if (comment) {
        res.status(200).json(comment);
    } else {
        res.status(404).json({ message: "Comment not found" });
    }
}

const getCommentCount = async (req: Request<CommentCountParams, unknown, unknown, unknown>, res: Response) => {
    const { postId } = req.params;
    const count = await commentService.getCommentCount(parseInt(postId));
    if (count) {
        res.status(200).json(count);
    } else {
        res.status(404).json({ message: "Post not found" });
    }
}

export const commentController = {
    addComment,
    updateComment,
    deleteComment,
    getCommentCount
};
