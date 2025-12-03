import { defineStore } from 'pinia'
import api from '../api/axios'

export const useRevenueStore = defineStore('revenue', {
  state: () => ({
    from: '',
    to: '',
    selectedPeriodRevenue: 0,
    averageRevenue: 0,
    totalRevenue: 0,
    points: [],      // current range (month/day)
    yearPoints: [],  // <- add: whole-year daily points
    loading: false,
    error: null,
  }),

  actions: {
    async fetchStats(from, to) {
      this.loading = true
      this.error = null
      try {
        const res = await api.get('/sales/stats', { params: { from, to } })

        const data = res.data
        this.from = data.from
        this.to = data.to
        this.selectedPeriodRevenue = data.selected_period_revenue
        this.averageRevenue = data.average_revenue
        this.totalRevenue = data.total_revenue
        this.points = Array.isArray(data.points) ? data.points : []
      } catch (e) {
        console.error(e)
        this.error = 'Failed to load revenue stats'
      } finally {
        this.loading = false
      }
    },

    // NEW: fetch all daily stats for a given year
    async fetchYearStats(year) {
      this.loading = true
      this.error = null
      try {
        const res = await api.get('/sales/year-stats', {
          params: { year },
        })
        this.yearPoints = Array.isArray(res.data) ? res.data : []
      } catch (e) {
        console.error(e)
        this.error = 'Failed to load yearly revenue stats'
      } finally {
        this.loading = false
      }
    },
  },
})
