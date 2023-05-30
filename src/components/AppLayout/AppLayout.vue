<script setup>
  import { storeToRefs } from "pinia";
  
  import { useLoggedUserStore } from "../../stores/loggedUserStore";
  
  import Sidebar from "./Sidebar.vue";

  const loggedUserStore = useLoggedUserStore();
  const { user } = storeToRefs(loggedUserStore);
</script>

<template>
  <!-- Topbar -->
  <header class="layout-topbar">
    <p class="userName">
      {{ `${user.names} ${user.last_name}` }}
    </p>
  </header>

  <div class="layout-wrapper">
    <Sidebar />

    <!-- Content -->
    <main class="layout-content">
      <slot></slot>
    </main>
  </div>
</template>

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
  }

  .layout-wrapper {
    display: flex;
    height: calc(100vh - 56px);
  }

  .userName{
    padding-right: 24px;
    padding-top: 16px;
    text-align: end;
    font-weight: bold;
  }
</style>