import {followRepository} from "../repositories/follow";

const follow = async (followerId: number, followedId: number) => {
    return followRepository.follow(followerId, followedId);
}

const getFollowers = async (userId: number) => {
    return followRepository.getFollowers(userId);
}

const getFollowings = async (userId: number) => {
    return followRepository.getFollowing(userId);
}

const unfollow = async (followerId: number, followedId: number) => {
    return followRepository.unfollow(followerId, followedId);
}

const checkIfFollowing = async (followerId: number, followedId: number) => {
    return followRepository.checkIfFollowing(followerId, followedId);
}

export const followService = {
    follow,
    getFollowers,
    getFollowings,
    unfollow,
    checkIfFollowing,
};
