<script setup>
  import { userAuthentication, userLogin } from "../../services/axios/loginService";
  import { useLoggedUserStore } from "../../stores/loggedUserStore";

  import { LS_KEYS, PATHS } from "../../assets/constants/constants";
</script>

<template>
  <form class="needs-validation" novalidate @submit.prevent="submitForm">
    <div class="mb-2">
      <label class="form-label">
        Email
      </label>
      <input class="form-control" required type="email" v-model="email" />
      <div class="invalid-feedback">
        Email inválido
      </div>
    </div>

    <div class="mb-4">
      <label class="form-label">
        Contraseña  
      </label>
      <input class="form-control" required type="password" v-model="password" />
      <div class="invalid-feedback">
        Contraseña inválida
      </div>
    </div>

    <div class="alert alert-danger d-flex align-items-center mb-4" role="alert" v-if="showError">
      <span class=" flex-shrink-0 me-2 fas fa-exclamation-triangle"></span>
      <div>
        Error de inicio de sesión: fallo o falta de permisos.
      </div>
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
      submitForm(e) {
        const { loginUser } = useLoggedUserStore();
                
        if (e.target.checkValidity()) {
          userLogin({ email: this.email, password: this.password })
            .then((res) => {
              loginUser(res.user);
              this.$router.push(PATHS.productsList);
            })
            .catch((err) => {
              this.showError = true;
              console.error(err);
            });
        }

        e.target.classList.add("was-validated");
      }
    },
    mounted() {
      const { loginUser, logoutUser } = useLoggedUserStore();

      // la función se ejecuta cuando el componente se monte en el DOM.
      const userID = localStorage.getItem(LS_KEYS.userId);
      const userToken = localStorage.getItem(LS_KEYS.userToken);

      if (userID && userToken) {
        userAuthentication({ user_id: userID, token: userToken })
          .then((user) => {
            loginUser(user);
            const { redirect_url } = this.$router.currentRoute.value.query;
            this.$router.push(redirect_url);
          })
          .catch((err) => {
				    localStorage.removeItem(LS_KEYS.userId);
				    localStorage.removeItem(LS_KEYS.userToken);
            logoutUser();
            
            console.error(err);
          });
      }
    },
  };
</script>