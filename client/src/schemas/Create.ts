import {z} from "zod";

export const DomainResponse = z.array(z.object({
    id: z.number(),
    name: z.string(),
}));

export type DomainResponseType = z.infer<typeof DomainResponse>;
