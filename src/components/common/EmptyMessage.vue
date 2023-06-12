<template>
  <div class="text-center">
    <img class="my-4 w-25" src="../../assets/images/empty_list.png" alt="empty-list-image" />
    <h3 class="mb-2">Lista vacía</h3>
    <p>{{ message }}</p>
  </div>
</template>

<script>
export default {
  props: ["message"],
}
</script>