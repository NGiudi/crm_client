<script setup>
import { PATHS } from '../../assets/constants/constants';
import AppLayout from '../../components/AppLayout/AppLayout.vue';
import ProductsList from '../../components/lists/ProductsList/ProductsList.vue';
import { storeToRefs } from "pinia";
import { useLoggedUserStore } from "../../stores/loggedUserStore";

const loggedUserStore = useLoggedUserStore();
const { user } = storeToRefs(loggedUserStore);
</script>

<template>
  <AppLayout>
    <div class="text-end">
      <button v-if="user.role === 'admin'" class="button button-solid" @click="goToNewProduct">
        Agregar producto
      </button>
    </div>
    <ProductsList />
  </AppLayout>
</template>

<script>
export default {
  methods: {
    goToNewProduct() {
      this.$router.push(PATHS.productsNew);
    }
  },
}
</script>

<style scoped></style>