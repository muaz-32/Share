import { fetchBaseQuery, BaseQueryFn } from "@reduxjs/toolkit/query/react";
import Cookies from "js-cookie";
import { setTokensInCookies, logout } from "./auth.ts";

const baseQuery = fetchBaseQuery({
    baseUrl: "http://localhost:3000/api",
    prepareHeaders: (headers) => {
        const accessToken = Cookies.get("accessToken");
        if (accessToken) {
            headers.set("Authorization", `Bearer ${accessToken}`);
        }
        return headers;
    },
});

const customBaseQuery: BaseQueryFn = async (args, api, extraOptions) => {
    let result = await baseQuery(args, api, extraOptions);

    if (result.error && result.error.status === 403) {
        const refreshToken = Cookies.get("refreshToken");
        if (refreshToken) {
            const refreshResult = await baseQuery(
                {
                    url: "/user/refresh",
                    method: "POST",
                    body: { token: refreshToken },
                },
                api,
                extraOptions
            );

            if (refreshResult.data) {
                const { accessToken, refreshToken } = refreshResult.data as { accessToken: string; refreshToken: string };
                setTokensInCookies(accessToken, refreshToken);
                result = await baseQuery(args, api, extraOptions);
            } else {
                logout();
            }
        } else {
            logout();
        }
    }

    return result;
};

export default customBaseQuery;
