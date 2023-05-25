<script setup>
  import { useProductCartStore } from '../../../stores/productCartStore';

  import { storeToRefs } from 'pinia';

  const productCartStore = useProductCartStore();
  const { products } = storeToRefs(productCartStore);
</script>

<template>
  <table class="table">
    <tbody>
      <tr :key="idx" v-for="(product, idx) in products">

        <td>{{ product.name }}</td>

        <td>{{ product.brand_name }}</td>
      
        <th>{{ product.stock }}</th>
        
        <th class="text-end">
          <input type="number" v-model="product.quantity" />
        </th>

        <th class="text-end">
          <button @click="handleDeleteProduct(product)">Eliminar</button>
        </th>
      </tr>
    </tbody>
  </table>
</template>

<script>
  export default {
    data() {
      return {
      };
    },
    methods: {
      handleDeleteProduct(product) {
        const { deleteProduct } = useProductCartStore();
        deleteProduct(product.id);
      },
    },
    props: ["list"],
  };
</script>