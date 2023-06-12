<script setup>
import Pagination from "../Pagination.vue";

import { getProducts } from "../../../services/axios/productsService";

import { PATHS } from "../../../assets/constants/constants";
</script>

<template>
  <table class="table">
    <thead>
      <tr>
        <th scope="col">Nombre</th>

        <th scope="col">Marca</th>

        <th scope="col">Stock</th>

        <th scope="col">Estado</th>
      </tr>
    </thead>

    <tbody>
      <tr
        :class="{ 'sinStock': product.stock === 0, 'bajoStock': product.stock <= 10 && product.stock > 0, 'stockValido': product.stock > 10 }"
        @click="handleRowClick(product.id)" :key="idx" v-for="(product, idx) in data">
        <td>{{ product.name }}</td>

        <td>{{ product.brand_name }}</td>

        <td>{{ product.stock }}</td>

        <td>
          <!-- TODO: guardar valores en constantes -->
          <span v-if="product.stock === 0">Sin stock</span>
          <span v-else-if="product.stock <= 10">Stock bajo</span>
          <span v-else>Normal</span>
        </td>
      </tr>
    </tbody>
  </table>

  <Pagination v-if="stats.pages > 1" :pages="stats.pages" @onClick="changePage" />
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
    changePage(page) {
      this.getPage(page);
    },
    getPage(page) {
      const queryObj = {
        page: page,
      };

      getProducts(queryObj).then((res) => {
        this.data = res.products;
        this.stats = res.stats;
      })
        .catch((err) => console.error(err));
    },
    handleRowClick(id) {
      this.$router.push(`${PATHS.productsList}/${id}`);
    },
  },
  mounted() {
    this.getPage(1);
  },
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

.sinStock {
  color: var(--color-text-danger);
}

.bajoStock {
  color: var(--color-text-warning);
}

.stockValido {
  color: var(--color-primary);
}
</style>