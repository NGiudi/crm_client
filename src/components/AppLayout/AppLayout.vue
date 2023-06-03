<script setup>
import { LS_KEYS, PATHS } from "../../assets/constants/constants"; 
import { storeToRefs } from "pinia";
import { useLoggedUserStore } from "../../stores/loggedUserStore";
import { userLogout } from "../../services/axios/loginService";

import Sidebar from "./Sidebar.vue";

const loggedUserStore = useLoggedUserStore();
const { user } = storeToRefs(loggedUserStore);
</script>

<template>
  <!-- Topbar -->
  <header class="layout-topbar">
    <img class="logo" src="../../assets/images/logo.png" alt="logo">

    <p class="userName" @click="toggleDropmenu">
      {{ `${user.names} ${user.last_name}` }}
      <i v-if="!dropmenuVisible" class="fas fa-caret-down"></i>
      <i v-else class="fas fa-caret-up"></i>
    </p>
  </header>
  <div v-if="dropmenuVisible" class="dropmenu">
    <ul>
      <li @click="viewProfile">Mis datos</li>
      <li class="layout-button signout" @click="logout">Cerrar sesión</li>
    </ul>
  </div>

  <div class="layout-wrapper">
    <Sidebar />

    <!-- Content -->
    <main class="layout-content">
      <slot></slot>
    </main>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        dropmenuVisible: false,
      };
    },
    methods: {
      toggleDropmenu() {
        this.dropmenuVisible = !this.dropmenuVisible
      },
      logout() {
        const { logoutUser } = useLoggedUserStore();

        userLogout().then(() => {
          logoutUser();
          this.$router.push(PATHS.login);
        })
        .catch((err) => console.error(err));
      },
      viewProfile(){
        const userID = localStorage.getItem(LS_KEYS.userId);
        this.$router.push(`${PATHS.usersList}/${userID}`);
      }
    }
  }
</script>

<style scoped>
  .layout-content {
    box-sizing: border-box;
    height: 100%;
    overflow-y: auto;
    padding: 16px 24px;
    width: calc(100vw - 240px);
  }

  .layout-topbar {
    background-color: var(--color-backgroud-components);
    height: 56px;
    width: 100vw;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  .layout-wrapper {
    display: flex;
    height: calc(100vh - 56px);
  }
  .logo {
    height: 40px;
    padding-left: 24px;
  }
  .userName{
    user-select: none;
    cursor: pointer;
    font-size: larger;
    padding-right: 24px;
    padding-top: 16px;
    text-align: end;
    font-weight: bold;
  }
  .dropmenu {
    width: 200px;
    position: absolute;
    top: 56px;
    right: 10px;
    background-color: var(--color-backgroud-components);
    border: 1px solid var(--color-background-inputs);
    border-top: none;
    z-index: 999;
  }

  .dropmenu ul {
    text-align: center;
    list-style-type: none;
    padding: 0;
    margin: 0;
  }

  .dropmenu li {
    user-select: none;
    margin: 8px 0;
    cursor: pointer;
    padding: 8px;
  }

  .dropmenu li:hover {
    background-color: var(--color-button-hover);
  }
  .signout {
    color:  var(--color-text-danger);
  }
  .signout:hover {
    color: white;
  }
</style>