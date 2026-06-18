import { defineStore } from "pinia";
import axios from "axios";

export const useSecurityStore = defineStore("security", {
  state: () => ({
    loading: false,
    error: "",
  }),

  actions: {
    async changePassword(currentPassword, newPassword) {
      this.loading = true;
      this.error = "";

      try {
        await axios.post(
          `${import.meta.env.VITE_API_URL}/change-password`,
          { currentPassword, newPassword },
          { withCredentials: true }
        );
        return true;
      } catch (error) {
        this.error =
          error.response?.data?.error ||
          "Er ging iets mis. Probeer het later opnieuw.";
        return false;
      } finally {
        this.loading = false;
      }
    },
  },
});
