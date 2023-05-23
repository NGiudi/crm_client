<script setup>
  import { userAuthentication, userLogin } from "../../services/axios/loginService";
  import { useLoggedUserStore } from "../../stores/loggedUser";

  import { LS_KEYS, PATHS } from "../../assets/constants/constants";
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
        const { loginUser } = useLoggedUserStore();

        if (!this.email.trim() || !this.password.trim()) {
          this.showError = true;
        } else {
          userLogin({ email: this.email, password: this.password })
            .then((user) => {
              loginUser(user);
              this.$router.push(PATHS.productsList);
            })
            .catch((err) => {
              this.showError = true;
              console.error(err);
            });
        }
      }
    },
    mounted() {
      const { loginUser } = useLoggedUserStore();

      // la función se ejecuta cuando el componente se monte en el DOM.
      const userID = localStorage.getItem(LS_KEYS.userId);
      const userToken = localStorage.getItem(LS_KEYS.userToken);

      if (userID && userToken) {
        userAuthentication({ user_id: userID, token: userToken })
          .then((user) => {
            loginUser(user);
            this.$router.push(PATHS.productsList);
          })
          .catch((err) => {
				    localStorage.removeItem(LS_KEYS.userId);
				    localStorage.removeItem(LS_KEYS.userToken);

            console.error(err);
          });
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
