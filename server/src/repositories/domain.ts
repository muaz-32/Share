import {prisma} from "../prisma";
import {Domain} from "@prisma/client";

const createDomain = async (domain: Omit<Domain, "id">): Promise<Domain> => {
    return prisma.domain.create({ data: domain });
}

const getPostsByDomainId = async (id: number) => {
    return prisma.domain.findUnique({ where: { id }, include: { posts: true } });
}

const getDomains = async () => {
    return prisma.domain.findMany();
}

const getDomainById = async (id: number) => {
    return prisma.domain.findUnique({ where: { id } });
}

const updateDomain = async (id: number, domain: Omit<Domain, "id">) => {
    return prisma.domain.update({ where: { id }, data: domain });
}

const deleteDomain = async (id: number) => {
    return prisma.domain.delete({ where: { id } });
}

export const domainRepository = {
    createDomain,
    getPostsByDomainId,
    getDomains,
    getDomainById,
    updateDomain,
    deleteDomain,
}
