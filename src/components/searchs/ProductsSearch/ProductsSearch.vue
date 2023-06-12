<script setup>
import { debounce } from "lodash";

import ProductsSearchPanel from "./components/ProductsSearchPanel.vue";

import { getProducts } from "../../../services/axios/productsService";
</script>

<template>
  <div class="search-wrapper" ref="wrapper">
    <input class="input" @focus="openPanel" @input="handleInput" placeholder="Buscar producto..." v-model="inputValue" />

    <ProductsSearchPanel @onAddProduct="handleAddProduct" :options="options" :showPanel="showPanel" />
  </div>
</template>

<script>
export default {
  beforeUnmount() {
    document.removeEventListener("keydown", this.handleClickOutside);
  },
  data() {
    return {
      inputValue: "",
      options: [],
      showPanel: false,
    };
  },
  emits: ["onAddProduct"],
  methods: {
    handleAddProduct(product) {
      this.$emit("onAddProduct", product);
    },
    handleClickOutside(event) {
      if (this.$refs.wrapper &&
        !this.$refs.wrapper.contains(event.target)) {
        this.showPanel = false;
      }
    },
    handleInput: debounce(function () {
      const queryObj = {
        q: this.inputValue,
      };

      getProducts(queryObj)
        .then((res) => {
          this.options = res.products;
        })
        .catch((err) => console.error(err));
    }, 1000),
    openPanel() {
      this.showPanel = true;
    },
  },
  mounted() {
    document.addEventListener("click", this.handleClickOutside);
  },
  props: ["onAddProduct"],
};
</script>

<style scoped>
.panel {
  background-color: var(--color-background-inputs);
  border-radius: 2px;
  bottom: -8px;
  box-sizing: border-box;
  left: 0;
  max-height: 250px;
  overflow: auto;
  padding: 10px;
  position: absolute;
  transform: translate(0, 100%);
  width: 100%;
}

.search-wrapper {
  position: relative;
  box-sizing: border-box;
}
</style>