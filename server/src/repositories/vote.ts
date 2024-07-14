import {prisma} from "../prisma";
import {Vote} from "@prisma/client";

const giveVote = async (vote: Omit<Vote, "id">): Promise<Vote> => {
    return prisma.vote.create({ data: vote });
}

const getVoteById = async (id: number): Promise<Vote | null> => {
    return prisma.vote.findUnique({ where: { id } });
}

const getVoteByPostIdAndUserId = async (postId: number, userId: number): Promise<Vote | null> => {
    return prisma.vote.findFirst({
        where: {
            postId: postId,
            userId: userId,
        },
    });
}

const updateVote = async (id: number, vote: Omit<Vote, "id">): Promise<Vote | null> => {
    return prisma.vote.update({
        where: { id },
        data: vote,
    });
}

const deleteVote = async (id: number): Promise<Vote | null> => {
    return prisma.vote.delete({
        where: { id },
    });
}

const getVoteCount = async (postId: number): Promise<number> => {
    return prisma.vote.count({
        where: {
            postId,
        },
    });
}

const netVote = async (postId: number): Promise<number> => {
    const upVotes = await prisma.vote.count({
        where: {
            postId: postId,
            value: true,
        },
    });

    const downVotes = await prisma.vote.count({
        where: {
            postId: postId,
            value: false,
        },
    });

    return upVotes - downVotes;
}

export const voteRepository = {
    giveVote,
    getVoteById,
    getVoteByPostIdAndUserId,
    updateVote,
    deleteVote,
    getVoteCount,
    netVote,
};
