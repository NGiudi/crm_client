<script setup>
import { storeToRefs } from "pinia";

import { useLoggedUserStore } from "../../stores/loggedUserStore";

import AppLayout from '../../components/AppLayout/AppLayout.vue';
import UsersList from '../../components/lists/UsersList/UsersList.vue';

import { PATHS } from '../../assets/constants/constants';
</script>

<template>
  <AppLayout>
    <div class="text-end">
      <button class="button button-solid" @click="goToNewUser">
        Agregar usuario
      </button>
    </div>
    <UsersList />
  </AppLayout>
</template>

<script>
export default {
  beforeCreate() {
    const loggedUserStore = useLoggedUserStore();
    const { user } = storeToRefs(loggedUserStore);

    if (user.value.role !== "admin") {
      this.$router.push(PATHS.notFound);
    }
  },
  methods: {
    goToNewUser() {
      this.$router.push(PATHS.usersNew);
    }
  },
}
</script>

<style scoped></style>