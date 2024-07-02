import express from "express";
import { userController } from "../controllers/user";
import authMiddleware from "../middlewares/auth";

const userRouter = express.Router();

userRouter.post("/signup", userController.signup);
userRouter.post("/login", userController.login);
userRouter.post("/refresh", userController.refreshToken);
userRouter.get("/dashboard", authMiddleware, userController.dashboard);

export default userRouter;
