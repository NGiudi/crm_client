<script setup>
import Pagination from "../Pagination.vue";

import { PATHS } from "../../../assets/constants/constants";
</script>

<template>
  <table class="table">
    <thead>
      <tr>
        <th scope="col">Nro orden</th>
        <th scope="col">Vendedor</th>
        <th scope="col">Cliente</th>
        <th scope="col">Total</th>
      </tr>
    </thead>

    <tbody>
      <tr @click="handleRowClick(sale.id)" :key="idx" v-for="(sale, idx) in sales">
        <td>{{ sale.id }}</td>
        <td>{{ sale.user?.names + " " + sale.user?.last_name }}</td>
        <td>{{ sale.client }}</td>
        <td>{{ sale.price }}</td>
      </tr>
    </tbody>
  </table>

  <Pagination v-if="stats.pages > 1" :pages="stats.pages" @onClick="handleChangePage" />
</template>


<script>
export default {
  emits: ["onChangePage"],
  methods: {
    handleChangePage(page) {
      this.$emit("onChangePage", page);
    },
    handleRowClick(id) {
      this.$router.push(`${PATHS.salesList}/${id}`);
    },
  },

  props: ["sales", "stats"],
};
</script>

<style scoped>
tbody tr:hover {
  background-color: var(--color-backgroud-components);
  cursor: pointer;
}

tbody tr:active {
  background-color: var(--color-background-inputs);
  cursor: pointer;
}
</style>