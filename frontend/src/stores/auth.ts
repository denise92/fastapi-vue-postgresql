import { defineStore } from "pinia";
import { getReadMe, postLoginAccessToken } from "@/services/api/auth";
import type { UserProfile } from "@/types/user";

const TOKEN_KEY = "auth_token";
const initialToken =
  typeof window !== "undefined" ? window.localStorage.getItem(TOKEN_KEY) || "" : "";

export const useAuthStore = defineStore("auth", {
  state: () => ({
    token: initialToken,
    user: null as UserProfile | null,
    loading: false,
  }),
  getters: {
    isLoggedIn: (state) => Boolean(state.token),
  },
  actions: {
    async login(username: string, password: string) {
      const token = await postLoginAccessToken(username, password);
      this.token = token.access_token;
      if (typeof window !== "undefined") {
        window.localStorage.setItem(TOKEN_KEY, token.access_token);
      }
      await this.fetchMe();
    },
    async fetchMe() {
      if (!this.token) return;
      const user = await getReadMe(this.token);
      this.user = user as UserProfile;
    },
    async bootstrap() {
      if (!this.token) return;
      try {
        await this.fetchMe();
      } catch {
        this.logout();
      }
    },
    logout() {
      this.token = "";
      this.user = null;
      if (typeof window !== "undefined") {
        window.localStorage.removeItem(TOKEN_KEY);
      }
    },
  },
});
