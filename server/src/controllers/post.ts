import { Request, Response } from "express";
import {postService} from "../services/post";

const createPost = async (req: Request, res: Response) => {
    const { title, content, domainId } = req.body;
    const post = await postService.createPost(title, content, req.userId, domainId);
    if (post) {
        res.status(200).json(post);
    } else {
        res.status(400).json({ message: "Post creation failed" });
    }
}

const getPostById = async (req: Request, res: Response) => {
    const { id } = req.params;
    const post = await postService.getPostById(parseInt(id));
    if (post) {
        res.status(200).json(post);
    } else {
        res.status(404).json({ message: "Post not found" });
    }
}

const getAllPosts = async (req: Request, res: Response) => {
    const posts = await postService.getAllPosts();
    if (posts) {
        res.status(200).json(posts);
    } else {
        res.status(404).json({ message: "No posts found" });
    }
}

const updatePost = async (req: Request, res: Response) => {
    const { id } = req.params;
    const { title, content, domainId } = req.body;
    const post = await postService.updatePost(parseInt(id), title, content, domainId, req.userId);
    if (post) {
        res.status(200).json(post);
    } else {
        res.status(404).json({ message: "Post not found" });
    }
}

const deletePost = async (req: Request, res: Response) => {
    const { id } = req.params;
    const post = await postService.deletePost(parseInt(id), req.userId);
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
    deletePost,
};
