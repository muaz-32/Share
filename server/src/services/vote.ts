import {voteRepository} from "../repositories/vote";

const giveVote = async (value: boolean, postId: number, userId: number) => {
    return voteRepository.giveVote({ value, postId, userId });
}

const updateVote = async (id: number, value: boolean, postId: number, userId: number) => {
    const vote = await voteRepository.getVoteById(id);
    if (!vote) {
        return null;
    }
    if (vote.userId !== userId) {
        return null;
    }
    return voteRepository.updateVote(id, { value, postId, userId });
}

const deleteVote = async (id: number, userId: number) => {
    const vote = await voteRepository.getVoteById(id);
    if (!vote) {
        return null;
    }
    if (vote.userId !== userId) {
        return null;
    }
    return voteRepository.deleteVote(id);
}

export const voteService = {
    giveVote,
    updateVote,
    deleteVote,
};
