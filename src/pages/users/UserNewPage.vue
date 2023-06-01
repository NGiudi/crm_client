<script setup>
import AppLayout from '../../components/AppLayout/AppLayout.vue';
import { createUser } from '../../services/axios/usersService';
import { PATHS } from "../../assets/constants/constants";
</script>
<template>
  <AppLayout>
      <div class="mb-3">
        <label>Nombre</label>
        <input v-model="newUser.names" class="form-control" />
      </div>

      <div class="mb-3">
        <label>Apellido</label>
        <input v-model="newUser.last_name" class="form-control" />
      </div>

      <div class="mb-3">
        <label>Teléfono</label>
        <input v-model="newUser.phone" class="form-control" />
      </div>

      <div class="mb-3">
        <label>Mail</label>
        <input v-model="newUser.email" class="form-control" />
      </div>

      <div class="mb-3">
        <label>Contraseña</label>
        <input v-model="newUser.password" class="form-control" />
      </div>      

      <div class="mb-3">
        <label>Rol</label>
        <select v-model="newUser.role" class="form-control">
          <option value="seller">
            Vendedor
          </option>
          <option value="admin">
            Administrador
          </option>
        </select>
      </div>

      <div class="mb-3">
        <label>Estado</label>
        <select v-model="newUser.active" class="form-control">
          <option :value=true>
            Activo
          </option>
          <option :value=false>
            Inactivo
          </option>
        </select>
      </div> 

      <div class="mt-5 text-end">
        <button class="button button-solid" @click="handleSubmit">
          Crear usuario
        </button>
      </div>
  </AppLayout>
</template>

<script>
  export default {
    data() {
      return {
        newUser: {},
      };
    },
    methods: {
      handleSubmit(){
        console.log(this.newUser)
        createUser(this.newUser)
        .then (resp => (this.$router.push(`${PATHS.usersList}/${resp.id}`)))
      }
    }
  }
</script>

<style scoped>

</style>