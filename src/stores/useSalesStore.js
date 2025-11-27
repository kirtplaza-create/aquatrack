// stores/useSalesStore.js
import { defineStore } from "pinia";
import api from "../api/axios";

export const useSalesStore = defineStore("sales", {
  state: () => ({
    showAddSale: false,
    sale: {
      name: "",              // customer name (sales.name)
      purpose: "",
      gallons: 1,
      price_per_gallon: 15,  // sales.price_per_gallon
      status: "",
    },
    activeFilter: "All",
    searchQuery: "",
    transactions: [],        // holds rows from /api/sales
  }),

  getters: {
    totalAmount(state) {
      const gallons = Number(state.sale.gallons) || 0;
      const price = Number(state.sale.price_per_gallon) || 0;
      const total = gallons * price;
      return `₱${total}`;
    },

    filteredTransactions(state) {
      let txs =
        state.activeFilter === "All"
          ? state.transactions
          : state.transactions.filter((tx) => tx.status === state.activeFilter);

      if (state.searchQuery.trim()) {
        const q = state.searchQuery.toLowerCase();
        txs = txs.filter((tx) =>
          (tx.name || "").toLowerCase().includes(q)
        );
      }

      return txs;
    },

    totalRevenue(state) {
      return state.transactions.reduce(
        (sum, tx) => sum + (Number(tx.total_amount) || 0),
        0
      );
    },

    totalCollectables(state) {
      return state.transactions.filter(
        (tx) => tx.status === "Collectables"
      ).length;
    },

    totalEarnings(state) {
      return state.transactions
        .filter((tx) => tx.status === "Done")
        .reduce((sum, tx) => sum + (Number(tx.total_amount) || 0), 0);
    },

    totalGallonsSold(state) {
      return state.transactions.reduce(
        (sum, tx) => sum + (Number(tx.gallons) || 0),
        0
      );
    },

    totalGallonsDispensed() {
      return this.totalGallonsSold;
    },

    avgSalesPerDay(state) {
      if (state.transactions.length === 0) return "0.00";

      const days = new Set(
        state.transactions.map((tx) => tx.created_at?.slice(0, 10))
      );
      const total = state.transactions.reduce(
        (sum, tx) => sum + (Number(tx.total_amount) || 0),
        0
      );

      return (total / days.size).toFixed(2);
    },

    totalTransactions(state) {
      return state.transactions.length;
    },

    totalCompletedTransactions(state) {
      return state.transactions.filter((tx) => tx.status === "Done").length;
    },

    totalRefillsCompleted(state) {
      return state.transactions.filter((tx) => tx.status === "Done").length;
    },

    walkInRefills(state) {
      return state.transactions.filter((tx) => tx.purpose === "Walk-in").length;
    },

    deliveryRefills(state) {
      return state.transactions.filter(
        (tx) => tx.purpose === "Delivery"
      ).length;
    },
  },

  actions: {
    // GET /api/sales
    async fetchTransactions() {
      try {
        const res = await api.get("/sales");
        this.transactions = res.data;
      } catch (error) {
        console.error("Error fetching sales:", error.response ?? error);
        alert("Failed to load sales from server.");
      }
    },

    // POST /api/sales
    async saveSale() {
      if (!this.sale.name || !this.sale.purpose || !this.sale.status) {
        alert("Please fill out customer name, purpose, and status.");
        return;
      }

      const gallons = Number(this.sale.gallons) || 0;
      const price = Number(this.sale.price_per_gallon) || 0;
      const total = gallons * price;

      const payload = {
        name: this.sale.name,
        purpose: this.sale.purpose,
        gallons,
        price_per_gallon: price,
        total_amount: total,
        status: this.sale.status,
      };

      try {
        console.log("SENDING TO /sales", payload);
        const res = await api.post("/sales", payload);
        const savedSale = res.data;

        this.transactions.push(savedSale);

        alert(
          `Sale saved for ${savedSale.name}, amount: ₱${
            savedSale.total_amount ?? total
          }`
        );

        this.showAddSale = false;
        this.sale = {
          name: "",
          purpose: "",
          gallons: 1,
          price_per_gallon: 15,
          status: "",
        };
      } catch (error) {
        console.error("Error saving sale:", error.response ?? error);
        alert("Failed to save sale to server.");
      }
    },

    setFilter(filter) {
      this.activeFilter = filter;
    },

    // user clicks on Collectables → confirm → call backend
    confirmAndMarkDone(tx) {
      if (window.confirm("Confirm the payment?")) {
        this.markSaleDone(tx);
        this.activeFilter = "All";
      }
    },

    // PUT /api/sales/{id} to set status = Done
    async markSaleDone(tx) {
      if (!tx || !tx.id) {
        alert("Cannot mark sale as done: missing ID.");
        return;
      }

      const originalStatus = tx.status;
      // Optimistic update: update UI first
      tx.status = "Done";

      try {
        await api.put(`/sales/${tx.id}`, {
          status: "Done",
        });
        // success: nothing else to do
      } catch (error) {
        console.error("Error updating sale status:", error.response ?? error);
        // rollback if API fails
        tx.status = originalStatus;
        alert("Failed to update status on server.");
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
