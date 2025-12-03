<template>
  <div class="w-full h-72 md:h-80">
    <Line
      id="revenue-line-chart"
      :options="chartOptions"
      :data="chartData"
      class="animate-[fadeInUp_0.6s_ease-out]"
    />
  </div>
</template>

<script>
import { Line } from 'vue-chartjs'
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  LineElement,
  PointElement,
  CategoryScale,
  LinearScale
} from 'chart.js'

ChartJS.register(
  Title,
  Tooltip,
  Legend,
  LineElement,
  PointElement,
  CategoryScale,
  LinearScale
)

export default {
  name: 'RevenueLineChart',
  components: { Line },
  props: {
    labels: {
      type: Array,
      required: true
    },
    values: {
      type: Array,
      required: true
    }
  },
    computed: {
    chartData() {
      return {
        labels: this.labels,
        datasets: [
          {
            label: 'Revenue',
            data: this.values,
            borderColor: '#246af3', // blue line
            backgroundColor: 'rgba(36,106,243,0.12)', // soft blue fill
            pointBackgroundColor: '#246af3',
            pointBorderColor: '#ffffff',
            pointRadius: 4,
            tension: 0.4,
            fill: true
          }
        ]
      }
    },
    chartOptions() {
      return {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            display: false
          },
          tooltip: {
            backgroundColor: '#111827',
            padding: 10,
            cornerRadius: 8,
            callbacks: {
              label(context) {
                const value = context.parsed.y || 0
                return `Revenue: ₱${value.toLocaleString()}`
              }
            }
          }
        },
        scales: {
          x: {
            ticks: { color: '#9ca3af' },
            grid: { display: false }
          },
          y: {
            ticks: { color: '#9ca3af' },
            grid: { color: 'rgba(209,213,219,0.4)', drawBorder: false }
          }
        }
      }
    }
  }
}
</script>
