import express from "express";
import {commentController} from "../controllers/comment";
import authMiddleware from "../middlewares/auth";

const commentRouter = express.Router();

commentRouter.post("/add", authMiddleware, commentController.addComment);
commentRouter.put("/:id", authMiddleware, commentController.updateComment);
commentRouter.delete("/:id", authMiddleware, commentController.deleteComment);
commentRouter.get("/count/:postId", commentController.getCommentCount);

export default commentRouter;
