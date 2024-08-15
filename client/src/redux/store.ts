import {configureStore} from "@reduxjs/toolkit";
import {postApi} from "./post-api.ts";
import {followApi} from "./follow-api.ts";
import {domainApi} from "./domain-api.ts";
import {voteApi} from "./vote-api.ts";
import {commentApi} from "./comment-api.ts";

export const store = configureStore({
    reducer: {
        [postApi.reducerPath]: postApi.reducer,
        [followApi.reducerPath]: followApi.reducer,
        [domainApi.reducerPath]: domainApi.reducer,
        [voteApi.reducerPath]: voteApi.reducer,
        [commentApi.reducerPath]: commentApi.reducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(
            postApi.middleware,
            followApi.middleware,
            domainApi.middleware,
            voteApi.middleware,
            commentApi.middleware,
        ),
});
