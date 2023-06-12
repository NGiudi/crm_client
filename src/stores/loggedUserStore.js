import { defineStore } from "pinia";

export const useLoggedUserStore = defineStore("loggedUser", {
  state: () => {
    return {
      isLogged: false,
      user: {},
    };
  },
  actions: {
    loginUser(user) {
      this.user = user;
      this.isLogged = true;
    },
    logoutUser() {
      this.$reset();
    },
    updateLoggedUser(user) {
      this.user = user;
    }
  },
});