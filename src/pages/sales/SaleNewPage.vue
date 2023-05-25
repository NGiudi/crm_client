<script setup>
  import AppLayout from '../../components/AppLayout/AppLayout.vue';
  import ProductsSearch from "../../components/searchs/ProductsSearch/ProductsSearch.vue";
</script>

<template>
  <AppLayout>
    <ProductsSearch @onAddProduct="handleAddProduct"/>

    <h2 class="mt-4 subtitle">
      Productos Agregados a la venta
    </h2>

    <!-- TODO: agregar esta tabla en un componente aparte -->
    <table class="table">
      <tbody>
        <table class="table">
          <tbody>
            <tr :key="idx" v-for="(product, idx) in productsInCart">
  
              <td>{{ product.name }}</td>
  
              <td>{{ product.brand_name }}</td>
            
              <th>{{ product.stock }}</th>
              
              <th class="text-end">
                <input type="number" />
              </th>
            </tr>
          </tbody>
        </table>
      </tbody>
    </table>
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
        this.productsInCart.push(product);
      },
    },
  }
</script>

<style scoped>

</style>