import { Request, Response } from "express";
import {postService} from "../services/post";
import {CreatePost, PostParams, UpdatePost} from "../schemas/post";

const createPost = async (req: Request<unknown, unknown, CreatePost, unknown>, res: Response) => {
    const { title, content, domainId } = req.body;
    const post = await postService.createPost(title, content, req.userId, domainId);
    if (post) {
        res.status(200).json(post);
    } else {
        res.status(400).json({ message: "Post creation failed" });
    }
}

const getPostById = async (req: Request<PostParams, unknown, unknown, unknown>, res: Response) => {
    const { id } = req.params;
    const post = await postService.getPostById(parseInt(id));
    if (post) {
        res.status(200).json(post);
    } else {
        res.status(404).json({ message: "Post not found" });
    }
}

const getAllPosts = async (req: Request<unknown, unknown, unknown, unknown>, res: Response) => {
    const posts = await postService.getAllPosts();
    if (posts) {
        res.status(200).json(posts);
    } else {
        res.status(404).json({ message: "No posts found" });
    }
}

const updatePost = async (req: Request<PostParams, unknown, UpdatePost, unknown>, res: Response) => {
    const { id } = req.params;
    const { title, content, domainId } = req.body;
    const post = await postService.updatePost(parseInt(id), title, content, domainId, req.userId);
    if (post) {
        res.status(200).json(post);
    } else {
        res.status(404).json({ message: "Post not found" });
    }
}

export const postController = {
    createPost,
    getPostById,
    getAllPosts,
    updatePost,
};
