import {createApi} from "@reduxjs/toolkit/query/react";
import customBaseQuery from "../lib/customBaseQuery.ts";

export const commentApi = createApi({
    reducerPath: "commentApi",
    baseQuery: customBaseQuery,
    endpoints: builder => ({
        postComment: builder.mutation<unknown, { postId: number, content: string }>({
            query: body => ({
                url: `comment/add`,
                method: "POST",
                body
            })
        })
    })
});

export const {usePostCommentMutation} = commentApi;
