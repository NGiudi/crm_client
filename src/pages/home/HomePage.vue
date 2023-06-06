<script setup>
import AppLayout from '../../components/AppLayout/AppLayout.vue';
import 'animate.css';
</script>

<template>
<AppLayout>
    <h1 class="animate__animated animate__zoomInDown">Bienvenido!!!</h1>
    <div class="container">
        <div class="card text-center mb-3" style="width: 18rem;">
            <div class="card-body">
                <h2 class="card-title">Productos</h2>
                <p class="card-text">Listado de productos.</p>
                <button @click="$router.push('/products')">Entrar</button>
            </div>
        </div> 
        <div class="card text-center mb-3" style="width: 18rem;">
            <div class="card-body">
                <h2 class="card-title">Ventas</h2>
                <p class="card-text">Listado de ventas.</p>
                <button @click="$router.push('/sales')">Entrar</button>
            </div>
        </div> 
        <div class="card text-center mb-3" style="width: 18rem;">
            <div class="card-body">
                <h2 class="card-title">Usuarios</h2>
                <p class="card-text">Listado de usuarios.</p>
                <button @click="$router.push('/users')">Entrar</button>
            </div>
        </div>    
    </div>  
</AppLayout> 
</template>

<script>
export default{}
</script>

<style scoped>
.container {
  margin-top: 2rem;
  display: flex;
  justify-content: space-around;
  align-items: center;
}

button {
  font-size: 1rem;
  padding: 0.5rem 1rem;
  margin: 1rem;
}
</style>