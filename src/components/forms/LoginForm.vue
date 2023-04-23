<script setup>
  import { userAuthentication, userLogin } from "../../services/axios/requests/login";
</script>

<template>
  <form @submit.prevent="submitForm">
    <label class="input-label mb-4">
      Email
      <input class="input" v-model="email" />
    </label>
    
    <label class="input-label mb-2">
      Contraseña
      <input class="input" type="password" v-model="password" />
    </label>

    <div class="error mb-2">
      <p :class="{ 'error-ocult': !showError, 'error-show' : showError }">
        Email o contraseña inválida
      </p>
    </div>

    <button class="button button-solid w-100">Iniciar sesión</button>
  </form>
</template>

<script>
  export default {
    data() {
      return {
        email: "",
        password: "",
        showError: false,
      };
    },
    methods: {
      submitForm() {
        if (!this.email || !this.password) {
          this.showError = true;
        } else {
          userLogin({ email: this.email, password: this.password })
            .then((user) => {
              if (user) {
                this.showError = false;
                this.$router.push("/home");
              } else {
                this.showError = true;
              }
            })
            .catch(() => {
              this.showError = true;
            });
        }
      }
    },
    mounted() {
      // la función se ejecuta cuando el componente se monte en el DOM.
      const userID = localStorage.getItem("crm_user_id");
      const userToken = localStorage.getItem("crm_user_token");

      if (userID && userToken) {
        userAuthentication({ user_id: userID, token: userToken })
          .then((user) => {
            if (user) {
              this.$router.push("/home");
            }
          })
      }
    },
  };
</script>

<style>
  .error {
    color: var(--color-text-error);
  }

  .error-ocult {
    visibility: hidden;
  }

  .error-show {
    visibility: visible;
  }
</style>