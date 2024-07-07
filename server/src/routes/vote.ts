import express from "express";
import {voteController} from "../controllers/vote";
import authMiddleware from "../middlewares/auth";

const voteRouter = express.Router();

voteRouter.post("/give", authMiddleware, voteController.giveVote);
voteRouter.put("/:id", authMiddleware, voteController.updateVote);
voteRouter.delete("/:id", authMiddleware, voteController.deleteVote);

export default voteRouter;
