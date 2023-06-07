<script setup>
import { storeToRefs } from "pinia";
import AppLayout from '../../components/AppLayout/AppLayout.vue';
import { useLoggedUserStore } from "../../stores/loggedUserStore";
import 'animate.css';

const loggedUserStore = useLoggedUserStore();
const { user } = storeToRefs(loggedUserStore);  
</script>

<template>
<AppLayout>
    <h1 class="animate__animated animate__zoomInDown">Bienvenido, <span>{{user.names}}</span></h1>
    <div class="container">
        <div class="card text-center mb-3" style="width: 18rem;">
            <div class="card-body">
                <h2 class="card-title">Productos</h2>
                <i class="fas fa-box"></i>
                <p class="card-text">Listado de productos.</p>
                <button class="button button-solid" @click="$router.push('/products')">Entrar</button>
            </div>
        </div> 
        <div class="card text-center mb-3" style="width: 18rem;">
            <div class="card-body">
                <h2 class="card-title">Ventas</h2>
                <i class="fas fa-money-bill-wave"></i>
                <p class="card-text">Listado de ventas.</p>
                <button class="button button-solid" @click="$router.push('/sales')">Entrar</button>
            </div>
        </div> 
        <div v-if="user.role === 'admin'" class="card text-center mb-3" style="width: 18rem;">
            <div class="card-body">
                <h2 class="card-title">Usuarios</h2>
                <i class="fas fa-users"></i>
                <p class="card-text">Listado de usuarios.</p>
                <button class="button button-solid" @click="$router.push('/users')">Entrar</button>
            </div>
        </div>    
    </div>  
</AppLayout> 
</template>

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

h1 span{
    color: var(--color-primary);
    font-style: italic;
}

i{
    font-size: 90px;
    padding: 2rem;
    color: var(--color-primary);
}
.animate__animated.animate__zoomInDown {
  --animate-duration: 2s;
  margin: 1rem;
  display: block;
  text-align: center;
}
</style>