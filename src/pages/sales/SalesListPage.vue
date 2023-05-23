<script setup>
  import { PATHS } from '../../assets/constants/constants';
import AppLayout from '../../components/AppLayout/AppLayout.vue';
</script>

<template>
  <AppLayout>
    <div class="text-end">
      <button class="button button-solid" @click="goToNewSale">
        Nueva venta
      </button>
    </div>
  </AppLayout>
</template>

<script>
  export default {
    methods: {
      goToNewSale() {
        this.$router.push(PATHS.salesNew);
      }
    },
  }
  
</script>

<style scoped>

</style>