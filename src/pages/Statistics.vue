<template>
  <div class="p-6 space-y-6 bg-gradient-to-br from-[#f8fafc] to-[#e2e8f0] min-h-screen">
    <!-- Header -->
    <div class="flex items-center justify-between animate-fade-in">
      <div>
        <h1 class="text-3xl lg:text-4xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent mb-1">
          Revenue Analytics
        </h1>
        <p class="text-sm text-gray-500">
          Comprehensive gross revenue insights and trends
        </p>
      </div>
      <div
        class="flex items-center gap-3 bg-white/80 backdrop-blur-sm rounded-full px-4 py-2 shadow-md border border-white/60 text-xs text-gray-600"
      >
        <span class="h-2 w-2 rounded-full bg-gradient-to-r from-emerald-400 to-emerald-500 animate-pulse"></span>
        <span class="font-semibold">Live Data</span>
        <span class="text-gray-400">·</span>
        <span class="text-emerald-600 font-medium">Real-time Updates</span>
      </div>
    </div>

    <!-- Calendar + cards -->
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
      <!-- Bigger selector panel -->
      <div class="bg-white/80 backdrop-blur-sm rounded-3xl shadow-lg p-6 border border-white/60 lg:max-w-xl">
        <div class="flex items-center justify-between mb-6">
          <button
            type="button"
            class="h-10 w-10 flex items-center justify-center rounded-full bg-gray-100 hover:bg-gray-200 shadow-sm hover:shadow transition"
            @click="shift(-1)"
          >
            ‹
          </button>

          <div
            class="text-base font-semibold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent cursor-pointer hover:scale-105 transition"
            @click="stepUp"
          >
            <span v-if="viewMode === 'years'">
              {{ yearsRangeLabel }}
            </span>
            <span v-else-if="viewMode === 'year'">
              {{ selectedYear }}
            </span>
            <span v-else>
              {{ currentMonthLabel }}
            </span>
          </div>

          <button
            type="button"
            class="h-10 w-10 flex items-center justify-center rounded-full bg-gray-100 hover:bg-gray-200 shadow-sm hover:shadow transition"
            @click="shift(1)"
          >
            ›
          </button>
        </div>

        <!-- YEARS VIEW -->
        <div v-if="viewMode === 'years'">
          <div class="grid grid-cols-4 gap-4 text-sm">
            <button
              v-for="year in yearCards"
              :key="year.value"
              type="button"
              class="py-4 rounded-2xl border text-center transition-all duration-200 hover:shadow-md hover:scale-[1.02]"
              :class="
                year.value === selectedYear
                  ? 'bg-gradient-to-br from-emerald-500 to-emerald-600 text-white border-emerald-500 shadow-md'
                  : 'bg-gray-50 text-gray-700 hover:bg-gray-100 border-gray-200'
              "
              @click="selectYear(year.value)"
            >
              <div class="font-semibold">{{ year.value }}</div>
            </button>
          </div>
        </div>

        <!-- YEAR VIEW (months) -->
        <div v-else-if="viewMode === 'year'">
          <div class="grid grid-cols-3 gap-4 text-sm">
            <button
              v-for="(m, idx) in monthCards"
              :key="m.key"
              type="button"
              class="py-4 rounded-2xl border text-center transition-all duration-200 hover:shadow-md hover:scale-[1.02]"
              :class="
                idx === selectedMonthIndex
                  ? 'bg-gradient-to-br from-blue-500 to-blue-600 text-white border-blue-500 shadow-md'
                  : 'bg-gray-50 text-gray-700 hover:bg-blue-50 border-gray-200'
              "
              @click="selectMonth(idx)"
            >
              <div class="font-semibold">{{ m.label }}</div>
              <div class="text-[11px]" :class="idx === selectedMonthIndex ? 'text-blue-100' : 'text-gray-400'">
                ₱{{ formatMoney(m.total) }}
              </div>
            </button>
          </div>
        </div>

        <!-- MONTH VIEW (days) - bigger cells -->
        <div v-else>
          <div class="grid grid-cols-7 text-[11px] text-center text-gray-400 mb-3 font-semibold uppercase tracking-wide">
            <span>Sun</span><span>Mon</span><span>Tue</span>
            <span>Wed</span><span>Thu</span><span>Fri</span><span>Sat</span>
          </div>

          <div class="grid grid-cols-7 gap-y-3 text-sm text-center text-gray-600">
            <span
              v-for="n in firstDayOffset"
              :key="'b-' + n"
              class="flex items-center justify-center h-10"
            />
            <span
              v-for="day in daysInMonth"
              :key="day"
              class="flex items-center justify-center"
            >
              <button
                type="button"
                class="h-10 w-10 flex items-center justify-center rounded-2xl transition-all duration-150 hover:shadow"
                :class="
                  selectedDay === day
                    ? 'bg-[#2563eb] text-white shadow-md scale-110'
                    : 'bg-white hover:bg-gray-100'
                "
                @click="selectDay(day)"
              >
                {{ day }}
              </button>
            </span>
          </div>
        </div>
      </div>

      <!-- Right side stacked cards -->
      <div class="flex flex-col gap-4">
        <!-- Selected Period -->
        <div
          class="bg-gradient-to-r from-[#2563eb] to-[#1d4ed8] text-white rounded-3xl p-6 shadow-lg relative overflow-hidden"
        >
          <div class="absolute inset-0 bg-white/10 pointer-events-none"></div>
          <div class="flex items-center justify-between mb-2 relative z-10">
            <div class="flex items-center gap-3 text-xs">
              <div
                class="h-10 w-10 rounded-2xl bg-white/15 flex items-center justify-center shadow-sm"
              >
                ₱
              </div>
              <div>
                <div class="uppercase tracking-wide opacity-90 text-[11px]">
                  Selected Period
                </div>
                <div class="text-[11px] opacity-75">
                  {{ revenue.from }} – {{ revenue.to }}
                </div>
              </div>
            </div>
            <div class="text-[11px] opacity-80 bg-white/10 px-3 py-1 rounded-full">
              {{ formatDateRange(revenue.from, revenue.to) }}
            </div>
          </div>
          <div class="mt-3 text-4xl lg:text-5xl font-semibold relative z-10">
            ₱{{ formatMoney(totalMonthlyRevenue) }}
          </div>
        </div>

        <!-- Average Revenue (stacked below) -->
        <div class="bg-white rounded-3xl shadow-md p-5 border border-gray-100">
          <div class="flex items-center gap-3 mb-3">
            <div
              class="h-9 w-9 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center text-sm"
            >
              ₱
            </div>
            <div>
              <div class="text-xs uppercase text-gray-500">
                Average Revenue
              </div>
              <div class="text-[11px] text-gray-400">Per period</div>
            </div>
          </div>
          <div class="text-2xl font-semibold text-gray-900">
            ₱{{ formatMoney(averageDailyRevenue) }}
          </div>
        </div>

        <!-- Total Revenue (stacked last) -->
        <div class="bg-white rounded-3xl shadow-md p-5 border border-gray-100">
          <div class="flex items-center gap-3 mb-3">
            <div
              class="h-9 w-9 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center text-sm"
            >
              📊
            </div>
            <div>
              <div class="text-xs uppercase text-gray-500">
                Total Revenue
              </div>
              <div class="text-[11px] text-gray-400">All periods</div>
            </div>
          </div>
          <div class="text-2xl font-semibold text-gray-900">
            ₱{{ formatMoney(totalMonthlyRevenue) }}
          </div>
        </div>
      </div>
    </div>

    <!-- Revenue Overview (BAR graph) -->
    <div class="bg-white rounded-3xl shadow-md p-5 border border-gray-100">
      <div class="flex items-center justify-between mb-3">
        <div class="flex items-center gap-3">
          <div
            class="h-9 w-9 rounded-2xl bg-blue-500 text-white flex items-center justify-center text-sm shadow"
          >
            ₱
          </div>
          <div>
            <div class="font-semibold text-gray-800">Revenue Overview</div>
            <div class="text-[11px] text-gray-400">
              {{ currentMonthLabel }}
            </div>
          </div>
        </div>
        <div class="text-[11px] text-gray-400">
          Data Points: {{ monthPoints.length }}
        </div>
      </div>

      <div class="mt-4 h-72 lg:h-80 rounded-2xl overflow-hidden border border-gray-100">
        <Bar :data="chartData" :options="chartOptions" />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import { useRevenueStore } from '../stores/revenue';
