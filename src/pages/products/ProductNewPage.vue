<script setup>
import AppLayout from '../../components/AppLayout/AppLayout.vue';
import { createProduct } from '../../services/axios/productsService';
import { PATHS } from "../../assets/constants/constants";
</script>
<template>
  <AppLayout>
    <form class="needs-validation" novalidate @submit.prevent="handleSubmit">
      <div class="mb-3">
        <label>Marca</label>
        <input v-model="newProduct.brand_name" required class="form-control" />
        <div class="invalid-feedback">
          Campo obligatorio
        </div>
      </div>

      <div class="mb-3">
        <label>Nombre</label>
        <input v-model="newProduct.name" required class="form-control" />
        <div class="invalid-feedback">
          Campo obligatorio
        </div>
      </div>

      <div class="mb-3">
        <label>Descripcion</label>
        <input v-model="newProduct.description" required class="form-control" />
        <div class="invalid-feedback">
          Campo obligatorio
        </div>
      </div>

      <div class="mb-3">
        <label>Precio</label>
        <input type="number" v-model="newProduct.price" min="0" required class="form-control" />
        <div class="invalid-feedback">
          <span v-if="!newProduct.price"> Campo obligatorio </span>
          <span v-else> Campo inválido </span>
        </div>
      </div>

      <div class="mb-3">
        <label>Stock</label>
        <input type="number" v-model="newProduct.stock" min="0" required class="form-control" />
        <div class="invalid-feedback">
          <span v-if="!newProduct.stock"> Campo obligatorio </span>
          <span v-else> Campo inválido </span>
        </div>
      </div>

      <div class="mb-3">
        <label>Descuento</label>
        <input type="number" v-model="newProduct.discount" defaultValue="0" min="0" max="100" class="form-control" />
        <div class="invalid-feedback">
          Campo inválido
        </div>
      </div>


      <div class="mt-5 text-end">
        <button class="button button-solid" type="submit">
          Crear producto
        </button>
      </div>
    </form>
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
    handleSubmit(e) {
      if (e.target.checkValidity()) {
        createProduct(this.newProduct)
          .then(resp => (this.$router.push(`${PATHS.productsList}/${resp.id}`)))
      }
      e.target.classList.add("was-validated");
    }
  }
}
</script>

<style scoped></style>