import express from "express";
import {postController} from "../controllers/post";
import authMiddleware from "../middlewares/auth";

const postRouter = express.Router();

postRouter.post("/create", authMiddleware, postController.createPost);
postRouter.get("/:id", postController.getPostById);
postRouter.get("/", postController.getAllPosts);
postRouter.put("/:id", authMiddleware, postController.updatePost);
postRouter.delete("/:id", authMiddleware, postController.deletePost);

export default postRouter;
