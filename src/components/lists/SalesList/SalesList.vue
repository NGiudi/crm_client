<script setup>
  import Pagination from "../Pagination.vue";

  import { getSales } from "../../../services/axios/salesService";

  import { PATHS } from "../../../assets/constants/constants";




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
    

        <tbody>
      <tr 
        @click="handleRowClick(sale.id)" 
        :key="idx"
        v-for="(sale, idx) in data" 
      >
        <td>{{ sale.id }}</td>

        <td>{{ sale.seller_id }}</td>

        <td>{{ sale.client }}</td>
        
        <td>{{ sale.price }}</td>
        

      </tr>
    </tbody>
    </table>

      <!--<Pagination v-if="stats.pages > 1" :pages="stats.pages" @onClick="changePage"/>-->

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
 
        getSales(queryObj).then((res) => {
          this.data = res.sales;
          this.stats = res.stats; 
        })
        .catch((err) => console.error(err));
      },
      handleRowClick(id) {
        this.$router.push(`${PATHS.salesList}/${id}`);
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
</style>