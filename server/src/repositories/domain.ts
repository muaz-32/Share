import {prisma} from "../prisma";
import {Domain} from "@prisma/client";

const createDomain = async (domain: Omit<Domain, "id">): Promise<Domain> => {
    return prisma.domain.create({ data: domain });
}

const getPostsByDomainId = async (id: number) => {
    return prisma.domain.findUnique({ where: { id }, include: { posts: true } });
}

export const domainRepository = {
    createDomain,
    getPostsByDomainId,
}
