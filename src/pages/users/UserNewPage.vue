<script setup>
import { storeToRefs } from "pinia";

import { useLoggedUserStore } from "../../stores/loggedUserStore";

import AppLayout from '../../components/AppLayout/AppLayout.vue';
import { createUser } from '../../services/axios/usersService';

import { PATHS } from "../../assets/constants/constants";
</script>

<template>
  <AppLayout>
    <form class="needs-validation" novalidate @submit.prevent="handleSubmit">
      <div class="mb-3">
        <label>Nombre</label>
        <input v-model="newUser.names" required class="form-control" />
        <div class="invalid-feedback">
          Campo obligatorio
        </div>
      </div>

      <div class="mb-3">
        <label>Apellido</label>
        <input v-model="newUser.last_name" required class="form-control" />
        <div class="invalid-feedback">
          Campo obligatorio
        </div>
      </div>

      <div class="mb-3">
        <label>Teléfono</label>
        <input type="tel" v-model="newUser.phone" required class="form-control" pattern="[0-9]*" minlength="8"
          maxlength="20" />
        <div class="invalid-feedback">
          <span v-if="!newUser.phone"> Campo obligatorio </span>
          <span v-else> Ingrese un teléfono válido </span>
        </div>
      </div>

      <div class="mb-3">
        <label>Mail</label>
        <input type="email" v-model="newUser.email" required class="form-control" />
        <div class="invalid-feedback">
          <span v-if="!newUser.email"> Campo obligatorio </span>
          <span v-else> Campo inválido </span>
        </div>
      </div>

      <div class="mb-3">
        <label>Contraseña</label>
        <input minlength="6" v-model="newUser.password" required class="form-control" />
        <div class="invalid-feedback">
          <span v-if="!newUser.password"> Campo obligatorio </span>
          <span v-else> Debe tener más de 6 caracteres </span>
        </div>
      </div>

      <div class="mb-3">
        <label>Rol</label>
        <select v-model="newUser.role" required class="form-control">
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
        <select v-model="newUser.active" required class="form-control">
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

      <div class="mt-5 text-end">
        <button class="button button-solid" type="submit">
          Crear usuario
        </button>
      </div>
    </form>
  </AppLayout>
</template>

<script>
export default {
  beforeCreate() {
    const loggedUserStore = useLoggedUserStore();
    const { user } = storeToRefs(loggedUserStore);

    if (user.value.role !== "admin") {
      this.$router.push(PATHS.notFound);
    }
  },
  data() {
    return {
      newUser: {},
    };
  },
  methods: {
    handleSubmit(e) {
      if (e.target.checkValidity()) {
        createUser(this.newUser)
          .then(resp => (this.$router.push(`${PATHS.usersList}/${resp.id}`)))
      }
      e.target.classList.add("was-validated");
    }
  },
}
</script>

<style scoped></style>