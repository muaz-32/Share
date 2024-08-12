import { Request, Response } from 'express';
import {domainService} from "../services/domain";
import {CreateDomain, DomainParams, UpdateDomain} from "../schemas/domain";

const createDomain = async (req: Request<unknown, unknown, CreateDomain, unknown>, res: Response) => {
    const { name } = req.body;
    const domain = await domainService.createDomain(name);
    if (domain) {
        res.status(200).json(domain);
    } else {
        res.status(400).json({ message: "Domain creation failed" });
    }
}

const getPostsByDomainId = async (req: Request<DomainParams, unknown, unknown, unknown>, res: Response) => {
    const { id } = req.params;
    const posts = await domainService.getPostsByDomainId(parseInt(id));
    if (posts) {
        res.status(200).json(posts);
    } else {
        res.status(404).json({ message: "No posts found" });
    }
}

const getDomains = async (req: Request<unknown, unknown, unknown, unknown>, res: Response) => {
    const domains = await domainService.getDomains();
    if (domains) {
        res.status(200).json(domains);
    } else {
        res.status(404).json({ message: "No domains found" });
    }
}

const getDomainById = async (req: Request<DomainParams, unknown, unknown, unknown>, res: Response) => {
    const { id } = req.params;
    const domain = await domainService.getDomainById(parseInt(id));
    if (domain) {
        res.status(200).json(domain);
    } else {
        res.status(404).json({ message: "Domain not found" });
    }
}

const updateDomain = async (req: Request<DomainParams, unknown, UpdateDomain, unknown>, res: Response) => {
    const { id } = req.params;
    const { name } = req.body;
    const domain = await domainService.updateDomain(parseInt(id), name);
    if (domain) {
        res.status(200).json(domain);
    } else {
        res.status(400).json({ message: "Domain update failed" });
    }
}

const deleteDomain = async (req: Request<DomainParams, unknown, unknown, unknown>, res: Response) => {
    const { id } = req.params;
    const domain = await domainService.deleteDomain(parseInt(id));
    if (domain) {
        res.status(200).json(domain);
    } else {
        res.status(400).json({ message: "Domain deletion failed" });
    }
}

export const domainController = {
    createDomain,
    getPostsByDomainId,
    getDomains,
    getDomainById,
    updateDomain,
    deleteDomain,
};
