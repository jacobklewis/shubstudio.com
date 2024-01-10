<template>
  <div class="col col-md-4 col-sm-6 col-xs-12" style="padding: 4px; overflow: hidden;">
    <q-card dark bordered class="my-card" :style="'background-color:' +
      (data.billed < 0
        ? '#bbbbbb'
        : data.billed <= data.insurance
          ? '#43A047'
          : '#D32F2F') +
      '; opacity:' +
      (data.billed >= 0 ? data.insurance : '1')
      ">
      <apexchart v-if="data.graphData != undefined"
        style="position: absolute; padding-top: 32px; padding-left: 0px; padding-right: 0px; top: 0px; width: 100%;"
        height="150px" type="line" :options="chartOptions" :series="series"></apexchart>
      <q-card-section>
        <div :style="data.graphData != undefined ? 'height: 150px;' : ''">
          <div v-if="data.billed >= 0" class="text-h6 float-right">
            {{ USDollar.format(data.insurance - data.billed) }}
          </div>
          <div v-if="data.billed >= 0 || data.billed == -2" class="text-h6" style="overflow: hidden;">{{ data.summary }}
          </div>

          <i v-if="data.billed >= 0" :class="data.billed <= data.insurance
            ? 'fa-solid fa-caret-up'
            : 'fa-solid fa-caret-down'
            "></i>
          <div v-if="data.billed >= 0" class="text-subtitle2">
            {{
              data.billed <= data.insurance ? '+' + Math.round(((data.insurance - data.billed) / data.billed) * 100) + '%'
              : '-' + Math.round(((data.billed - data.insurance) / data.billed) * 100) + '%' }} </div>
              <q-skeleton height="50px" v-if="data.billed == -1" type="text" />
              <q-skeleton v-if="data.billed == -1" type="text" />
              <q-skeleton v-if="data.billed == -1" type="text" />
          </div>

      </q-card-section>


      <q-card-section>
        <div v-if="data.billed >= 0">
          Total Billed: {{ USDollar.format(data.billed) }}
        </div>
        <div v-if="data.billed >= 0">
          Actual Payout: {{ USDollar.format(data.insurance) }}
        </div>
        <q-skeleton v-if="data.billed == -1" type="text" />
        <q-skeleton v-if="data.billed == -1" type="text" />
      </q-card-section>
      <q-card-actions v-if="data.location !== undefined">
        <q-btn :to="data.location" flat>Details</q-btn>
      </q-card-actions>
    </q-card>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';
import { IndexSummaryUI } from './models';
import { data } from 'autoprefixer';

export default defineComponent({
  name: 'IndexSummaryComponent',
  props: {
    data: {
      type: Object as PropType<IndexSummaryUI>,
      required: true,
    },
    index: Number,
  },
  data: (props) => ({
    chartOptions: {

      colors: ['#ffffff55', '#ffffff'],
      xaxis: {
        // type: 'datetime',
        labels: {
          show: false
        },
        axisBorder: {
          show: false,
        },
        axisTicks: {
          show: false,
        }
      },
      yaxis: {
        show: false,
        labels: {
          style: {
            colors: ['#ffffff'],
            cssClass: 'apexcharts-yaxis-label',
          },
          formatter: function (value) {
            return '$' + Math.round(value * 100) / 100;
          }
        },
      },
      stroke: {
        curve: 'smooth',
        dashArray: [0, 5]
        // OR provide an array
        // curve: ['smooth', 'straight', 'stepline']
      },
      legend: {
        show: true,
        labels: {
          colors: ['#ffffff', '#ffffff'],
        },
      },
      grid: {
        show: false,
        yaxis: {
          lines: {
            show: false
          }
        },
        padding: { left: 0, right: 0, top: 0, bottom: -10 },
      },
      // plotOptions: {
      //   area: {
      //     fillTo: 'origin',
      //   }
      // },
      chart: {
        toolbar: {
          show: false
        },
        zoom: {
          enabled: false,
        },
        sparkline: {
          enabled: false
        }
      },

      dataLabels: {
        enabled: false
      },
      tooltip: {
        enabled: false,
      }

    },



  }),
  computed: {
    series() {
      return [
        {
          name: 'Total Billed',
          data: this.data.graphData || []
        },

        {
          name: 'Actual Payout',
          data: this.data.graphData2 || []
        }
      ]
    }
  },
  setup() {
    let USDollar = new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    });
    return { USDollar };
  },
});
</script>
