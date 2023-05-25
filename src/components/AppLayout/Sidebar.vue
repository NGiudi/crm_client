<script setup>
  import { useLoggedUserStore } from "../../stores/loggedUser";
  
  import { userLogout } from "../../services/axios/loginService";

  import { PATHS } from "../../assets/constants/constants";
</script>

<template>
  <nav class="layout-sidebar">
    <button class="layout-button" @click="handleClick" :name="PATHS.productsList">
      Productos
    </button>

    <button class="layout-button" @click="handleClick" :name="PATHS.salesList">
      Ventas
    </button>

    <button class="layout-button" @click="handleClick" :name="PATHS.usersList">
      Usuarios
    </button>

    <button class="layout-button signout" @click="logout">
      Cerrar sesión
    </button>
  </nav>
</template>

<script>
  export default {
    methods: {
      handleClick(e) {
        this.$router.push(e.target.name);
      },
      logout() {
        const { logoutUser } = useLoggedUserStore();

        userLogout().then(() => {
          logoutUser();
          this.$router.push(PATHS.login);
        })
        .catch((err) => console.error(err));
      }
    }
  }
</script>

<style scoped>
  .layout-button {
    appearance: none;
    background-color: transparent;
    border: none;
    color: white;
    padding: 16px 24px;
    width: 100%;
  }

  .signout {
    color:  var(--color-text-danger);
  }
  .signout:hover {
    color: white;
  }

    .layout-button:hover {
      background-color: var(--color-button-hover);
    }

  .layout-sidebar {
    background-color: var(--color-background-sidebar);
    height: 100%;
    width: 240px;
  }
</style>