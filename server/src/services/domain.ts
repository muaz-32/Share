import {domainRepository} from "../repositories/domain";

const createDomain = async (name: string) => {
    return domainRepository.createDomain({ name });
}

const getPostsByDomainId = async (id: number) => {
    return domainRepository.getPostsByDomainId(id);
}

export const domainService = {
    createDomain,
    getPostsByDomainId,
};
