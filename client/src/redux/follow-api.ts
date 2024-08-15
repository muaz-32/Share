import {createApi} from "@reduxjs/toolkit/query/react";
import customBaseQuery from "../lib/customBaseQuery.ts";

export const followApi = createApi({
    reducerPath: "followApi",
    baseQuery: customBaseQuery,
    endpoints: (builder) => ({
        getIsFollowing: builder.query<boolean, string>({
            query: (id) => `follow/is-following/${id}`,
        }),
        follow: builder.mutation<unknown, string>({
            query: (id) => ({
                url: `follow/follow/${id}`,
                method: "POST",
            }),
        }),
        unfollow: builder.mutation<unknown, string>({
            query: (id) => ({
                url: `follow/unfollow/${id}`,
                method: "DELETE",
            }),
        })
    }),
});

export const {useGetIsFollowingQuery, useFollowMutation, useUnfollowMutation} = followApi;
