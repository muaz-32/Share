import {prisma} from "../prisma";

const follow = async (followerId: number, followedId: number) => {
    return prisma.follow.create({
        data: {
            followerId: followerId,
            followedId: followedId,
        },
    });
}

const getFollowers = async (userId: number) => {
    return prisma.follow.findMany({
        where: {
            followedId: userId,
        },
    });
}

const getFollowing = async (userId: number) => {
    return prisma.follow.findMany({
        where: {
            followerId: userId,
        },
    });
}
const unfollow = async (followerId: number, followedId: number) => {
    return prisma.follow.deleteMany({
        where: {
            followerId: followerId,
            followedId: followedId,
        },
    });
}

export const followRepository = {
    follow,
    getFollowers,
    getFollowing,
    unfollow,
};
