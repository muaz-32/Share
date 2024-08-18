import express from "express";
import {commentController} from "../controllers/comment";
import authMiddleware from "../middlewares/auth";
import {validateRequest} from "../middlewares/validator";
import {addCommentSchema, commentCountParamsSchema, commentParamsSchema, updateCommentSchema} from "../schemas/comment";

const commentRouter = express.Router();

commentRouter.post("/add", validateRequest(null, addCommentSchema), authMiddleware, commentController.addComment);
commentRouter.put("/:id", validateRequest(commentParamsSchema, updateCommentSchema), authMiddleware, commentController.updateComment);
commentRouter.delete("/:id", validateRequest(commentParamsSchema, null), authMiddleware, commentController.deleteComment);
commentRouter.get("/count/:postId", validateRequest(commentCountParamsSchema, null), commentController.getCommentCount);

export default commentRouter;
