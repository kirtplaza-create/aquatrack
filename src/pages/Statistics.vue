<template>
  <div class="p-6 space-y-6 bg-[#f5f7fb] min-h-screen">
    <!-- Header -->
    <div class="flex items-center justify-between">
      <div>
        <h1 class="text-2xl font-semibold text-[#111827]">
          Revenue Analytics
        </h1>
        <p class="text-sm text-gray-500">
          Comprehensive gross revenue insights and trends
        </p>
      </div>
      <div
        class="flex items-center gap-2 bg-white rounded-full px-4 py-2 shadow-sm text-xs text-gray-500"
      >
        <span class="h-2 w-2 rounded-full bg-green-400"></span>
        <span>Live Data</span>
        <span class="text-gray-400">·</span>
        <span>Real-time Updates</span>
      </div>
    </div>

    <!-- Calendar + 3 cards -->
    <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <!-- Selector panel -->
      <div class="bg-white rounded-2xl shadow-sm p-4 lg:col-span-1">
        <div class="flex items-center justify-between mb-4">
          <button
            type="button"
            class="h-8 w-8 flex items-center justify-center rounded-full hover:bg-gray-100"
            @click="shift(-1)"
          >
            ‹
          </button>

          <div
            class="text-sm font-medium text-gray-700 cursor-pointer"
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
            class="h-8 w-8 flex items-center justify-center rounded-full hover:bg-gray-100"
            @click="shift(1)"
          >
            ›
          </button>
        </div>

        <!-- YEARS VIEW -->
        <div v-if="viewMode === 'years'">
          <div class="grid grid-cols-3 gap-3 text-xs">
            <button
              v-for="year in yearCards"
              :key="year.value"
              type="button"
              class="py-3 rounded-xl border text-center transition"
              :class="
                year.value === selectedYear
                  ? 'bg-emerald-500 text-white border-emerald-500'
                  : 'bg-gray-50 text-gray-700 hover:bg-gray-100 border-transparent'
              "
              @click="selectYear(year.value)"
            >
              <div class="font-medium">{{ year.value }}</div>
              
            </button>
          </div>
        </div>

        <!-- YEAR VIEW (months) -->
        <div v-else-if="viewMode === 'year'">
          <div class="grid grid-cols-3 gap-3 text-xs">
            <button
              v-for="(m, idx) in monthCards"
              :key="m.key"
              type="button"
              class="py-3 rounded-xl border text-center transition"
              :class="
                idx === selectedMonthIndex
                  ? 'bg-blue-600 text-white border-blue-600'
                  : 'bg-gray-50 text-gray-700 hover:bg-gray-100 border-transparent'
              "

              @click="selectMonth(idx)"
            >
              <div class="font-medium">{{ m.label }}</div>
              <div class="text-[11px] text-gray-400">
                ₱{{ formatMoney(m.total) }}
              </div>
            </button>
          </div>
        </div>

        <!-- MONTH VIEW (days) -->
        <div v-else>
          <div class="grid grid-cols-7 text-[11px] text-center text-gray-400 mb-2">
            <span>Sun</span><span>Mon</span><span>Tue</span>
            <span>Wed</span><span>Thu</span><span>Fri</span><span>Sat</span>
          </div>

          <div class="grid grid-cols-7 gap-y-2 text-xs text-center text-gray-600">
            <span
              v-for="n in firstDayOffset"
              :key="'b-' + n"
              class="flex items-center justify-center h-8"
            />
            <span
              v-for="day in daysInMonth"
              :key="day"
              class="flex items-center justify-center"
            >
              <button
                type="button"
                class="h-8 w-8 flex items-center justify-center rounded-xl transition"
                :class="
                  selectedDay === day
                    ? 'bg-[#2563eb] text-white shadow'
                    : 'hover:bg-gray-100'
                "
                @click="selectDay(day)"
              >
                {{ day }}
              </button>
            </span>
          </div>
        </div>
      </div>

      <!-- Three cards -->
      <div class="lg:col-span-2 flex flex-col gap-4">
        <!-- Selected Period -->
        <div
          class="bg-gradient-to-r from-[#2563eb] to-[#1d4ed8] text-white rounded-2xl p-5 shadow-sm"
        >
          <div class="flex items-center justify-between mb-1">
            <div class="flex items-center gap-2 text-xs">
              <div
                class="h-8 w-8 rounded-xl bg-white/10 flex items-center justify-center"
              >
                ₱
              </div>
              <div class="uppercase tracking-wide opacity-80">
                Selected Period
              </div>
            </div>
            <div class="text-[11px] opacity-80">
              {{ revenue.from }} – {{ revenue.to }}
            </div>
          </div>
          <div class="mt-2 text-4xl font-semibold">
            ₱{{ formatMoney(totalMonthlyRevenue) }}
          </div>
        </div>

        <!-- Average Revenue -->
        <div class="bg-white rounded-2xl shadow-sm p-5">
          <div class="flex items-center gap-2 mb-2">
            <div
              class="h-8 w-8 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center text-sm"
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

        <!-- Total Revenue -->
        <div class="bg-white rounded-2xl shadow-sm p-5">
          <div class="flex items-center gap-2 mb-2">
            <div
              class="h-8 w-8 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center text-sm"
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
    <div class="bg-white rounded-2xl shadow-sm p-5">
      <div class="flex items-center justify-between mb-2">
        <div class="flex items-center gap-2">
          <div
            class="h-8 w-8 rounded-xl bg-blue-500 text-white flex items-center justify-center text-sm"
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

      <div class="mt-4 h-64">
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
const now = new Date()
const selectedYear = ref(now.getFullYear())
const selectedMonthIndex = ref(now.getMonth())
const selectedDay = ref(null) // <- was now.getDate()