import { Bar } from 'vue-chartjs';
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale,
} from 'chart.js';

ChartJS.register(
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale,
);

const revenue = useRevenueStore();

// viewMode: 'years' → year grid, 'year' → months, 'month' → days
const viewMode = ref('month');
const yearsWindowStart = ref(2020);

// selected date pieces
const now = new Date();
const selectedYear = ref(now.getFullYear());
const selectedMonthIndex = ref(now.getMonth());
const selectedDay = ref(null);

// cache: graph always uses these (month) points
const monthPoints = ref([]);

// monthly totals
const monthlyTotals = computed(() => {
  const sums = Array(12).fill(0);

  for (const p of revenue.yearPoints) {
    const d = new Date(p.date);
    if (d.getFullYear() === selectedYear.value) {
      sums[d.getMonth()] += Number(p.amount || 0);
    }
  }

  return sums;
});

// totals & average
const totalMonthlyRevenue = computed(() =>
  monthPoints.value.reduce((sum, p) => sum + Number(p.amount || 0), 0),
);

const daysWithRevenueCount = computed(() => {
  const count = monthPoints.value.filter(p => Number(p.amount || 0) > 0).length;
  return count || 1;
});

const averageDailyRevenue = computed(() =>
  totalMonthlyRevenue.value / daysWithRevenueCount.value,
);

