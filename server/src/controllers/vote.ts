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
    const { id } = req.params;
    const { postId, value } = req.body;
    const vote = await voteService.updateVote(parseInt(id), value, postId, req.userId);
    if (vote) {
        res.status(200).json(vote);
    } else {
        res.status(404).json({ message: "Vote not found" });
    }
}

const deleteVote = async (req: Request, res: Response) => {
    const { id } = req.params;
    const vote = await voteService.deleteVote(parseInt(id), req.userId);
    if (vote) {
        res.status(200).json(vote);
    } else {
        res.status(404).json({ message: "Vote not found" });
    }
}

export const voteController = {
    giveVote,
    updateVote,
    deleteVote,
};
