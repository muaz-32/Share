import {createApi} from "@reduxjs/toolkit/query/react";
import {PostRequestType, PostResponseType} from "../schemas/Post.ts";
import customBaseQuery from "../lib/customBaseQuery.ts";
import {AllPostsResponseType} from "../schemas/AllPosts.ts";

export const postApi = createApi({
    reducerPath: "postApi",
    baseQuery: customBaseQuery,
    endpoints: (builder) => ({
        getPost: builder.query<PostResponseType, string>({
            query: (id) => `post/${id}`,
        }),
        createPost: builder.mutation<PostResponseType, PostRequestType>({
            query: (body) => ({
                url: `post/create`,
                method: "POST",
                body,
            }),
        }),
        getAllPosts: builder.query<AllPostsResponseType, void>({
            query: () => `post/`
        })
    }),
});

export const {useGetPostQuery, useCreatePostMutation, useGetAllPostsQuery} = postApi;
