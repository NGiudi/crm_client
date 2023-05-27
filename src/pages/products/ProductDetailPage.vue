<script setup>
  import AppLayout from "../../components/AppLayout/AppLayout.vue";
  import { getProduct, deleteProduct, modifyProduct } from "../../services/axios/productsService";
</script>

<template>
  <AppLayout>
    <div v-if="isEditing">
      <div class="mb-3 text-end">
        <button @click="editProduct" class="btn btn-primary mx-2">Guardar</button>
        <button @click="handleEditClick" class="btn btn-secondary">Cancelar</button>
      </div>
      <div class="mb-3">
        <label>Producto</label>
        <input v-model="data.name" class="form-control" />
      </div>

      <div class="mb-3">
        <label>Marca</label>
        <input v-model="data.brand_name" class="form-control" />
      </div>

      <div class="mb-3">
        <label>Descripción</label>
        <input v-model="data.description" class="form-control" />
      </div>

      <div class="mb-3">
        <label>Precio unitario</label>
        <input v-model="data.price" class="form-control" />
      </div>

      <div class="mb-3">
        <label>Stock</label>
        <input v-model="data.stock" class="form-control" />
      </div>
    </div>

    <div v-else>
      <div class="text-end mb-3">
        <button @click="handleEditClick" class="btn btn-primary mx-2">Editar</button>
        <button @click="removeProduct" class="btn btn-danger">Eliminar</button>
      </div>
      <div class="d-flex justify-content-center mb-3">
        <h1>{{ data.name }}</h1>
      </div>

      <div class="container d-flex justify-content-between align-items-center">
        <h3>Marca</h3>
        <h3 class="color-secondary">{{ data.brand_name }}</h3>
      </div>

      <div class="container d-flex justify-content-between align-items-center">
        <h3>Descripcion</h3>
        <h3 class="color-secondary" v-if="data.description">{{ data.description }}</h3>
        <h3 class="color-secondary" v-else>--</h3>
      </div>

      <div class="container d-flex justify-content-between align-items-center">
        <h3>Precio</h3>
        <h3 class="color-secondary">$ {{ data.price }}</h3>
      </div>

      <div class="container d-flex justify-content-between align-items-center">
        <h3>Stock</h3>
        <h3 class="color-secondary">{{ data.stock }}</h3>
      </div>
    </div>

    <p class="mt-5 color-secondary center">
      Última actualización: {{ new Date(data.updatedAt).toLocaleString("es-AR") }}
    </p>
  </AppLayout>
</template>



<script>
  export default {
    data() {
      return {
        data: {},
        updatedData: {},
        isEditing: false,
        url: "http://localhost:3005/products",
        token: localStorage.getItem('crm_user_token')
      };
    },
    methods: {
      getProduct(id) {
        getProduct(id).then((res) => {
          this.data = res;
          this.updatedData = {...res}
        })
          .catch((err) => console.error(err));
      },
      handleEditClick() {
        if(this.isEditing){
          this.data = {...this.updatedData};
        }
        this.isEditing = !this.isEditing;
      },
      async editProduct() {
        this.updatedData = {...this.data}
        await modifyProduct(this.data.id, this.updatedData)
        this.isEditing = false;
      },
      async removeProduct() {
        await deleteProduct(this.data.id)
        this.$router.push("/products");
      },
    },
    mounted() {
      const { id } = this.$route.params;
      this.getProduct(id);
    },
  }
</script>

<style scoped>
  .container{
    max-width: 750px;
  }
  .btn-primary{
    background-color: var(--color-primary);
    border: none;
  }
  .color-secondary{
    color: var(--color-secondary);
  }
  .center {
    text-align: center;
  }
</style>