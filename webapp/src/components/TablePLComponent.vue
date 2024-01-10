<template>
  <div class="q-pa-xs">
    <q-table flat bordered ref="tableRef" :title="'Cardiology Report'" :rows="rows" :columns="columns" row-key="name" :rows-per-page-options="[10, 25, 50, 0]"
      color="amber">
    </q-table>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType, ref } from 'vue';
import { IndexSummaryUI } from './models';
import { exists } from 'src/boot/empty';
import { data } from 'autoprefixer';
import { standardDate } from '../boot/formatters';

export default defineComponent({
  name: 'TablePLComponent',
  setup() {
    let USDollar = new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    });

    function isInRed(row: any): boolean {
      return (
        (exists(row.estimatedReimbursement)
          ? parseFloat(row.estimatedReimbursement)
          : -1) < (exists(row.billed) ? parseFloat(row.billed) : -1)
      );
    }
    const redColor = '#D32F2Fcc';
    const columns = [
      {
        name: 'case',
        label: 'Case',
        field: 'title',
        align: 'left',
        style: (row) =>
          isInRed(row) ? 'background:' + redColor + '; color:white;' : '',
        sortable: true,
      },
      {
        name: 'periodStart',
        align: 'left',
        label: 'Time',
        field: 'periodStart',
        format: (val) => `${standardDate(val)}`,
        style: (row) =>
          isInRed(row) ? 'background:' + redColor + '; color:white;' : '',
        sortable: true,
      },
      {
        name: 'billed',
        required: true,
        label: 'Billed',
        align: 'left',
        field: 'billed',
        format: (val) => USDollar.format(val),
        style: (row) =>
          isInRed(row) ? 'background:' + redColor + '; color:white;' : '',
        sortable: true,
      },
      {
        name: 'estimatedReimbursement',
        align: 'right',
        label: 'Estimated Reimbursement',
        field: 'estimatedReimbursement',
        format: (val) => USDollar.format(val),
        style: (row) =>
          isInRed(row) ? 'background:' + redColor + '; color:white;' : '',
        sortable: true,
      },
    ];
    const tableRef = ref();
    const rows = [
      {
        title: "Case A",
        periodStart: new Date(Date.now() - 60*60*24*1000*2).toISOString(),
        billed: 53928.23,
        estimatedReimbursement: 52729.16
      },

      {
        title: "Case B",
        periodStart: new Date(Date.now() - 60*60*24*1000*3).toISOString(),
        billed: 73788.93,
        estimatedReimbursement: 74729.66
      },

      {
        title: "Case C",
        periodStart: new Date(Date.now() - 60*60*24*1000*4).toISOString(),
        billed: 9527.80,
        estimatedReimbursement: 8629.85
      }
    ]
    console.log(rows)
    return { USDollar,
      tableRef,
      columns,
      rows
     };
  },
});
</script>
