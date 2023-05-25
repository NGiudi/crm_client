<script setup>
  import { useProductCartStore } from "../../stores/productCartStore";

  import AppLayout from '../../components/AppLayout/AppLayout.vue';
  import ProductCartList from '../../components/lists/ProductsList/ProductCartList.vue';
  import ProductsSearch from "../../components/searchs/ProductsSearch/ProductsSearch.vue";
</script>

<template>
  <AppLayout>
    <ProductsSearch @onAddProduct="handleAddProduct"/>

    <h2 class="mt-4 subtitle">
      Productos Agregados a la venta
    </h2>

    <ProductCartList />
  </AppLayout>
</template>

<script>
  export default {
    data() {
      return {
        productsInCart: [],
      };
    },
    methods: {
      handleAddProduct(product) {
        const { addProduct } = useProductCartStore();
        addProduct(product);
      },
    },
    components: { ProductCartList }
  }
</script>

<style scoped>

</style>