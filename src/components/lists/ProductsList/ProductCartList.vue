<script setup>
  import { useProductCartStore } from '../../../stores/productCartStore';

  import { storeToRefs } from 'pinia';

  const productCartStore = useProductCartStore();
  const { products } = storeToRefs(productCartStore);
</script>

<template>
  <table class="table">
    <thead>
      <tr>
        <th>Producto</th>
        <th>Marca</th>
        <th>Stock</th>
        <th>Precio unitario</th>
        <th>Cantidad</th>
        <th></th>
      </tr>
    </thead>

    <tbody>
      <tr :key="idx" v-for="(product, idx) in products">
        <td>{{ product.name }}</td>
        <td>{{ product.brand_name }}</td>
        <td>{{ product.stock }}</td>
        <td>{{ product.price }}</td>
        
        <td>
          <input type="number" v-model="product.quantity" />
        </td>

        <td class="text-end">
          <button @click="handleDeleteProduct(product)">Eliminar</button>
        </td>
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