import {domainRepository} from "../repositories/domain";

const createDomain = async (name: string) => {
    return domainRepository.createDomain({ name });
}

const getPostsByDomainId = async (id: number) => {
    return domainRepository.getPostsByDomainId(id);
}

const getDomains = async () => {
    return domainRepository.getDomains();
}

const getDomainById = async (id: number) => {
    return domainRepository.getDomainById(id);
}

const updateDomain = async (id: number, name: string) => {
    return domainRepository.updateDomain(id, { name });
}

export const domainService = {
    createDomain,
    getPostsByDomainId,
    getDomains,
    getDomainById,
    updateDomain,
};
