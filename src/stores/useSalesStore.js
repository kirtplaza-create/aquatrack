// stores/useSalesStore.js
import { defineStore } from 'pinia';

export const useSalesStore = defineStore('sales', {
  state: () => ({
    showAddSale: false,
    sale: {
      customer: '',
      purpose: '',
      gallons: 1,
      price: 15,
      status: '',
    },
    activeFilter: 'All',
    searchQuery: '',
    transactions: [],
  }),

  getters: {
    totalAmount(state) {
      const total = (state.sale.gallons * state.sale.price) || 0;
      return `₱${total}`;
    },
    filteredTransactions(state) {
      let txs = (state.activeFilter === 'All')
        ? state.transactions
        : state.transactions.filter(tx => tx.status === state.activeFilter);

      if (state.searchQuery.trim()) {
        txs = txs.filter(tx =>
          tx.customer.toLowerCase().includes(state.searchQuery.toLowerCase())
        );
      }
      return txs;
    },

    // Dashboard Getters ***
    totalRevenue(state) {
      return state.transactions.reduce((sum, tx) => sum + tx.amount, 0);
    },
    totalCollectables(state) {
      return state.transactions.filter(tx => tx.status === 'Collectables').length;
    },
    totalEarnings(state) {
      // Only sales marked Done (paid)
      return state.transactions
        .filter(tx => tx.status === 'Done')
        .reduce((sum, tx) => sum + tx.amount, 0);
    },
    totalGallonsSold(state) {
      return state.transactions.reduce((sum, tx) => sum + tx.gallons, 0);
    },
    avgSalesPerDay(state) {
      if (state.transactions.length === 0) return 0;
      const days = new Set(state.transactions.map(tx => tx.date));
      return (state.transactions.reduce((sum, tx) => sum + tx.amount, 0) / days.size).toFixed(2);
    },
    totalTransactions(state) {
      return state.transactions.length;
    },
    totalCompletedTransactions(state) {
      return state.transactions.filter(tx => tx.status === 'Done').length;
    },
    totalRefillsCompleted(state) {
      return state.transactions.length;
    },
    walkInRefills(state) {
      return state.transactions.filter(tx => tx.type === 'Walk-in').length;
    },
    deliveryRefills(state) {
      return state.transactions.filter(tx => tx.type === 'Delivery').length;
    },
    totalGallonsDispensed(state) {
      return state.transactions.reduce((sum, tx) => sum + tx.gallons, 0);
    }
  },

  actions: {
    saveSale() {
      alert(`Sale saved for ${this.sale.customer}, amount: ${this.totalAmount}`);
      // example: push to transactions list
      this.transactions.push({
        customer: this.sale.customer,
        type: this.sale.purpose,
        date: new Date().toLocaleDateString(),
        time: new Date().toLocaleTimeString(),
        gallons: this.sale.gallons,
        amount: this.sale.gallons * this.sale.price,
        status: this.sale.status === 'Pending' ? 'Collectables' : 'Done',
      });
      this.showAddSale = false;
      this.sale = { customer: '', purpose: '', gallons: 1, price: 20, status: '' };
    },
    setFilter(filter) {
      this.activeFilter = filter;
    },
    confirmAndMarkDone(tx) {
      if (window.confirm('Confirm the payment?')) {
        tx.status = 'Done';
        this.activeFilter = 'All';
      }
    },
    openAddSale() {
      this.showAddSale = true;
    },
    closeAddSale() {
      this.showAddSale = false;
    },
  },
});