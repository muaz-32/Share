import {z} from "zod";

export const createDomainSchema = z.object({
    name: z.string().min(1).max(255),
});

export const updateDomainSchema = z.object({
    name: z.string().min(1).max(255),
});

export const domainParamsSchema = z.object({
    id: z.number(),
});

export type CreateDomain = z.infer<typeof createDomainSchema>;
export type UpdateDomain = z.infer<typeof updateDomainSchema>;
export type DomainParams = z.infer<typeof domainParamsSchema>;
