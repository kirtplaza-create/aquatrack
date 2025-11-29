<template>
  <div
    class="relative min-h-screen max-w-full overflow-x-hidden bg-[#f4f7ff] py-6 px-4 md:px-8 space-y-6"
  >
    <!-- Header -->
    <div class="flex items-center justify-between">
      <div>
        <h1 class="text-2xl md:text-3xl font-bold text-slate-900">
          Revenue Analytics
        </h1>
        <p class="text-sm text-slate-500">
          Comprehensive gross revenue insights and trends.
        </p>
      </div>
      <span
        class="hidden sm:inline-flex items-center gap-2 rounded-full bg-white shadow px-4 py-2 text-xs font-semibold text-slate-600"
      >
        <span
          class="inline-flex h-2 w-2 rounded-full bg-emerald-400 animate-pulse"
        ></span>
        Live Data
      </span>
    </div>

    <!-- Time period selector -->
    <div
      class="rounded-2xl bg-white px-4 py-4 md:px-6 shadow-sm flex flex-col gap-3"
    >
      <div class="text-xs font-semibold text-slate-500 mb-1">
        Select Time Period
      </div>
      <div
        class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 text-xs md:text-sm"
      >
        <button
          v-for="opt in periodOptions"
          :key="opt.value"
          type="button"
          @click="setActivePeriod(opt.value)"
          :class="[
            'flex flex-col items-center justify-center rounded-xl border px-3 py-3 md:px-4 md:py-4 transition-all duration-200 hover:-translate-y-0.5',
            activePeriod === opt.value
              ? 'bg-gradient-to-r from-[#246af3] via-[#357cf5] to-[#3588ff] text-white border-transparent shadow-lg'
              : 'bg-[#f5f9ff] text-slate-600 border-slate-200 hover:border-[#246af3]/40 hover:bg-white'
          ]"
        >
          <span class="mb-1 font-medium flex items-center gap-1">
            {{ opt.label }}
          </span>
          <span
            class="text-[10px] uppercase tracking-wide opacity-80"
            v-if="opt.sub"
          >
            {{ opt.sub }}
          </span>
        </button>
      </div>
    </div>

    <!-- Top metrics row -->
    <div class="grid grid-cols-1 lg:grid-cols-3 gap-4">
      <!-- Total Revenue big card -->
      <div
        class="lg:col-span-2 rounded-2xl bg-gradient-to-r from-[#246af3] via-[#357cf5] to-[#3588ff] text-white p-6 md:p-8 shadow-lg relative overflow-hidden animate-[fadeInUp_0.4s_ease-out]"
      >
        <div class="flex justify-between items-start gap-4">
          <div>
            <p class="text-xs uppercase tracking-wider opacity-80 mb-1">
              Total Revenue
            </p>
            <p class="text-[11px] opacity-80 mb-4">
              {{ activePeriodLabel }}
            </p>
            <div class="text-3xl md:text-4xl font-extrabold leading-tight">
              ₱{{ formattedTotalRevenue }}
            </div>
          </div>
          <div
            class="hidden sm:flex flex-col items-end text-[11px] opacity-90"
          >
            <span class="mb-1">Average per day</span>
            <span class="text-lg font-semibold">
              ₱{{ formattedAvgRevenue }}
            </span>
          </div>
        </div>
        <div
          class="absolute -right-16 -bottom-16 h-40 w-40 rounded-full bg-white/10 blur-2xl"
        ></div>
        <div
          class="absolute -left-10 -top-10 h-32 w-32 rounded-full bg-white/10 blur-xl"
        ></div>
      </div>

      <!-- Avg Revenue -->
      <div
        class="rounded-2xl bg-white p-5 shadow-sm flex flex-col justify-between gap-2 border border-[#e0ebff] animate-[fadeInUp_0.5s_ease-out]"
      >
        <div class="flex items-center justify-between">
          <div>
            <p class="text-xs font-semibold text-slate-500 mb-1">
              Average Revenue
            </p>
            <p class="text-[11px] text-slate-400">Per period unit</p>
          </div>
          <div
            class="h-10 w-10 rounded-xl bg-[#e3f0ff] flex items-center justify-center text-[#246af3]"
          >
            ₱
          </div>
        </div>
        <div class="text-2xl font-bold text-slate-900">
          ₱{{ formattedAvgRevenue }}
          <span class="text-xs text-slate-400 font-normal">per day</span>
        </div>
      </div>

      <!-- Peak Revenue -->
      <div
        class="rounded-2xl bg-white p-5 shadow-sm flex flex-col justify-between gap-2 border border-[#e0ebff] animate-[fadeInUp_0.6s_ease-out]"
      >
        <div class="flex items-center justify-between">
          <div>
            <p class="text-xs font-semibold text-slate-500 mb-1">
              Peak Revenue
            </p>
            <p class="text-[11px] text-slate-400">Best performing period</p>
          </div>
          <div
            class="h-10 w-10 rounded-xl bg-[#e3f0ff] flex items-center justify-center text-[#246af3]"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              stroke-width="2"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M3 17l6-6 4 4 8-10"
              />
            </svg>
          </div>
        </div>
        <div class="text-2xl font-bold text-slate-900">
          ₱{{ formattedPeakRevenue }}
        </div>
        <p class="text-[11px] text-slate-400" v-if="peakRevenueDayLabel">
          Highest day: {{ peakRevenueDayLabel }}
        </p>
      </div>
    </div>

    <!-- Revenue breakdown chart -->
    <div
      class="rounded-2xl bg-white p-6 md:p-8 shadow-lg space-y-4 border border-[#e0ebff]"
    >
      <div class="flex items-center justify-between gap-2">
        <div>
          <p class="text-sm font-semibold text-slate-800">
            Revenue Breakdown
          </p>
          <p class="text-xs text-slate-400">
            Daily revenue distribution
          </p>
        </div>
        <div class="text-[10px] text-slate-400">
          Data Points: {{ chartValues.length }}
        </div>
      </div>

      <RevenueLineChart :labels="chartLabels" :values="chartValues" />

      <!-- mini legend -->
      <div class="flex items-center gap-4 text-[11px] text-slate-400">
        <div class="flex items-center gap-1">
          <span class="h-2 w-6 rounded-full bg-[#246af3]"></span>
          <span>Revenue</span>
        </div>
        <div class="flex-1 text-right">
          Last updated:
          <span class="font-medium text-slate-500">
            {{ lastUpdatedLabel }}
          </span>
        </div>
      </div>
    </div>
  </div>
