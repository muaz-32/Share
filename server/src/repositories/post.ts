import {BriefPost} from "../types";
import {prisma} from "../prisma";
import {Post} from "@prisma/client";
import {DetailedPost} from "../types"

const createPost = async (post: Omit<Post, "id">): Promise<Post> => {
  return prisma.post.create({ data: post });
}

const getPostById = async (id: number)  => {
    const post = await prisma.post.findUnique({ where: { id }, include: { votes: true, comments: true, author: true, domain: true } });
    if (!post) return null;
    return {
        id: post.id,
        title: post.title,
        content: post.content,
        comments: post.comments,
        author: post.author,
        votes: post.votes,
        domain: post.domain,
    };
}

const getAllPosts = async (): Promise<BriefPost[]> => {
    return prisma.post.findMany({
        select: {
            id: true,
            title: true,
            author: true,
            domain: true,
        },
    });
}

const updatePost = async (id: number, post: Omit<Post, "id">): Promise<Post | null> => {
    return prisma.post.update({
        where: { id },
        data: post,
    });
}

export const postRepository = {
    createPost,
    getPostById,
    getAllPosts,
    updatePost,
};
