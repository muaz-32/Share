import {BriefPost} from "../types";
import {prisma} from "../prisma";
import {Post} from "@prisma/client";
import {DetailedPost} from "../types"

const createPost = async (post: Omit<Post, "id">): Promise<Post> => {
  return prisma.post.create({ data: post });
}

const getPostById = async (id: number): Promise<DetailedPost | null> => {
    prisma.post.findUnique({ where: { id }, include: { votes: true, comments: true, author: true, domain: true } }).then((post) => {
        if (post) {
            return post;
        }
    });
    return null;
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

const deletePost = async (id: number): Promise<Post | null> => {
    return prisma.post.delete({
        where: { id },
    });
}

export const postRepository = {
    createPost,
    getPostById,
    getAllPosts,
    updatePost,
    deletePost,
};
