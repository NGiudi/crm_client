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
        <td class="align-middle">{{ product.name }}</td>
        <td class="align-middle">{{ product.brand_name }}</td>
        <td class="align-middle">{{ product.stock }}</td>
        <td class="align-middle">{{ product.price }}</td>
        
        <td class="align-middle">
          <input class="form-control" min="1" :max="product.stock" type="number" v-model="product.quantity" />
        </td>

        <td class=" align-middle text-end">
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