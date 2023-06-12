<template>
  <div aria-label="Page navigation example">
    <ul class="pagination justify-content-center">
      <li class="page-item">
        <button aria-label="Previous" class="page-link" @click="handlePrevPage">
          <span aria-hidden="true">&laquo;</span>
        </button>
      </li>

      <li class="page-item" :key="idx" v-for="(n, idx) in pages">
        <button :class="['page-link', { 'active': currentPage === n }]" @click="handlePageClick(n)">
          {{ n }}
        </button>
      </li>

      <li class="page-item">
        <button aria-label="Next" class="page-link" @click="handleNextPage">
          <span aria-hidden="true">&raquo;</span>
        </button>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  data() {
    return {
      currentPage: 1,
    };
  },
  emits: ["onClick"],
  methods: {
    handlePageClick(page) {
      this.currentPage = page;
      this.$emit("onClick", page);
    },
    handleNextPage() {
      if (this.currentPage < this.pages) {
        this.handlePageClick(this.currentPage + 1);
      }
    },
    handlePrevPage() {
      if (this.currentPage > 1) {
        this.handlePageClick(this.currentPage - 1);
      }
    },
  },
  props: ["pages", "page"],
}
</script>

<style scoped>
.page-link {
  color: var(--color-primary);
}

.page-link.active {
  background-color: var(--color-primary);
  color: white;
}
</style>