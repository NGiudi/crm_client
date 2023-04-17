<template>
  <nav class="layout-sidebar">
    <button class="layout-button" @click="handleClick" name="/home">
      Home
    </button>

    <button class="layout-button" @click="handleClick" name="/users">
      Usuarios
    </button>
  </nav>
</template>

<script>
  export default {
    methods: {
      handleClick(e) {
        this.$router.push(e.target.name);
      },
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