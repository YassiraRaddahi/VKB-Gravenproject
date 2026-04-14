import { defineStore } from "pinia";
import axios from "axios";
import router from "@/router";

export const useUserStore = defineStore("user", {
  state: () => ({
    user: null,
  }),

  actions: {
    async fetchUser() {
      try {
        const response = await axios.get(
          "http://localhost:3001/api/active-token",
          {
            withCredentials: true,
          }
        );

        this.user = response.data.user;

        // this.user = this.user || {};
        // Object.assign(this.user, response.data.user);
      } catch (error) {
        this.user = null;
        throw error;
      }
    },

    // setUser(userData) {
    //   this.user = userData;
    // },

    async logout() {
      await axios.post(
        "http://localhost:3001/api/logout",
        {},
        { withCredentials: true }
      );
      this.user = null;

      router.push({ name: "Home" });
    },
  },
});
