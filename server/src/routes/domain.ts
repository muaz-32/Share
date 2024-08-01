import express from "express";
import authMiddleware from "../middlewares/auth";
import {domainController} from "../controllers/domain";
import {validateRequest} from "../middlewares/validator";
import {createDomainSchema, domainParamsSchema, updateDomainSchema} from "../schemas/domain";

const domainRouter = express.Router();

domainRouter.post("/create", validateRequest(null,  createDomainSchema), authMiddleware, domainController.createDomain);
domainRouter.get("/:id/posts", validateRequest(domainParamsSchema, null), domainController.getPostsByDomainId);
domainRouter.get("/", domainController.getDomains);
domainRouter.get("/:id", validateRequest(domainParamsSchema, null), domainController.getDomainById);
domainRouter.put("/:id", validateRequest(domainParamsSchema, updateDomainSchema), authMiddleware, domainController.updateDomain);
domainRouter.delete("/:id", validateRequest(domainParamsSchema, null), authMiddleware, domainController.deleteDomain);

export default domainRouter;
