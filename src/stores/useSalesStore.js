// src/stores/useSalesStore.js
import { defineStore } from "pinia";
import api from "../api/axios";

export const useSalesStore = defineStore("sales", {
  state: () => ({
    showAddSale: false,
    sale: {
      id: null,
      name: "",
      purpose: "",
      regular_qty: 0,
      small_qty: 0,
      status: "",
    },
    activeFilter: "All",
    searchQuery: "",
    transactions: [],
    editingId: null,

    // prices (can be changed from Settings page)
    priceRegular: 15,
    priceSmall: 10,

    adminConfirmModal: {
      show: false,
      mode: null,
      targetTx: null,
    },
  }),


  getters: {
   totalAmount(state) {
  const regular = Number(state.sale.regular_qty) || 0;
  const small = Number(state.sale.small_qty) || 0;

  const total = regular * state.priceRegular + small * state.priceSmall;
  return `₱${total.toFixed(2)}`;
},



    filteredTransactions(state) {
      let txs =
        state.activeFilter === "All"
          ? state.transactions
          : state.transactions.filter((tx) => tx.status === state.activeFilter);

      if (state.searchQuery.trim()) {
        const q = state.searchQuery.toLowerCase();
        txs = txs.filter((tx) => (tx.name || "").toLowerCase().includes(q));
      }

      return txs;
    },

    totalRevenue(state) {
      const today = new Date().toISOString().slice(0, 10);
      return state.transactions
        .filter(
          (tx) =>
            tx.created_at &&
            tx.created_at.slice(0, 10) === today
        )
        .reduce((sum, tx) => sum + (Number(tx.total_amount) || 0), 0);
    },

    totalCollectables(state) {
      const today = new Date().toISOString().slice(0, 10);
      return state.transactions.filter(
        (tx) =>
          tx.status === "Collectables" &&
          tx.created_at &&
          tx.created_at.slice(0, 10) === today
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

    peakRevenue(state) {
      if (!state.transactions || state.transactions.length === 0) {
        return { amount: 0, date: "" };
      }

      const revenueByDate = {};

      state.transactions.forEach((tx) => {
        const date = tx.created_at ? tx.created_at.slice(0, 10) : "Unknown";
        const amount = Number(tx.total_amount) || 0;
        revenueByDate[date] = (revenueByDate[date] || 0) + amount;
      });

      let maxAmount = 0;
      let maxDate = "";

      Object.entries(revenueByDate).forEach(([date, amount]) => {
        if (amount > maxAmount) {
          maxAmount = amount;
          maxDate = date;
        }
      });

      return { amount: maxAmount, date: maxDate };
    },
  },

  actions: {

     async loadPrices() {
    try {
      const res = await api.get("/settings/prices")
      this.priceRegular = Number(res.data.price_regular)
      this.priceSmall = Number(res.data.price_small)
    } catch (error) {
      console.error("Error loading prices:", error.response ?? error)
      // if it fails, you keep defaults 15 / 10
    }
  },
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

    openAddSale() {
  this.editingId = null;
  this.sale = {
    id: null,
    name: "",
    purpose: "",
    regular_qty: 0,
    small_qty: 0,
    status: "",
  };
  this.showAddSale = true;
},

openEditSale(tx) {
  this.editingId = tx.id;
  this.sale = {
    id: tx.id,
    name: tx.name,
    purpose: tx.purpose,
    regular_qty: tx.regular_qty || 0,
    small_qty: tx.small_qty || 0,
    status: tx.status,
  };
  this.showAddSale = true;
},


    closeAddSale() {
      this.showAddSale = false;
    },

    // CREATE (no password)
async saveSale() {
  if (!this.sale.name || !this.sale.purpose || !this.sale.status) {
    alert("Please fill out customer name, purpose, and status.");
    return;
  }

   const regular = Number(this.sale.regular_qty) || 0;
  const small   = Number(this.sale.small_qty) || 0;
  const gallons = regular + small;

  const total = regular * this.priceRegular + small * this.priceSmall;

  const price_per_gallon = gallons > 0 ? total / gallons : 0;

   const payload = {
    name: this.sale.name,
    purpose: this.sale.purpose,
    gallons,
    price_per_gallon,
    total_amount: total,
    status: this.sale.status,
  };

  try {
    let savedSale;
    if (this.editingId) {
      const res = await api.put(`/sales/${this.editingId}`, payload);
      savedSale = res.data;
      const idx = this.transactions.findIndex(
        (t) => t.id === this.editingId
      );
      if (idx !== -1) this.transactions[idx] = savedSale;
    } else {
      const res = await api.post("/sales", payload);
      savedSale = res.data;
      this.transactions.push(savedSale);
    }

    alert(
      `Sale saved for ${savedSale.name}, amount: ₱${savedSale.total_amount}`
    );

    this.showAddSale = false;
    this.editingId = null;
    this.sale = {
      id: null,
      name: "",
      purpose: "",
      regular_qty: 0,
      small_qty: 0,
      status: "",
    };
  } catch (error) {
    console.error("Error saving sale:", error.response ?? error);
    alert("Failed to save sale to server.");
  }
}
,

    setFilter(filter) {
      this.activeFilter = filter;
    },

    confirmAndMarkDone(tx) {
      if (window.confirm("Confirm the payment?")) {
        this.markSaleDone(tx);
        this.activeFilter = "All";
      }
    },

    // PUT /api/sales/{id} status = Done
    async markSaleDone(tx) {
      if (!tx || !tx.id) {
        alert("Cannot mark sale as done: missing ID.");
        return;
      }

      const originalStatus = tx.status;
      tx.status = "Done";

      try {
        await api.put(`/sales/${tx.id}`, { status: "Done" });
      } catch (error) {
        console.error("Error updating sale status:", error.response ?? error);
        tx.status = originalStatus;
        alert("Failed to update status on server.");
      }
    },

    // OLD direct delete (not used by UI now)
    async deleteTransaction(tx) {
      if (!tx || !tx.id) {
        alert("Cannot delete: missing ID.");
        return;
      }

      try {
        await api.delete(`/sales/${tx.id}`);
        this.transactions = this.transactions.filter((t) => t.id !== tx.id);
      } catch (error) {
        console.error("Error deleting sale:", error.response ?? error);
        alert("Failed to delete sale on server.");
      }
    },

    // ===== Admin-password flows =====

    openConfirmDelete(tx) {
      this.adminConfirmModal.show = true;
      this.adminConfirmModal.mode = "delete";
      this.adminConfirmModal.targetTx = tx;
    },

    openConfirmUpdate(tx) {
      this.adminConfirmModal.show = true;
      this.adminConfirmModal.mode = "update";
      this.adminConfirmModal.targetTx = tx;
    },

    closeConfirmDelete() {
      this.adminConfirmModal.show = false;
      this.adminConfirmModal.mode = null;
      this.adminConfirmModal.targetTx = null;
    },

    // DELETE with password
    async confirmDeleteWithPassword(password) {
      if (!password) {
        alert("Please enter admin password.");
        return;
      }

      const tx = this.adminConfirmModal.targetTx;
      if (!tx || !tx.id) {
        alert("Missing transaction.");
        return;
      }

      try {
        await api.post("/admin/confirm-password", { password });
        await api.delete(`/sales/${tx.id}`);

        this.transactions = this.transactions.filter((t) => t.id !== tx.id);
        this.closeConfirmDelete();
      } catch (error) {
        const res = error.response;
        console.error("CONFIRM DELETE ERROR", res ?? error);
        if (res) {
          alert(
            `Confirm/delete failed: ${res.status} ${JSON.stringify(res.data)}`
          );
        } else {
          alert("Confirm/delete failed: no response from server.");
        }
      }
    },

    // UPDATE with password
    async confirmUpdateWithPassword(password, updatedSale) {
      if (!password) {
        alert("Please enter admin password.");
        return;
      }

      if (!updatedSale || !updatedSale.id) {
        alert("Missing sale to update.");
        return;
      }

      try {
        // 1) verify password
        await api.post("/admin/confirm-password", { password });

        const regular = Number(updatedSale.regular_qty) || 0;
const small   = Number(updatedSale.small_qty) || 0;
const gallons = regular + small;

const total = regular * this.priceRegular + small * this.priceSmall;

const payload = {
  name: updatedSale.name,
  purpose: updatedSale.purpose,
  gallons,
  total_amount: total,
  status: updatedSale.status,
};


        // 3) PUT /sales/{id}
        const res = await api.put(`/sales/${updatedSale.id}`, payload);
        const savedSale = res.data;

        // 4) update local list
        const idx = this.transactions.findIndex((t) => t.id === updatedSale.id);
        if (idx !== -1) this.transactions[idx] = savedSale;

        this.closeConfirmDelete();
      } catch (error) {
        const res = error.response;
        console.error("CONFIRM UPDATE ERROR", res ?? error);
        if (res) {
          alert(
            `Confirm/update failed: ${res.status} ${JSON.stringify(res.data)}`
          );
        } else {
          alert("Confirm/update failed: no response from server.");
        }
      }
    },
  },
});
