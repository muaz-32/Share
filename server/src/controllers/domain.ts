import { Request, Response } from 'express';
import {domainService} from "../services/domain";

const createDomain = async (req: Request, res: Response) => {
    const { name } = req.body;
    const domain = await domainService.createDomain(name);
    if (domain) {
        res.status(200).json(domain);
    } else {
        res.status(400).json({ message: "Domain creation failed" });
    }
}

const getPostsByDomainId = async (req: Request, res: Response) => {
    const { id } = req.params;
    const posts = await domainService.getPostsByDomainId(parseInt(id));
    if (posts) {
        res.status(200).json(posts);
    } else {
        res.status(404).json({ message: "No posts found" });
    }
}

export const domainController = {
    createDomain,
    getPostsByDomainId,
};
