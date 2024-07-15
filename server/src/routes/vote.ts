import express from "express";
import {voteController} from "../controllers/vote";
import authMiddleware from "../middlewares/auth";

const voteRouter = express.Router();

voteRouter.post("/give", authMiddleware, voteController.giveVote);
voteRouter.put("/", authMiddleware, voteController.updateVote);
voteRouter.delete("/", authMiddleware, voteController.deleteVote);
voteRouter.get("/count/:postId", voteController.getVoteCount);
voteRouter.get("/net/:postId", voteController.netVote);

export default voteRouter;
