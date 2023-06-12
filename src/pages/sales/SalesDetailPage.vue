<script setup>
import AppLayout from "../../components/AppLayout/AppLayout.vue";
import { getSale } from "../../services/axios/salesService";
import ProductsSaleList from "../../components/lists/ProductsList/ProductsSaleList.vue";
</script>

<template>
  <AppLayout>
    <div>
      <div class="d-flex justify-content-center mb-3">
        <h1>{{ data.name }}</h1>
      </div>

      <div class="container d-flex justify-content-between align-items-center">
        <h3>Nro orden</h3>
        <h3 class="color-secondary">{{ data.id }}</h3>
      </div>

      <div class="container d-flex justify-content-between align-items-center">
        <h3>Cliente</h3>
        <h3 class="color-secondary">{{ data.client }}</h3>
      </div>

      <div class="container d-flex justify-content-between align-items-center">
        <h3>Precio final</h3>
        <h3 class="color-secondary">$ {{ data.price }}</h3>
      </div>

      <div class="container d-flex justify-content-between align-items-center">
        <h3>Vendedor</h3>
        <h3 class="color-secondary">{{ data.user?.names + " " + data.user?.last_name }}</h3>
      </div>
    </div>

    <ProductsSaleList :products="data.products" />

    <p class="mt-5 color-secondary center">
      Creación: {{ new Date(data.created_at).toLocaleString("es-AR") }}
    </p>
  </AppLayout>
</template>

<script>
export default {
  data() {
    return {
      data: {},
    };
  },
  methods: {
    getSale(id) {
      getSale(id).then((res) => {
        this.data = res;
      })
        .catch((err) => console.error(err));
    },
  },
  mounted() {
    const { id } = this.$route.params;
    this.getSale(id);
  },
}
</script>

<style scoped>
.container {
  max-width: 750px;
}

.btn-primary {
  background-color: var(--color-primary);
  border: none;
}

.color-secondary {
  color: var(--color-secondary);
}

.center {
  text-align: center;
}</style>