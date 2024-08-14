import {createApi} from "@reduxjs/toolkit/query/react";
import customBaseQuery from "../lib/customBaseQuery.ts";

export const followApi = createApi({
    reducerPath: "followApi",
    baseQuery: customBaseQuery,
    endpoints: (builder) => ({
        getIsFollowing: builder.query<boolean, string>({
            query: (id) => `follow/is-following/${id}`,
        }),
    }),
});

export const {useGetIsFollowingQuery} = followApi;
