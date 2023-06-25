<script setup>
import { storeToRefs } from "pinia";

import { useLoggedUserStore } from "../../stores/loggedUserStore";

import AppLayout from "../../components/AppLayout/AppLayout.vue";
import SalesList from "../../components/lists/SalesList/SalesList.vue";
import EmptyMessage from "../../components/common/EmptyMessage.vue";

import { getUser, updateUser, deleteUser } from "../../services/axios/usersService";
import { getSales } from "../../services/axios/salesService";

import { confirmDelete } from "../../helpers/sweetalert.js";

import { PATHS, LS_KEYS } from "../../assets/constants/constants";
import lodash from 'lodash';

const loggedUserStore = useLoggedUserStore();
const { user } = storeToRefs(loggedUserStore);
</script>

<template>
  <AppLayout>
    <form v-if="isEditing" class="needs-validation" novalidate @submit.prevent="editUser">
      <div class="mb-3 text-end">
        <button class="btn btn-primary mx-2" type="submit">Guardar</button>
        <button @click="handleEditClick" class="btn btn-secondary">Cancelar</button>
      </div>
      <div class="mb-3">
        <label>Nombre</label>
        <input v-model="data.names" required class="form-control" />
        <div class="invalid-feedback">
          Campo obligatorio
        </div>
      </div>

      <div class="mb-3">
        <label>Apellido</label>
        <input v-model="data.last_name" required class="form-control" />
        <div class="invalid-feedback">
          Campo obligatorio
        </div>
      </div>

      <div class="mb-3">
        <label>Teléfono</label>
        <input type="tel" v-model="data.phone" required class="form-control" pattern="[0-9]*" minlength="8"
          maxlength="20" />
        <div class="invalid-feedback">
          <span v-if="!data.phone"> Campo obligatorio </span>
          <span v-else> Ingrese un teléfono válido </span>
        </div>
      </div>

      <div class="mb-3">
        <label>Mail</label>
        <input type="email" v-model="data.email" required class="form-control" />
        <div class="invalid-feedback">
          <span v-if="!data.email"> Campo obligatorio </span>
          <span v-else> Campo inválido </span>
        </div>
      </div>

      <div class="mb-3" v-if="user.role == 'admin'">
        <label>Rol</label>
        <select v-model="data.role" required class="form-control">
          <option value="seller">
            Vendedor
          </option>
          <option value="admin">
            Administrador
          </option>
        </select>
        <div class="invalid-feedback">
          Campo obligatorio
        </div>
      </div>

      <div class="mb-3">
        <label>Estado</label>
        <select v-model="data.active" required class="form-control">
          <option :value=true>
            Activo
          </option>
          <option :value=false>
            Inactivo
          </option>
        </select>
        <div class="invalid-feedback">
          Campo obligatorio
        </div>
      </div>
    </form>

    <div v-else>
      <div class="text-end mb-3">
        <button @click="handleEditClick" class="btn btn-primary mx-2">Editar</button>
        <button v-if="user.id != this.$router.currentRoute.value.params.id" @click="confirmRemoveUser"
          class="btn btn-danger">Eliminar</button>
      </div>
      <div class="d-flex justify-content-center mb-3">
        <h1>{{ data.name }}</h1>
      </div>

      <div class="container d-flex justify-content-between align-items-center">
        <h3>Nombre completo</h3>
        <h3 class="color-secondary">{{ data.names + " " + data.last_name }}</h3>
      </div>

      <div class="container d-flex justify-content-between align-items-center">
        <h3>Mail</h3>
        <h3 class="color-secondary">{{ data.email }}</h3>
      </div>

      <div class="container d-flex justify-content-between align-items-center">
        <h3>Rol</h3>
        <h3 class="color-secondary">{{ data.role }}</h3>
      </div>

      <div class="container d-flex justify-content-between align-items-center">
        <h3>Teléfono</h3>
        <h3 class="color-secondary">{{ data.phone }}</h3>
      </div>

      <div class="container d-flex justify-content-between align-items-center">
        <h3>Estado</h3>
        <h3 class="color-secondary" v-if="data.active">Activo</h3>
        <h3 class="color-secondary" v-else>Inactivo</h3>
      </div>

      <p class="mt-5 color-secondary center">
        Última actualización: {{ new Date(data.updated_at).toLocaleString("es-AR") }}
      </p>

      <hr class="mb-4 mt-5" />

      <h2 class="mb-4">Listado de ventas</h2>

      <SalesList @onChangePage="handleSalesPage" :sales="salesList" :stats="salesStats" v-if="salesList.length > 0" />

      <EmptyMessage v-else message="El vendedor aún no ha realizado ventas." />
    </div>

  </AppLayout>
</template>

<script>
export default {
  beforeCreate() {
    const loggedUserStore = useLoggedUserStore();
    const { user } = storeToRefs(loggedUserStore);

    if (user.value.role !== "admin" && this.$route.params.id != user.value.id) {
      this.$router.push(PATHS.notFound);
    }
  },
  data() {
    return {
      data: {},
      isEditing: false,
      url: "http://localhost:3005/products",
      salesList: [],
      salesStats: {},
      token: localStorage.getItem('crm_user_token')
    };
  },
  watch: {
    '$route.params.id'(id) {
      this.getUser(id);
      this.getUserSales(1);
    }
  },
  methods: {
    getUserSales(page) {
      const { id } = this.$router.currentRoute.value.params;

      getSales({ page, seller_id: id })
        .then((res) => {
          this.salesList = res.sales;
          this.salesStats = res.stats;
        })
        .catch((err) => console.error(err));
    },
    getUser(id) {
      getUser(id).then((res) => {
        this.data = res;
      })
        .catch((err) => console.error(err));
    },
    handleSalesPage(page) {
      this.getUserSales(page);
    },
    handleEditClick() {
      this.isEditing = !this.isEditing;
    },
    editUser(e) {
      if (e.target.checkValidity()) {
        const userID = localStorage.getItem(LS_KEYS.userId);
        const { updateLoggedUser } = useLoggedUserStore();
        const updatedUser = { ...this.data }
        const user = lodash.pick(updatedUser, ["active", "email", "last_name", "names", "phone", "role"])
        updateUser(this.data.id, user)
          .then(() => {
            console.log(userID)
            if (updatedUser.id == userID) {
              updateLoggedUser(updatedUser);
            }
            console.log("usuario actualizado");
            this.isEditing = false;
          })
          .catch((err) => console.error(err));
      }
      e.target.classList.add("was-validated");
    },
    confirmRemoveUser() {
      confirmDelete(`¿Eliminar ${this.data.names} ${this.data.last_name}?`, this.removeUser);
    },
    async removeUser() {
      await deleteUser(this.data.id)
      this.$router.push("/users");
    },
  },
  mounted() {
    const { id } = this.$route.params;

    this.getUser(id);
    this.getUserSales(1);
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
}
</style>