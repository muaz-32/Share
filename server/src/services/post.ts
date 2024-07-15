import {postRepository} from "../repositories/post";
import {DetailedPost, Post} from "../types";
import {voteRepository} from "../repositories/vote";
import {commentRepository} from "../repositories/comment";

const createPost = async (title: string, content: string, authorId: number, domainId: number) => {
    return postRepository.createPost({ title, content, authorId, domainId });
}

const getPostById = async (id: number): Promise<DetailedPost | null> => {
    return postRepository.getPostById(id);
}

const getAllPosts = async () => {
    let info: Post[] = [];
    const posts = await postRepository.getAllPosts();
    for (const post of posts) {
        const votes = await voteRepository.netVote(post.id);
        const comments = await commentRepository.getCommentCount(post.id);
        info.push({
            id: post.id,
            title: post.title,
            author: post.author.email,
            domain: post.domain.name,
            comments: comments,
            newVotes: votes,
        });
    }
    return info;
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
