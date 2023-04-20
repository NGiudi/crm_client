<script setup>
  import Pagination from "./Pagination.vue";
  import Table from "./Table.vue";
</script>

<template>
  <Table :data="data" :fields="fields" />

  <Pagination v-if="pages > 1" :pages="pages" @onClick="changePage"/>
</template>

<script>
  export default {
    emits: ["onChangePage"],
    methods: {
      changePage(page) {
        this.$emit("onChangePage", page);
      },
    },
    props: ["data", "fields", "pages"],
  }
</script>