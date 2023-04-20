<template>
  <table class="table">
    <thead>
      <tr>
        <th scope="col" v-for="field in fields">
          {{ field.name }}
        </th>
      </tr>
    </thead>
    
    <tbody>
      <tr v-for="item in data">
        <td v-for="field in fields">
          {{ item[field.key] }}
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script>
  export default {
    props: ["fields", "data"],
  }
</script>