// cache: graph always uses these (month) points
const monthPoints = ref([]);
const monthlyTotals = computed(() => {
  const sums = Array(12).fill(0)

  for (const p of revenue.yearPoints) {
    const d = new Date(p.date)
    if (d.getFullYear() === selectedYear.value) {
      sums[d.getMonth()] += Number(p.amount || 0)
    }
  }

  return sums
})


// ------- REVENUE TOTAL & AVERAGE -------

// total revenue for the loaded month
const totalMonthlyRevenue = computed(() =>
  monthPoints.value.reduce((sum, p) => sum + Number(p.amount || 0), 0)
)

// number of days that actually have revenue (avoid divide by 0)
const daysWithRevenueCount = computed(() => {
  const count = monthPoints.value.filter(p => Number(p.amount || 0) > 0).length
  return count || 1
})

// average revenue per day that has data
const averageDailyRevenue = computed(() =>
  totalMonthlyRevenue.value / daysWithRevenueCount.value
)

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
  const labels = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec']

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

// initial: load current month
onMounted(() => {
  fetchForMonth(selectedYear.value, selectedMonthIndex.value);
});

// navigation
function stepUp() {
  if (viewMode.value === 'month') viewMode.value = 'year';
  else if (viewMode.value === 'year') viewMode.value = 'years';
}

async function shift(offset) {
  if (viewMode.value === 'years') {
    yearsWindowStart.value += offset * 12
    return
  }

  if (viewMode.value === 'year') {
    selectedYear.value += offset
    selectedDay.value = null
    await fetchForMonth(selectedYear.value, selectedMonthIndex.value)
    return
  }

  // month view
  let month = selectedMonthIndex.value + offset
  let year = selectedYear.value

  if (month < 0) {
    month = 11
    year -= 1
  } else if (month > 11) {
    month = 0
    year += 1
  }

  selectedYear.value = year
  selectedMonthIndex.value = month
  selectedDay.value = null
  await fetchForMonth(year, month)
}

onMounted(async () => {
  await revenue.fetchYearStats(selectedYear.value)
  await fetchForMonth(selectedYear.value, selectedMonthIndex.value)
})

async function selectYear(year) {
  selectedYear.value = year
  selectedMonthIndex.value = 0
  selectedDay.value = null
  viewMode.value = 'year'
  await revenue.fetchYearStats(selectedYear.value)
  await fetchForMonth(selectedYear.value, selectedMonthIndex.value)
}


async function selectMonth(idx) {
  selectedMonthIndex.value = idx
  selectedDay.value = null
  viewMode.value = 'month'
  await fetchForMonth(selectedYear.value, idx)
}


// clicking a day: load that day for cards + graph
async function selectDay(day) {
  selectedDay.value = day

  const year = selectedYear.value
  const month = String(selectedMonthIndex.value + 1).padStart(2, '0')
  const dd = String(day).padStart(2, '0')
  const from = `${year}-${month}-${dd}`
  const to = from

  // fetch stats for the single day
  await revenue.fetchStats(from, to)

  // now graph + totals use just this day
  monthPoints.value = Array.isArray(revenue.points)
    ? JSON.parse(JSON.stringify(revenue.points))
    : []
}


async function fetchForMonth(year, monthIndex) {
  const month = String(monthIndex + 1).padStart(2, '0');
  const lastDay = new Date(year, monthIndex + 1, 0).getDate();
  const from = `${year}-${month}-01`;
  const to = `${year}-${month}-${String(lastDay).padStart(2, '0')}`;

  await revenue.fetchStats(from, to);

  // copy current points into monthPoints (graph source)
  monthPoints.value = Array.isArray(revenue.points)
    ? JSON.parse(JSON.stringify(revenue.points))
    : [];
}

// money format
function formatMoney(value) {
  return Number(value || 0).toLocaleString('en-PH', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
}

// bar chart: x-axis shows day numbers only
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
        backgroundColor: 'rgba(37, 99, 235, 0.7)',
        borderRadius: 6,
        maxBarThickness: 18,
      },
    ],
  };
});

// options with tooltip showing full date
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
      ticks: { color: '#9CA3AF', font: { size: 10 } },
      grid: { color: '#E5E7EB' },
    },
    x: {
      ticks: { color: '#9CA3AF', font: { size: 10 }, maxRotation: 0 },
      grid: { display: false },
    },
  },
};
</script>
