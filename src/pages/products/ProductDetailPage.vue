<script setup>
import AppLayout from "../../components/AppLayout/AppLayout.vue";
import { getProduct, deleteProduct, modifyProduct } from "../../services/axios/productsService";
import { confirmDelete } from "../../helpers/sweetalert.js";
import { storeToRefs } from "pinia";
import { useLoggedUserStore } from "../../stores/loggedUserStore";
import lodash from "lodash";

const loggedUserStore = useLoggedUserStore();
const { user } = storeToRefs(loggedUserStore);
</script>

<template>
  <AppLayout>
    <form v-if="isEditing" class="needs-validation" novalidate @submit.prevent="editProduct">
      <div class="mb-3 text-end">
        <button class="btn btn-primary mx-2" type="submit">Guardar</button>
        <button @click="handleEditClick" class="btn btn-secondary">Cancelar</button>
      </div>
      <div class="mb-3">
        <label>Marca</label>
        <input v-model="data.brand_name" required class="form-control" />
        <div class="invalid-feedback">
          Campo obligatorio
        </div>
      </div>

      <div class="mb-3">
        <label>Nombre</label>
        <input v-model="data.name" required class="form-control" />
        <div class="invalid-feedback">
          Campo obligatorio
        </div>
      </div>

      <div class="mb-3">
        <label>Descripcion</label>
        <input v-model="data.description" required class="form-control" />
        <div class="invalid-feedback">
          Campo obligatorio
        </div>
      </div>

      <div class="mb-3">
        <label>Precio</label>
        <input type="number" v-model="data.price" min="0" required class="form-control" />
        <div class="invalid-feedback">
          <span v-if="!data.price"> Campo obligatorio </span>
          <span v-else> Campo inválido </span>
        </div>
      </div>

      <div class="mb-3">
        <label>Stock</label>
        <input type="number" v-model="data.stock" min="0" required class="form-control" />
        <div class="invalid-feedback">
          <span v-if="!data.stock"> Campo obligatorio </span>
          <span v-else> Campo inválido </span>
        </div>
      </div>

      <div class="mb-3">
        <label>Descuento</label>
        <input type="number" v-model="data.discount" defaultValue="0" min="0" max="100" class="form-control" />
        <div class="invalid-feedback">
          Campo inválido
        </div>
      </div>
    </form>

    <div v-else>
      <div v-if="user.role === 'admin'" class="text-end mb-3">
        <button @click="handleEditClick" class="btn btn-primary mx-2">Editar</button>
        <button @click="confirmRemoveProduct" class="btn btn-danger">Eliminar</button>
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
        <h3>Descuento</h3>
        <h3 class="color-secondary">{{ data.discount }}%</h3>
      </div>

      <div class="container d-flex justify-content-between align-items-center" v-if="data.discount > 0">
        <h3>Precio con descuento</h3>
        <h3 class="color-secondary">$ {{ data.price * (100 - data.discount) / 100 }}</h3>
      </div>

      <div class="container d-flex justify-content-between align-items-center">
        <h3>Stock</h3>
        <h3 class="color-secondary">{{ data.stock }}</h3>
      </div>
    </div>

    <p class="mt-5 color-secondary center">
      Última actualización: {{ new Date(data.updated_at).toLocaleString("es-AR") }}
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
    };
  },
  methods: {
    getProduct(id) {
      getProduct(id).then((res) => {
        this.data = res;
        this.updatedData = { ...res }
      })
        .catch((err) => console.error(err));
    },
    handleEditClick() {
      if (this.isEditing) {
        this.data = { ...this.updatedData };
      }
      this.isEditing = !this.isEditing;
    },
    async editProduct(e) {
      if (e.target.checkValidity()) {
        this.updatedData = { ...this.data }
        const product = lodash.pick(this.updatedData, ["brand_name", "description", "discount", "name", "price", "stock"])
        await modifyProduct(this.data.id, product)
        this.isEditing = false;
      }
      e.target.classList.add("was-validated");
    },
    confirmRemoveProduct() {
      confirmDelete(`¿Eliminar ${this.data.name}?`, this.removeProduct);
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