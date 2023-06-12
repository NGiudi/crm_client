<template>
  <table class="table mt-5">
    <thead>
      <tr>
        <th scope="col">Nombre</th>

        <th scope="col">Marca</th>

        <th scope="col">Descripción</th>

        <th scope="col">Cantidad</th>

        <th scope="col">c/u</th>
      </tr>
    </thead>

    <tbody>
      <tr :key="idx" v-for="(product, idx) in products">
        <td>{{ product.product.name }}</td>

        <td>{{ product.product.brand_name }}</td>

        <td>{{ product.product.description }}</td>

        <td>{{ product.quantity }}</td>

        <td>{{ "$ " + product.price }}</td>

      </tr>
    </tbody>
  </table>
</template>

<script>
export default {
  props: ["products"]
}
</script>
