import {createApi} from "@reduxjs/toolkit/query/react";
import customBaseQuery from "../lib/customBaseQuery.ts";
import {DomainResponseType} from "../schemas/Create.ts";

export const domainApi = createApi({
    reducerPath: "domainApi",
    baseQuery: customBaseQuery,
    endpoints: builder => ({
        getAllDomains: builder.query<DomainResponseType, void>({
            query: () => `domain/`
        }),
        createDomain: builder.mutation<DomainResponseType, {name: string}>({
            query: (body) => ({
                url: `domain/create`,
                method: "POST",
                body,
            }),
        })
    })
});

export const {useGetAllDomainsQuery, useCreateDomainMutation} = domainApi;
