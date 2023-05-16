<script setup>
  import { getProducts } from "../../../services/axios/products";

  import Pagination from "../Pagination.vue";
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
      <tr v-for="product in data">
        <td>{{ product.name }}</td>

        <td>{{ product.brand_name }}</td>
        
        <th>{{ product.stock }}</th>
        
        <th>
          <!-- TODO: guardar valores en constantes -->
          <span v-if="product.stock === 0">sin stock</span>
          <span v-else-if="product.stock <= 10">stock bajo</span>
          <span v-else>-</span>
        </th>
      </tr>
    </tbody>
  </table>

  <Pagination v-if="stats.pages > 1" :pages="stats.pages" @onClick="changePage"/>
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
    },
    mounted() {
      this.getPage(1);
    },
  };
</script>