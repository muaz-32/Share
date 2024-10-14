import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
import Cookies from "js-cookie";
import {jwtDecode} from "jwt-decode";
import {makeAuthenticatedRequest} from "./auth.ts";

type Response = {
  message: string;
};

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function getUserIdFromToken(): number | null {
  const token = Cookies.get("accessToken");
  if (!token) return null;

  try {
    const decoded = jwtDecode<{ userId: number }>(token);
    return decoded.userId;
  } catch (error) {
    console.error("Error decoding token: ", error);
    return null;
  }
}

export async function handleAuthenticatedRoute(setMessage: (message: string) => void) {
  if (!Cookies.get("accessToken") || !Cookies.get("refreshToken")) {
    window.location.replace("/authorize");
  }
  makeAuthenticatedRequest<Response>("http://localhost:3000/api/user/dashboard", "GET")
      .then((data) => {
        setMessage(data.message)
      })
      .catch((error) => {
        setMessage(error.message)
      });
}
