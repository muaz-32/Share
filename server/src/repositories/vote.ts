import {prisma} from "../prisma";
import {Vote} from "@prisma/client";

const giveVote = async (vote: Omit<Vote, "id">): Promise<Vote> => {
    return prisma.vote.create({ data: vote });
}

const getVoteById = async (id: number): Promise<Vote | null> => {
    return prisma.vote.findUnique({ where: { id } });
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

export const voteRepository = {
    giveVote,
    getVoteById,
    updateVote,
    deleteVote,
};
