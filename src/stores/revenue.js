import { defineStore } from 'pinia';
import api from '../api/axios';

export const useRevenueStore = defineStore('revenue', {
  state: () => ({
    from: '',
    to: '',
    selectedPeriodRevenue: 0,
    averageRevenue: 0,
    totalRevenue: 0,
    points: [],
    loading: false,
    error: null,
  }),
  actions: {
    async fetchStats(from, to) {
      this.loading = true;
      this.error = null;
      try {
        const res = await api.get('/sales/stats', {
          params: { from, to },
        });

        const data = res.data;
        this.from = data.from;
        this.to = data.to;
        this.selectedPeriodRevenue = data.selected_period_revenue;
        this.averageRevenue = data.average_revenue;
        this.totalRevenue = data.total_revenue;
        this.points = Array.isArray(data.points) ? data.points : [];
      } catch (e) {
        console.error(e);
        this.error = 'Failed to load revenue stats';
      } finally {
        this.loading = false;
      }
    },
  },
});