</template>


<script>
import { mapState, mapGetters, mapActions } from "pinia";
import { useSalesStore } from "../stores/useSalesStore";
import RevenueLineChart from "../pages/RevenueLineChart.vue";

export default {
  name: "Statistics",
  components: { RevenueLineChart },
  data() {
    return {
      activePeriod: "thisWeek",
      periodOptions: [
        { label: "This Week", value: "thisWeek", sub: "7 days" },
        { label: "Last Week", value: "lastWeek", sub: "7 days" },
        { label: "This Month", value: "thisMonth", sub: "30 days" },
        { label: "Last Month", value: "lastMonth", sub: "30 days" },
        { label: "This Year", value: "thisYear", sub: "365 days" },
        { label: "Last Year", value: "lastYear", sub: "365 days" },
      ],
    };
  },
  computed: {
    ...mapState(useSalesStore, ["transactions"]),
    ...mapGetters(useSalesStore, [
      "totalRevenue",
      "avgSalesPerDay",
      "peakRevenue",
    ]),

    activePeriodLabel() {
      const opt = this.periodOptions.find(
        (o) => o.value === this.activePeriod
      );
      return opt ? `${opt.label} (${opt.sub})` : "";
    },

    // formatted numbers
    formattedTotalRevenue() {
      const value = this.totalRevenue || 0;
      return value.toLocaleString();
    },
    formattedAvgRevenue() {
      const value = this.avgSalesPerDay || 0;
      return value.toLocaleString();
    },
    formattedPeakRevenue() {
      const value = this.peakRevenue?.amount || 0;
      return value.toLocaleString();
    },
    peakRevenueDayLabel() {
      return this.peakRevenue?.date || "";
    },

    // chart data built from transactions directly
    chartPoints() {
      if (!this.transactions || !this.transactions.length) return [];

      const map = new Map();

      this.transactions.forEach((tx) => {
        const date = tx.created_at ? tx.created_at.slice(0, 10) : "Unknown";
        const amount = Number(tx.total_amount) || 0;
        map.set(date, (map.get(date) || 0) + amount);
      });

      return Array.from(map.entries())
        .sort((a, b) => (a[0] > b[0] ? 1 : -1))
        .map(([date, amount]) => ({ date, amount }));
    },
    chartLabels() {
      return this.chartPoints.map((p) => p.date);
    },
    chartValues() {
      return this.chartPoints.map((p) => p.amount);
    },
    lastUpdatedLabel() {
      if (!this.chartPoints.length) return "No data";
      return this.chartPoints[this.chartPoints.length - 1].date;
    },
  },
  methods: {
    ...mapActions(useSalesStore, ["fetchTransactions"]),
    setActivePeriod(period) {
      this.activePeriod = period;
    },
  },
  mounted() {
    this.fetchTransactions();
  },
};
</script>
