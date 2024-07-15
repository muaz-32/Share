import { Request, Response } from "express";
import {voteService} from "../services/vote";

const giveVote = async (req: Request, res: Response) => {
    const { postId, value } = req.body;
    const vote = await voteService.giveVote(value, postId, req.userId);
    if (vote) {
        res.status(200).json(vote);
    } else {
        res.status(400).json({ message: "Vote failed" });
    }
}

const updateVote = async (req: Request, res: Response) => {
    const { postId, value } = req.body;
    const vote = await voteService.updateVote(postId, value, req.userId);
    if (vote) {
        res.status(200).json(vote);
    } else {
        res.status(404).json({ message: "Vote not found" });
    }
}

const deleteVote = async (req: Request, res: Response) => {
    const { postId } = req.body;
    const vote = await voteService.deleteVote(postId, req.userId);
    if (vote) {
        res.status(200).json(vote);
    } else {
        res.status(404).json({ message: "Vote not found" });
    }
}

const getVoteCount = async (req: Request, res: Response) => {
    const { postId } = req.params;
    const count = await voteService.getVoteCount(parseInt(postId));
    if (count) {
        res.status(200).json(count);
    } else {
        res.status(404).json({ message: "Post not found" });
    }
}

const netVote = async (req: Request, res: Response) => {
    const {postId} = req.params;
    const net = await voteService.netVote(parseInt(postId));
    if (net) {
        res.status(200).json(net);
    } else {
        res.status(404).json({message: "Post not found"});
    }
}

export const voteController = {
    giveVote,
    updateVote,
    deleteVote,
    getVoteCount,
    netVote
};
