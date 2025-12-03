// src/stores/useAuthStore.js
import { defineStore } from 'pinia';
import api from '../api/axios';

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: null,
    token: localStorage.getItem('auth_token') || null,
  }),

  getters: {
    isAuthenticated(state) {
      return !!state.token;
    },
  },

  actions: {
    async login(name, password) {
      const res = await api.post('/login', { name, password });

      this.user = res.data.user;
      this.token = res.data.token;

      // save token
      localStorage.setItem('auth_token', this.token);
      // set axios header
      api.defaults.headers.common['Authorization'] = `Bearer ${this.token}`;
    },

    logout() {
      this.user = null;
      this.token = null;
      localStorage.removeItem('auth_token');
      delete api.defaults.headers.common['Authorization'];
    },
  },
});
