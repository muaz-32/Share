import express from "express";
import authMiddleware from "../middlewares/auth";
import {followController} from "../controllers/follow";

const followRouter = express.Router();

followRouter.post("/follow/:id", authMiddleware, followController.follow);
followRouter.get("/followers", authMiddleware, followController.getFollowers);
followRouter.get("/followings", authMiddleware, followController.getFollowings);
followRouter.delete("/unfollow/:id", authMiddleware, followController.unfollow);
followRouter.get("/is-following/:id", authMiddleware, followController.checkIfFollowing);

export default followRouter;
