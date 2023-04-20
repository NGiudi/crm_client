<script setup>
  import AppLayout from "../../components/layout/AppLayout/AppLayout.vue";
  import PaginatedDataTable from "../../components/layout/PaginatedDataTable.vue";

  import { getProducts } from "../../services/axios/requests/products";
</script>

<template>
  <AppLayout>
    <PaginatedDataTable
      :data="dataTable"
      :fields="productFields"
      @onChangePage="getPage"
      :pages="statsTable.pages"
    />
  </AppLayout>
</template>

<script>
  export default {
    data() {
      return {
        dataTable: [],
        statsTable: {},
        productFields: [
          {
            key: "name",
            name: "Nombre",
          },
          {
            key: "brand_name",
            name: "Marca",
          },
        ],
      };
    },
    methods: {
      getPage(page) {
        const queryObj = { page };
 
        getProducts(queryObj).then((res) => {
          this.dataTable = res.products;
          this.statsTable = res.stats; 
        });
      },
    },
    mounted() {
      this.getPage(1);
    },
  }
</script>