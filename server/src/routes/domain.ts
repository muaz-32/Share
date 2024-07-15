import express from "express";
import authMiddleware from "../middlewares/auth";
import {domainController} from "../controllers/domain";

const domainRouter = express.Router();

domainRouter.post("/create", authMiddleware, domainController.createDomain);
domainRouter.get("/:id/posts", domainController.getPostsByDomainId);
domainRouter.get("/", domainController.getDomains);
domainRouter.get("/:id", domainController.getDomainById);
domainRouter.put("/:id", authMiddleware, domainController.updateDomain);
domainRouter.delete("/:id", authMiddleware, domainController.deleteDomain);

export default domainRouter;
