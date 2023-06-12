<script setup>
import { storeToRefs } from "pinia";

import { useProductCartStore } from "../../stores/productCartStore";

import AppLayout from '../../components/AppLayout/AppLayout.vue';
import ProductCartList from '../../components/lists/ProductsList/ProductCartList.vue';
import ProductsSearch from "../../components/searchs/ProductsSearch/ProductsSearch.vue";

import { createSale } from "../../services/axios/salesService";

import { PATHS } from "../../assets/constants/constants";

const loggedUserStore = useProductCartStore();
const { client } = storeToRefs(loggedUserStore);
</script>

<template>
  <AppLayout>
    <form class="needs-validation" novalidate @submit.prevent="handleSubmit">
      <div class="mb-2">
        <label class="form-label">
          Cliente
        </label>

        <input @change="handleChangeClient" class="form-control" :defaultValue="client" required type="text" />

        <div class="invalid-feedback">
          Campo requerido
        </div>
      </div>

      <h2 class="my-4 subtitle">
        Productos agregados a la venta
      </h2>

      <div class="alert alert-danger d-flex align-items-center mb-4" role="alert" v-if="errorMessage">
        <span class=" flex-shrink-0 me-2 fas fa-exclamation-triangle"></span>
        <div>
          {{ errorMessage }}
        </div>
      </div>

      <ProductsSearch class="mb-3" @onAddProduct="handleAddProduct" />

      <ProductCartList />

      <div class="mt-5 text-end">
        <button class="button button-solid" type="submit">
          Finalizar venta
        </button>
      </div>
    </form>
  </AppLayout>
</template>

<script>
export default {
  data() {
    return {
      errorMessage: null,
      productsInCart: [],
    };
  },
  methods: {
    handleAddProduct(product) {
      const { addProduct } = useProductCartStore();
      addProduct(product);
    },
    handleChangeClient(e) {
      const { setClient } = useProductCartStore();
      setClient(e.target.value);
    },
    handleSubmit(e) {
      if (e.target.checkValidity()) {
        const { clearCart, createRequestObject } = useProductCartStore();
        const saleObj = createRequestObject();

        if (saleObj.products.length !== 0) {
          createSale(saleObj)
            .then((sale) => {
              this.errorMessage = null;

              clearCart();
              this.$router.push(`${PATHS.salesList}/${sale.id}`);
            })
            .catch((err) => {
              const { message } = err.response.data;

              if (message === "products without stock")
                this.errorMessage = "No se puede concretar la venta porque hay productos que no tienen stock o tiene un valor inválido.";
            });
        } else {
          this.errorMessage = "No se puede concretar la venta porque debe ingresar productos.";
        }

      }

      e.target.classList.add("was-validated");
    },
  }
}
</script>

<style scoped></style>