import express from "express";
import {voteController} from "../controllers/vote";
import authMiddleware from "../middlewares/auth";
import {validateRequest} from "../middlewares/validator";
import {deleteVoteSchema, giveVoteSchema, updateVoteSchema, voteParamsSchema} from "../schemas/vote";

const voteRouter = express.Router();

voteRouter.post("/give", validateRequest(null,  giveVoteSchema), authMiddleware, voteController.giveVote);
voteRouter.put("/", validateRequest(null, updateVoteSchema), authMiddleware, voteController.updateVote);
voteRouter.delete("/", validateRequest(null,  deleteVoteSchema), authMiddleware, voteController.deleteVote);
voteRouter.get("/count/:postId", validateRequest(voteParamsSchema, null), voteController.getVoteCount);
voteRouter.get("/net/:postId", validateRequest(voteParamsSchema, null), voteController.netVote);

export default voteRouter;
