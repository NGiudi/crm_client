<script setup>
import AppLayout from '../../components/AppLayout/AppLayout.vue';
import SalesList from '../../components/lists/SalesList/SalesList.vue';

import { getSales } from '../../services/axios/salesService';

import { PATHS } from '../../assets/constants/constants';
</script>

<template>
  <AppLayout>
    <div class="text-end">
      <button class="button button-solid" @click="goToNewSale">
        Nueva venta
      </button>
    </div>

    <SalesList @onChangePage="handleChangePage" :sales="data" :stats="stats" />
  </AppLayout>
</template>

<script>
export default {
  data() {
    return {
      data: [],
      stats: {},
    };
  },
  methods: {
    getPage(page) {
      const queryObj = {
        page: page,
      };

      getSales(queryObj).then((res) => {
        this.data = res.sales;
        this.stats = res.stats;
      })
        .catch((err) => console.error(err));
    },
    goToNewSale() {
      this.$router.push(PATHS.salesNew);
    },
    handleChangePage(page) {
      this.getPage(page);
    },
  },
  mounted() {
    this.getPage(1);
  },
}

</script>

<style scoped></style>