<script setup>
  import Pagination from "../Pagination.vue";


</script>

  <template>
  <table class="table">
    <thead>
      <tr>
        <th scope="col">Nro orden</th>

        <th scope="col">Vendedor</th>

        <th scope="col">Cliente</th>

        <th scope="col">Total</th>
      </tr>
    </thead>
    </table>

      <Pagination v-if="stats.pages > 1" :pages="stats.pages" @onClick="changePage"/>

</template>

<script>
// TODO A MODIFICAR
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
 
        getProducts(queryObj).then((res) => {
          this.data = res.products;
          this.stats = res.stats; 
        })
        .catch((err) => console.error(err));
      },
      handleRowClick(id) {
        this.$router.push(`${PATHS.productsList}/${id}`);
      },
    },
/*     mounted() {
      this.getPage(1);
    }, */
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

  .sinStock {
    color: indianred;
  }

  .bajoStock {
    color: orange;
  }

  .stockValido {
    color: #64dd17;
  }

</style>