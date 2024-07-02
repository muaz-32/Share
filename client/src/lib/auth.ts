import Cookies from "js-cookie";

export async function makeAuthenticatedRequest<T>(url: string, method: "GET" | "POST" | "PUT" | "DELETE", data?: any): Promise<T> {
    const accessToken = Cookies.get("accessToken");
    const refreshToken = Cookies.get("refreshToken");

    if (!accessToken || !refreshToken) {
        window.location.replace("/authorize");
    }

    try {
        const response = await fetch(url, {
            method,
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${accessToken}`
            },
            body: JSON.stringify(data)
        });

        if (response.status === 401) {
            const response = await fetch("/api/refresh", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${refreshToken}`
                }
            });

            if (response.status === 200) {
                const data = await response.json();
                Cookies.set("accessToken", data.accessToken, {secure: true, sameSite: "strict"});
                Cookies.set("refreshToken", data.refreshToken, {secure: true, sameSite: "strict"});
                return makeAuthenticatedRequest(url, method, data);
            } else {
                window.location.replace("/authorize");
            }
        }

        return await response.json();
    } catch (error) {
        console.error(error);
        throw error;
    }
}

export function setTokensInCookies(accessToken: string, refreshToken: string) {
    Cookies.set("accessToken", accessToken, {secure: true, sameSite: "strict"});
    Cookies.set("refreshToken", refreshToken, {secure: true, sameSite: "strict"});
}

export function logout() {
    Cookies.remove("accessToken");
    Cookies.remove("refreshToken");
    window.location.replace("/authorize");
}
