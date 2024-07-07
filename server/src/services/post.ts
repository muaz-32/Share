import {postRepository} from "../repositories/post";
import {DetailedPost} from "../types";

const createPost = async (title: string, content: string, authorId: number, domainId: number) => {
    return postRepository.createPost({ title, content, authorId, domainId });
}

const getPostById = async (id: number): Promise<DetailedPost | null> => {
    return await postRepository.getPostById(id);
}

const getAllPosts = async () => {
    return postRepository.getAllPosts();
}

const updatePost = async (id: number, title: string, content: string, domainId: number, userId: number) => {
    const post = await postRepository.getPostById(id);
    if (!post) {
        return null;
    }
    if (post.author.id !== userId) {
        return null;
    }
    return postRepository.updatePost(id, { title: title,  content: content, domainId: domainId, authorId: userId });
}

const deletePost = async (id: number, userId: number) => {
    const post = await postRepository.getPostById(id);
    if (!post) {
        return null;
    }
    if (post.author.id !== userId) {
        return null;
    }
    return postRepository.deletePost(id);
}

export const postService = {
    createPost,
    getPostById,
    getAllPosts,
    updatePost,
    deletePost,
};
