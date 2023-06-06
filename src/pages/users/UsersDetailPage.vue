<script setup>
  import { storeToRefs } from "pinia";

  import { useLoggedUserStore } from "../../stores/loggedUserStore";

  import AppLayout from "../../components/AppLayout/AppLayout.vue";
  
  import { getUser, updateUser, deleteUser } from "../../services/axios/usersService";
  import { confirmDelete } from "../../helpers/sweetalert.js";

  import { PATHS } from "../../assets/constants/constants";
</script>

<template>
  <AppLayout>
    <div v-if="isEditing">
      <div class="mb-3 text-end">
        <button @click="editUser" class="btn btn-primary mx-2">Guardar</button>
        <button @click="handleEditClick" class="btn btn-secondary">Cancelar</button>
      </div>
      <div class="mb-3">
        <label>Nombre</label>
        <input v-model="data.names" class="form-control" />
      </div>

      <div class="mb-3">
        <label>Apellido</label>
        <input v-model="data.last_name" class="form-control" />
      </div>

      <div class="mb-3">
        <label>Teléfono</label>
        <input v-model="data.phone" class="form-control" />
      </div>

      <div class="mb-3">
        <label>Mail</label>
        <input v-model="data.email" class="form-control" />
      </div>

      <div class="mb-3">
        <label>Rol</label>
        <select v-model="data.role" class="form-control">
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
        <select v-model="data.active" class="form-control">
          <option :value=true>
            Activo
          </option>
          <option :value=false>
            Inactivo
          </option>
        </select>
      </div>
      
    </div>

    <div v-else>
      <div class="text-end mb-3">
        <button @click="handleEditClick" class="btn btn-primary mx-2">Editar</button>
        <button @click="confirmRemoveUser" class="btn btn-danger">Eliminar</button>
      </div>
      <div class="d-flex justify-content-center mb-3">
        <h1>{{ data.name }}</h1>
      </div>

      <div class="container d-flex justify-content-between align-items-center">
        <h3>Nombre completo</h3>
        <h3 class="color-secondary">{{ data.names +" "+ data.last_name}}</h3>
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
    </div>

    <p class="mt-5 color-secondary center">
      Última actualización: {{ new Date(data.updated_at).toLocaleString("es-AR") }}
    </p>
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
        token: localStorage.getItem('crm_user_token')
      };
    },
    watch: {
      '$route.params.id'(id) {
        this.getUser(id);
      }
    },    
    methods: {
      getUser(id) {
        getUser(id).then((res) => {
          this.data = res;
        })
          .catch((err) => console.error(err));
      },
      handleEditClick() {
        this.isEditing = !this.isEditing;
      },
      editUser() {
        const updatedUser = {...this.data}
        updateUser(this.data.id, updatedUser)
          .then(() => {
            console.log("usuario actualizado");
            this.isEditing = false;
          })
          .catch((err) => {
            console.log(err);
          });
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