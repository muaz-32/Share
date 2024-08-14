import {configureStore} from "@reduxjs/toolkit";
import {postApi} from "./post-api.ts";
import {followApi} from "./follow-api.ts";

export const store = configureStore({
    reducer: {
        [postApi.reducerPath]: postApi.reducer,
        [followApi.reducerPath]: followApi.reducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(
            postApi.middleware,
            followApi.middleware,
        ),
});
