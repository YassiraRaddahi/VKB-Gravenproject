import { defineStore } from "pinia";
import axios from "axios";
import router from "@/router";
 
export const useUserStore = defineStore("user", {
  state: () => ({
    user: null,
    permissions: [],
  }),
 
  actions: {
    async fetchUser() {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/active-token`,
          {
            withCredentials: true,
          }
        );
 
        this.user = response.data.user;
        this.permissions = response.data.permissions;
       
        console.log("Fetched user and permissions:", response.data);
 
      } catch (error) {
        this.user = null;
        this.permissions = [];
        throw error;
      }
    },
 
    hasPermission(permission) {
      return this.permissions.includes(permission);
    },
 
    async logout() {
      await axios.post(
        `${import.meta.env.VITE_API_URL}/logout`,
        {},
        { withCredentials: true }
      );
      this.user = null;
      this.permissions = [];
      router.push({ name: "Home" });
    },
  },
});