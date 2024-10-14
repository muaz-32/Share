import express from "express";
import authMiddleware from "../middlewares/auth";
import {followController} from "../controllers/follow";
import {validateRequest} from "../middlewares/validator";
import {followParamsSchema} from "../schemas/follow";

const followRouter = express.Router();

followRouter.post("/follow/:id", validateRequest(followParamsSchema, null), authMiddleware, followController.follow);
followRouter.get("/followers", authMiddleware, followController.getFollowers);
followRouter.get("/followings", authMiddleware, followController.getFollowings);
followRouter.delete("/unfollow/:id", validateRequest(followParamsSchema, null), authMiddleware, followController.unfollow);
followRouter.get("/is-following/:id", validateRequest(followParamsSchema, null), authMiddleware, followController.checkIfFollowing);

export default followRouter;
