import { Request, Response } from "express";
import {followService} from "../services/follow";
import {FollowParams} from "../schemas/follow";

const follow = async (req: Request<FollowParams, unknown, unknown, unknown>, res: Response) => {
    const followerId = req.userId;
    const followedId = req.params.id;
    try {
        await followService.follow(followerId, followedId);
        res.status(200).send({message: "Followed successfully"});
    } catch (error) {
        res.status(500).send(error);
    }
}

const getFollowers = async (req: Request<unknown, unknown, unknown, unknown>, res: Response) => {
    const userId = req.userId;
    try {
        const followers = await followService.getFollowers(userId);
        res.status(200).send(followers);
    } catch (error) {
        res.status(500).send(error);
    }
}

const getFollowings = async (req: Request<unknown, unknown, unknown, unknown>, res: Response) => {
    const userId = req.userId;
    try {
        const followings = await followService.getFollowings(userId);
        res.status(200).send(followings);
    } catch (error) {
        res.status(500).send(error);
    }
}

const unfollow = async (req: Request<FollowParams, unknown, unknown, unknown>, res: Response) => {
    const followerId = req.userId;
    const followedId = req.params.id;
    try {
        await followService.unfollow(followerId, followedId);
        res.status(200).send({message: "Unfollowed successfully"});
    } catch (error) {
        res.status(500).send(error);
    }
}

const checkIfFollowing = async (req: Request<FollowParams, unknown, unknown, unknown>, res: Response) => {
    const followerId = req.userId;
    const followedId = req.params.id;
    try {
        const isFollowing = await followService.checkIfFollowing(followerId, followedId);
        res.status(200).send({follow: isFollowing});
    } catch (error) {
        res.status(500).send(error);
    }
}

export const followController = {
    follow,
    getFollowers,
    getFollowings,
    unfollow,
    checkIfFollowing,
};
