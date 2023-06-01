<script setup>
  import LoginForm from "../components/forms/LoginForm.vue";
</script>

<template>
  <main class="login-wrapper">
    <div class="login-panel">
      <h2 class="login-title">Bienvenido</h2>

      <LoginForm />
    </div>
  </main>
</template>

<style scoped>
  .login-panel {
    background-color: var(--color-backgroud-components);
    border-radius: 8px;
    padding: 24px;
    max-width: 500px;
    width: 100%;
  }
  
  .login-title {
    margin-bottom: 20px;
  }

  .login-wrapper {
    align-items: center;
    display: flex;
    height: 100vh;
    margin: 0 16px;
    justify-content: center;
  }
</style>