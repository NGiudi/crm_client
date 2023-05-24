<script setup>
  import { PATHS } from '../../assets/constants/constants';
  import AppLayout from '../../components/AppLayout/AppLayout.vue';
  import SalesList from '../../components/lists/SalesList/SalesList.vue';


</script>

<template>
  <AppLayout>
    <div class="text-end">
      <button class="button button-solid" @click="goToNewSale">
        Nueva venta
      </button>
    </div>
      <SalesList />
<!--
  usuario que realizo la venta, <br/>
  precio total, <br/>
  numero cliente+nombre, <br/>


  en el detalle se ve el listado de productos

-->


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