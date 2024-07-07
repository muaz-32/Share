import { Request, Response } from "express";
import {followService} from "../services/follow";

const follow = async (req: Request, res: Response) => {
    const followerId = req.userId;
    const followedId = req.params.id;
    try {
        await followService.follow(followerId, parseInt(followedId));
        res.status(200).send("Followed successfully");
    } catch (error) {
        res.status(500).send(error);
    }
}

const getFollowers = async (req: Request, res: Response) => {
    const userId = req.userId;
    try {
        const followers = await followService.getFollowers(userId);
        res.status(200).send(followers);
    } catch (error) {
        res.status(500).send(error);
    }
}

const getFollowings = async (req: Request, res: Response) => {
    const userId = req.userId;
    try {
        const followings = await followService.getFollowings(userId);
        res.status(200).send(followings);
    } catch (error) {
        res.status(500).send(error);
    }
}

const unfollow = async (req: Request, res: Response) => {
    const followerId = req.userId;
    const followedId = req.params.id;
    try {
        await followService.unfollow(followerId, parseInt(followedId));
        res.status(200).send("Unfollowed successfully");
    } catch (error) {
        res.status(500).send(error);
    }
}

export const followController = {
    follow,
    getFollowers,
    getFollowings,
    unfollow,
};
