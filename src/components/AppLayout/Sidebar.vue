<script setup>
import { storeToRefs } from "pinia";
import { useLoggedUserStore } from "../../stores/loggedUserStore";
import { PATHS } from "../../assets/constants/constants";
import { useRoute } from "vue-router";

const route = useRoute();
const currentPath = route.path;
const loggedUserStore = useLoggedUserStore();
const { user } = storeToRefs(loggedUserStore);  
</script>

<template>
  <nav class="layout-sidebar">
    <button class="layout-button" @click="handleClick" :name="PATHS.home" :class="{ active: currentPath === PATHS.home }">
      Home
    </button>

    <button class="layout-button" @click="handleClick" :name="PATHS.productsList"
      :class="{ active: currentPath === PATHS.productsList }">
      Productos
    </button>

    <button class="layout-button" @click="handleClick" :name="PATHS.salesList"
      :class="{ active: currentPath === PATHS.salesList }">
      Ventas
    </button>

    <button class="layout-button" @click="handleClick" :name="PATHS.usersList"
      :class="{ active: currentPath === PATHS.usersList }" v-if="user.role === 'admin'">
      Usuarios
    </button>
  </nav>
</template>

<script>
export default {
  methods: {
    handleClick(e) {
      this.$router.push(e.target.name);
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
  transition: .2s ease-in-out;
}

.layout-button:hover {
  background-color: var(--color-button-hover);
}

.layout-sidebar {
  background-color: var(--color-background-sidebar);
  height: 100%;
  width: 240px;
}

.active {
  color: var(--color-primary);
}

.active:hover {
  color: white;
}
</style>