// helpers
const yearsRangeLabel = computed(
  () => `${yearsWindowStart.value} - ${yearsWindowStart.value + 11}`,
);

const yearCards = computed(() => {
  const arr = [];
  for (let y = yearsWindowStart.value; y <= yearsWindowStart.value + 11; y++) {
    arr.push({ value: y, total: 0 });
  }
  return arr;
});

const monthCards = computed(() => {
  const labels = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];

  return labels.map((label, idx) => ({
    key: label,
    label,
    total: monthlyTotals.value[idx] || 0,
  }));
});

const daysInMonth = computed(() => {
  const year = selectedYear.value;
  const month = selectedMonthIndex.value;
  return new Date(year, month + 1, 0).getDate();
});

const firstDayOffset = computed(() => {
  const year = selectedYear.value;
  const month = selectedMonthIndex.value;
  return new Date(year, month, 1).getDay();
});

const currentMonthLabel = computed(() => {
  const d = new Date(selectedYear.value, selectedMonthIndex.value, 1);
  const m = d.toLocaleString('default', { month: 'long' });
  return `${m} ${selectedYear.value}`;
});

// navigation
function stepUp() {
  if (viewMode.value === 'month') viewMode.value = 'year';
  else if (viewMode.value === 'year') viewMode.value = 'years';
}

async function shift(offset) {
  if (viewMode.value === 'years') {
    yearsWindowStart.value += offset * 12;
    return;
  }

  if (viewMode.value === 'year') {
    selectedYear.value += offset;
    selectedDay.value = null;
    await revenue.fetchYearStats(selectedYear.value);
    await fetchForMonth(selectedYear.value, selectedMonthIndex.value);
    return;
  }

  // month view
  let month = selectedMonthIndex.value + offset;
  let year = selectedYear.value;

  if (month < 0) {
    month = 11;
    year -= 1;
  } else if (month > 11) {
    month = 0;
    year += 1;
  }

  selectedYear.value = year;
  selectedMonthIndex.value = month;
  selectedDay.value = null;
  await revenue.fetchYearStats(selectedYear.value);
  await fetchForMonth(year, month);
}

async function selectYear(year) {
  selectedYear.value = year;
  selectedMonthIndex.value = 0;
  selectedDay.value = null;
  viewMode.value = 'year';
  await revenue.fetchYearStats(selectedYear.value);
  await fetchForMonth(selectedYear.value, selectedMonthIndex.value);
}

