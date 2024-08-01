import express from "express";
import { userController } from "../controllers/user";
import authMiddleware from "../middlewares/auth";
import {validateRequest} from "../middlewares/validator";
import {refreshTokenSchema, userLoginSchema, userSignupSchema} from "../schemas/user";

const userRouter = express.Router();

userRouter.post("/signup", validateRequest(null, userSignupSchema), userController.signup);
userRouter.post("/login", validateRequest(null, userLoginSchema), userController.login);
userRouter.post("/refresh", validateRequest(null, refreshTokenSchema), userController.refreshToken);
userRouter.get("/dashboard", authMiddleware, userController.dashboard);

export default userRouter;
