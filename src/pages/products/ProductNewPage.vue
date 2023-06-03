<script setup>
import AppLayout from '../../components/AppLayout/AppLayout.vue';
import { createProduct } from '../../services/axios/productsService';
import { PATHS } from "../../assets/constants/constants";
</script>
<template>
  <AppLayout>

      <div class="mb-3">
        <label>Marca</label>
        <input v-model="hola" class="form-control" />
      </div>

      <div class="mb-3">
        <label>Nombre</label>
        <input v-model="newProduct.names" class="form-control" />
      </div>
 
      <div class="mb-3">
        <label>Descripcion</label>
        <input v-model="newProduct.names" class="form-control" />
      </div>

      <div class="mb-3">
        <label>Precio</label>
        <input v-model="newProduct.last_name" class="form-control" />
      </div>

      <div class="mb-3">
        <label>Stock</label>
        <input v-model="newProduct.phone" class="form-control" />
      </div>

      <div class="mb-3">
        <label>Descuento</label>
        <input v-model="newProduct.phone" class="form-control" />
      </div>
 

      <div class="mt-5 text-end">
        <button class="button button-solid" @click="handleSubmit">
          Crear producto
        </button>
      </div>
  </AppLayout>
</template>

<script>
  export default {
    data() {
      return {
        newProduct: {},
      };
    },
    methods: {
      handleSubmit(){
        console.log(this.newProduct)
        createProduct(this.newProduct)
        .then (resp => (this.$router.push(`${PATHS.productsList}/${resp.id}`)))
      }
    }
  }
</script>

<style scoped>

</style>