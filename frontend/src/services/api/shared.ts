import { client } from "@/client/client.gen";

const apiBaseUrl = import.meta.env.VITE_API_BASE_URL || "http://127.0.0.1:8000";

client.setConfig({ baseUrl: apiBaseUrl });

export function withAuth(token: string) {
  return {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
}

export function requireData<T>(data: T | undefined, message: string): T {
  if (data === undefined) {
    throw new Error(message);
  }
  return data;
}
