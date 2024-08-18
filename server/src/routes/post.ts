import express from "express";
import {postController} from "../controllers/post";
import authMiddleware from "../middlewares/auth";
import {validateRequest} from "../middlewares/validator";
import {createPostSchema, postParamsSchema, updatePostSchema} from "../schemas/post";

const postRouter = express.Router();

postRouter.post("/create", validateRequest(null, createPostSchema), authMiddleware, postController.createPost);
postRouter.get("/:id", validateRequest(postParamsSchema, null), postController.getPostById);
postRouter.get("/", postController.getAllPosts);
postRouter.put("/:id", validateRequest(postParamsSchema, updatePostSchema), authMiddleware, postController.updatePost);

export default postRouter;
