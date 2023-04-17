<script setup>
  import { userLogout } from "../../../services/axios/requests/login";
</script>

<template>
  <nav class="layout-sidebar">
    <button class="layout-button" @click="handleClick" name="/home">
      Home
    </button>

    <button class="layout-button" @click="handleClick" name="/users">
      Usuarios
    </button>

    <button class="layout-button" @click="logout">
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
        userLogout().then(() => {
          this.$router.push("/login");
        });
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

    .layout-button:hover {
      background-color: var(--color-button-hover);
    }

  .layout-sidebar {
    background-color: var(--color-background-sidebar);
    height: 100%;
    width: 240px;
  }
</style>