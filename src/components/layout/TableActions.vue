<template>
  <button class="button button-ghost" @click="handleDetail">
    Detalles
  </button>
  
  <span> | </span>
  
  <button class="button button-ghost" @click="handleEdit">
    Editar
  </button>

  <span> | </span>
  
  <button class="button button-ghost" @click="handleDelete">
    Eliminar
  </button>
</template>

<script>
  export default {
    methods: {
      handleDelete() {
        //TODO: Agregar accion de delete.
      },
      handleDetail() {
        const { path } = this.$router.currentRoute.value;
        this.$router.push(`${path}/${this.item.id}`);
      },
      handleEdit() {
        //TODO: Agregar accion de editar.
      }
    },
    props: ["item"],
  }
</script>