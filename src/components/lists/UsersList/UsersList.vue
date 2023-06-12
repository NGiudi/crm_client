<script setup>
import Pagination from "../Pagination.vue";

import { getUsers } from "../../../services/axios/UsersService";

import { PATHS } from "../../../assets/constants/constants";
</script>

<template>
  <table class="table">
    <thead>
      <tr>
        <th scope="col">Nombre completo</th>

        <th scope="col">Mail</th>

        <th scope="col">rol</th>

        <th scope="col">Estado</th>
      </tr>
    </thead>

    <tbody>
      <tr :class="{ 'inactivo': !user.active }" @click="handleRowClick(user.id)" :key="idx" v-for="(user, idx) in data">
        <td>{{ user.names + " " + user.last_name }}</td>

        <td>{{ user.email }}</td>

        <td>{{ user.role }}</td>

        <td>
          <span v-if="user.active">Activo</span>
          <span v-else>Inactivo</span>
        </td>
      </tr>
    </tbody>
  </table>

  <Pagination v-if="stats.pages > 1" :pages="stats.pages" @onClick="changePage" />
</template>

<script>
export default {
  data() {
    return {
      data: [],
      stats: {},
    };
  },
  methods: {
    changePage(page) {
      this.getPage(page);
    },
    getPage(page) {
      const queryObj = {
        page: page,
      };

      getUsers(queryObj).then((res) => {
        this.data = res.users;
        this.stats = res.stats;
      })
        .catch((err) => console.error(err));
    },
    handleRowClick(id) {
      this.$router.push(`${PATHS.usersList}/${id}`);
    },
  },
  mounted() {
    this.getPage(1);
  },
};
</script>

<style scoped>
tbody tr:hover {
  background-color: var(--color-backgroud-components);
  cursor: pointer;
}

tbody tr:active {
  background-color: var(--color-background-inputs);
  cursor: pointer;
}

.inactivo {
  color: var(--color-text-danger);
}
</style>
