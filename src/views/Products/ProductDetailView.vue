<script setup>
  import AppLayout from "../../components/layout/AppLayout/AppLayout.vue";
  import PaginatedDataTable from "../../components/layout/PaginatedDataTable.vue";

  import { getProductWithVariants } from "../../services/axios/requests/products";
</script>

<template>
  <AppLayout>
    <h1 class="title">{{ data.product.name }}</h1>
    <h2 class="mb-5 subtitle">{{ data.product.brand_name }}</h2>

    <!-- TODO: Agregar paginación -->
    <!-- TODO: Aca no debería tener detalles -->
    <PaginatedDataTable
      :data="data.variants"
      :fields="variantsFields"
      :pages="data.variants_stats.pages"
    />
  </AppLayout>
</template>

<script>
  export default {
    data() {
      return {
        data: {
          product: {},
          variants: {},
          variants_stats: {},
        },
        variantsFields: [
          {
            key: "description",
            name: "Descripción",
          },
          {
            key: "name",
            name: "Graduación",
          },
          {
            key: "package_count",
            name: "Cantidad",
          },
          {
            key: "price",
            name: "Precio unitario",
          },
        ],
      };
    },
    methods: {
      getProductDetail() {
        const { id } = this.$router.currentRoute.value.params;

        getProductWithVariants(id).then((res) => {
          this.data = res;
        });
      },
    },
    mounted() {
      this.getProductDetail();
    },
  }
</script>