<script setup>
  import { useProductCartStore } from "../../stores/productCartStore";

  import AppLayout from '../../components/AppLayout/AppLayout.vue';
  import ProductCartList from '../../components/lists/ProductsList/ProductCartList.vue';
  import ProductsSearch from "../../components/searchs/ProductsSearch/ProductsSearch.vue";

  import { createSale } from "../../services/axios/salesService";
</script>

<template>
  <AppLayout>
    <label class="label">
      Cliente
      <input class="input" @change="handleChangeClient" />
    </label>

    <h2 class="my-4 subtitle">
      Productos agregados a la venta
    </h2>

    <ProductsSearch class="mb-3" @onAddProduct="handleAddProduct"/>

    <ProductCartList />

    <div class="mt-5 text-end">
      <button class="button button-solid" @click="handleFinishSale">
        Finalizar venta
      </button>
    </div>
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
      handleChangeClient(e){
        const { setClient } = useProductCartStore();
        setClient(e.target.value);
      },
      handleFinishSale() {
        const { createRequestObject } = useProductCartStore();
        const saleObj = createRequestObject();

        createSale(saleObj).then((res) => console.log(res)); //TODO: terminar esto.
      },
    }
  }
</script>

<style scoped>

</style>