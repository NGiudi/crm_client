<script setup>
  import Sidebar from "./Sidebar.vue";
</script>

<template>
  <!-- Topbar -->
  <header class="layout-topbar"></header>

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
</style>