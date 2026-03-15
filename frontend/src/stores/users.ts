import { defineStore } from "pinia";
import {
  getReadUsers as apiGetReadUsers,
  postCreateUser as apiPostCreateUser,
  putUpdateUser as apiPutUpdateUser,
} from "@/services/api/users";
import type { UserCreateInput, UserProfile, UserUpdateInput } from "@/types/user";
import { useAuthStore } from "@/stores/auth";

export const useUsersStore = defineStore("users", {
  state: () => ({
    items: [] as UserProfile[],
    loading: false,
  }),
  actions: {
    async fetchUsers() {
      const auth = useAuthStore();
      this.loading = true;
      try {
        const data = await apiGetReadUsers(auth.token);
        this.items = data as UserProfile[];
      } finally {
        this.loading = false;
      }
    },
    async createUser(payload: UserCreateInput) {
      const auth = useAuthStore();
      const data = await apiPostCreateUser(auth.token, payload);
      this.items = [data as UserProfile, ...this.items];
    },
    async updateUser(userId: number, payload: UserUpdateInput) {
      const auth = useAuthStore();
      const data = await apiPutUpdateUser(auth.token, userId, payload);
      this.items = this.items.map((u) => (u.id === userId ? (data as UserProfile) : u));
    },
  },
});
