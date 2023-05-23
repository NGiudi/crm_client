<script setup>
  import AppLayout from "../../components/AppLayout/AppLayout.vue";

  import { getProduct } from "../../services/axios/productsService";
</script>

<template>
  <AppLayout>
    <div v-if="isEditing">
      <div class="align-items-center d-flex justify-content-between">
        <input :value="this.data.name" />

        <div>
          <button @click="handleEditClick">Cancelar</button>

          <button>Eliminar</button>
        </div>
      </div>

      <label>
        Marca
        <input :value="this.brand_name" />
      </label>

      <label>
        Descripción
        <input :value="this.data.description" />
      </label>

      <label>
        Precio unitario
        <input :value="this.data.price" />
      </label>

      <label>
        Stock
        <input :value="this.data.stock" />
      </label>
    </div>

    <div v-else>
      <div class="align-items-center d-flex justify-content-between">
        <h1>{{ this.data.name }}</h1>

        <div>
          <button @click="handleEditClick">Editar</button>
        </div>
      </div>

      <h2>{{ this.brand_name }}</h2>

      <p>{{ this.data.description }}</p>

      <p>{{ this.data.price }}</p>

      <p>{{ this.data.stock }}</p>

    </div>

    <p class="timestamp">
      Última actualización: {{ new Date(this.data.updatedAt).toLocaleString("es-AR") }}
    </p>
  </AppLayout>
</template>

<script>
  export default {
    data() {
      return {
        data: {},
        isEditing: false,
      };
    },
    methods: {
      getProduct(id) {
        getProduct(id).then((res) => {
          this.data = res;
        })
          .catch((err) => console.error(err));
      },
      handleEditClick() {
        this.isEditing = !this.isEditing;
      }
    },
    mounted() {
      const { id } = this.$route.params;
      this.getProduct(id);
    },
  }
</script>

<style scoped>
  .timestamp {
    color: var(--color-secondary);
    text-align: center;
  }
</style>