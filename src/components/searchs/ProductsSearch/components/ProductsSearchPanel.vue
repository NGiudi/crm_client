<template>
  <div class="panel" v-if="showPanel">
    <table class="table" v-if="options.length > 0">
      <tbody>
        <tr :key="idx" v-for="(product, idx) in options">

          <td clas=" d-flex align-items-center">{{ product.name }}</td>

          <td>{{ product.brand_name }}</td>

          <td>{{ product.stock }}</td>

          <td>{{ product.price }}</td>

          <td class="text-end">
            <button class="button" @click="handleAddProduct(product, idx)" :disabled="product.stock <= 0" type="button"
              :class="{ animate__bounceIn: clicked[idx] }">
              <i class="fas fa-plus"></i>
            </button>
          </td>
        </tr>
      </tbody>
    </table>

    <div v-else>
      <p class="my-4 text-center">No se han encontrado resultados</p>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      clicked: [],
    };
  },
  emits: ['onAddProduct'],
  methods: {
    animationController(idx) {
      this.clicked[idx] = true;
      setTimeout(() => (this.clicked[idx] = false), 300);
    },
    handleAddProduct(product, idx) {
      this.animationController(idx);
      this.$emit('onAddProduct', product);
    },
  },
  props: ['options', 'showPanel'],
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

button {
  font-size: 25px;
  appearance: none;
  background-color: transparent;
}

i {
  color: var(--color-primary);
  transition: .1s ease-in-out;
}

i:hover {
  color: var(--color-button-hover);

}

button:disabled i {
  color: var(--color-text-disabled);
}
</style>