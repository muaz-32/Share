import {createApi} from "@reduxjs/toolkit/query/react";
import customBaseQuery from "../lib/customBaseQuery.ts";

export const voteApi = createApi({
    reducerPath: "voteApi",
    baseQuery: customBaseQuery,
    endpoints: builder => ({
        giveVote: builder.mutation<unknown, { postId: number, value: boolean }>({
            query: body => ({
                url: `vote/give`,
                method: "POST",
                body
            })
        }),
        unvote: builder.mutation<unknown, { postId: number }>({
            query: body => ({
                url: `vote/`,
                method: "DELETE",
                body
            })
        }),
        updateVote: builder.mutation<unknown, { postId: number, value: boolean }>({
            query: body => ({
                url: `vote/`,
                method: "PUT",
                body
            })
        })
    })
});

export const {useGiveVoteMutation, useUnvoteMutation, useUpdateVoteMutation} = voteApi;
