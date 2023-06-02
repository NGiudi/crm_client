<template>
  <div class="panel" v-if="showPanel && options.length > 0">
    <table class="table">
      <tbody>
        <tr :key="idx" v-for="(product, idx) in options">

          <td>{{ product.name }}</td>

          <td>{{ product.brand_name }}</td>
        
          <th>{{ product.stock }}</th>

          <th>{{ product.price }}</th>
          
          <th class="text-end">
            <button
              @click="handleAddProduct(product)"
              :disabled="product.stock <= 0"
              type="button"
            >
              Agregar
            </button>
          </th>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
  export default {
    emits: ["onAddProduct"],
    methods: {
      handleAddProduct(product) {
        this.$emit("onAddProduct", product);
      },
    },
    props: ["options", "showPanel"],
  };
</script>

<style scoped>
  .panel {
    background-color: var(--color-background-inputs);
    border-radius: 2px;
    bottom: -8px;
    box-sizing: border-box;
    left: 0;
    max-height: 250px;
    overflow: auto;
    padding: 10px;
    position: absolute;
    transform: translate(0, 100%);
    width: 100%;
  }
</style>