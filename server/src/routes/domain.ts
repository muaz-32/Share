import express from "express";
import authMiddleware from "../middlewares/auth";
import {domainController} from "../controllers/domain";

const domainRouter = express.Router();

domainRouter.post("/create", authMiddleware, domainController.createDomain);
domainRouter.get("/:id/posts", domainController.getPostsByDomainId);

export default domainRouter;