async function selectMonth(idx) {
  selectedMonthIndex.value = idx;
  selectedDay.value = null;
  viewMode.value = 'month';
  await fetchForMonth(selectedYear.value, idx);
}

async function selectDay(day) {
  selectedDay.value = day;

  const year = selectedYear.value;
  const month = String(selectedMonthIndex.value + 1).padStart(2, '0');
  const dd = String(day).padStart(2, '0');
  const from = `${year}-${month}-${dd}`;
  const to = from;

  await revenue.fetchStats(from, to);

  monthPoints.value = Array.isArray(revenue.points)
    ? JSON.parse(JSON.stringify(revenue.points))
    : [];
}

async function fetchForMonth(year, monthIndex) {
  const month = String(monthIndex + 1).padStart(2, '0');
  const lastDay = new Date(year, monthIndex + 1, 0).getDate();
  const from = `${year}-${month}-01`;
  const to = `${year}-${month}-${String(lastDay).padStart(2, '0')}`;

  await revenue.fetchStats(from, to);

  monthPoints.value = Array.isArray(revenue.points)
    ? JSON.parse(JSON.stringify(revenue.points))
    : [];
}

function formatMoney(value) {
  return Number(value || 0).toLocaleString('en-PH', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
}

function formatDateRange(from, to) {
  if (!from || !to) return '';
  const fromDate = new Date(from);
  const toDate = new Date(to);
  return `${fromDate.toLocaleDateString('en-PH', { month: 'short', day: 'numeric' })} - ${toDate.toLocaleDateString('en-PH', { month: 'short', day: 'numeric' })}`;
}

onMounted(async () => {
  await revenue.fetchYearStats(selectedYear.value);
  await fetchForMonth(selectedYear.value, selectedMonthIndex.value);
});

const chartData = computed(() => {
  const labels = monthPoints.value.map((p) => {
    const d = new Date(p.date);
    return d.getDate();
  });

  const values = monthPoints.value.map((p) => Number(p.amount));

  return {
    labels,
    datasets: [
      {
        label: 'Revenue',
        data: values,
        backgroundColor: (ctx) => {
          const gradient = ctx.chart.ctx.createLinearGradient(0, 0, 0, 400);
          gradient.addColorStop(0, 'rgba(37, 99, 235, 0.8)');
          gradient.addColorStop(0.5, 'rgba(59, 130, 246, 0.7)');
          gradient.addColorStop(1, 'rgba(129, 140, 248, 0.7)');
          return gradient;
        },
        borderColor: 'rgba(37, 99, 235, 1)',
        borderRadius: 10,
        borderWidth: 1,
        maxBarThickness: 24,
      },
    ],
  };
});

const chartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  interaction: {
    mode: 'index',
    intersect: false,
  },
  plugins: {
    legend: { display: false },
    tooltip: {
      backgroundColor: 'rgba(15, 23, 42, 0.95)',
      titleColor: '#e5e7eb',
      bodyColor: '#f9fafb',
      borderColor: 'rgba(148, 163, 184, 0.5)',
      borderWidth: 1,
      cornerRadius: 10,
      displayColors: false,
      callbacks: {
        title(ctx) {
          const index = ctx[0].dataIndex;
          return monthPoints.value[index]?.date ?? '';
        },
        label(ctx) {
          const v = ctx.parsed.y ?? 0;
          return `₱${v.toLocaleString('en-PH', {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
          })}`;
        },
      },
    },
  },
  scales: {
    y: {
      beginAtZero: true,
      ticks: {
        color: '#9CA3AF',
        font: { size: 10 },
      },
      grid: { color: '#E5E7EB' },
    },
    x: {
      ticks: {
        color: '#9CA3AF',
        font: { size: 10 },
        maxRotation: 0,
      },
      grid: { display: false },
    },
  },
};
</script>

<style scoped>
@keyframes fade-in {
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
}

.animate-fade-in {
  animation: fade-in 0.5s ease-out;
}
</style>
