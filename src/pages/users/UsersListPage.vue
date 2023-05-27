<script setup>
  import { PATHS } from '../../assets/constants/constants';
  import AppLayout from '../../components/AppLayout/AppLayout.vue';
  import UsersList from '../../components/lists/UsersList/UsersList.vue';
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
    methods: {
      goToNewUser() {
        this.$router.push(PATHS.usersNew);
      }
    },
  }
</script>

<style scoped>

</style>