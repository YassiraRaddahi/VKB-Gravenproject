import { defineStore } from 'pinia'
import axios from 'axios'

export const useUserStore = defineStore('user', {
    state: () => ({
        user: null,
    }),

    actions: {
        async fetchUser() {
            try {
                const response = await axios.get('http://localhost:3001/api/active-token', {
                    withCredentials: true,
                });
                
                this.user = this.user || {}
                Object.assign(this.user, response.data.user)

            } catch (error) {
                this.user = null;
                throw error;
            }
        },

        setUser(userData) {
            this.user = userData;
        },

    }
})
