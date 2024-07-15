import {voteRepository} from "../repositories/vote";

const giveVote = async (value: boolean, postId: number, userId: number) => {
    return voteRepository.giveVote({ value, postId, userId });
}

const updateVote = async (postId: number, value: boolean, userId: number) => {
    const vote = await voteRepository.getVoteByPostIdAndUserId(postId, userId);
    if (!vote) {
        return null;
    }
    return voteRepository.updateVote(vote.id, { value: value, postId: postId, userId: userId });
}

const deleteVote = async (postId: number, userId: number) => {
    const vote = await voteRepository.getVoteByPostIdAndUserId(postId, userId);
    if (!vote) {
        return null;
    }
    return voteRepository.deleteVote(vote.id);
}

const getVoteCount = async (postId: number) => {
    return voteRepository.getVoteCount(postId);
}

const netVote = async (postId: number) => {
    return voteRepository.netVote(postId);
}

export const voteService = {
    giveVote,
    updateVote,
    deleteVote,
    getVoteCount,
    netVote,
};
