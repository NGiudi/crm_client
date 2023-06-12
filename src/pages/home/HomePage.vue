<script setup>
import { storeToRefs } from "pinia";
import AppLayout from '../../components/AppLayout/AppLayout.vue';
import { useLoggedUserStore } from "../../stores/loggedUserStore";
import { getSalesStats } from "../../services/axios/salesService";

import { Bar } from 'vue-chartjs'
import { Chart as ChartJS, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale } from 'chart.js'

ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale)
const loggedUserStore = useLoggedUserStore();
const { user } = storeToRefs(loggedUserStore);  
</script>

<template>
    <AppLayout>
        <h1 class="animate__animated animate__zoomInDown">Bienvenido, <span>{{ user.names }}</span></h1>
        <div class="container" :class="{ menu: user.role !== 'admin' }">
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
        <div class="container">
            <Bar v-if="loaded" id="my-chart-id" :options="chartOptions" :data="chartData" />
        </div>


    </AppLayout>
</template>
    
<script>
export default {
    name: 'BarChart',
    components: { Bar },
    data() {
        return {
            loaded: false,
            chartData: null,

            chartOptions: {
                responsive: true,
                aspectRatio: 3.5,
                plugins: {
                    title: {
                        display: true,
                        text: 'Ventas del año',
                        padding: {
                            top: 10,
                            bottom: 30
                        },
                        font: { size: 25 },
                        color: "#41b883",
                        position: "left"
                    },
                    legend: {
                        position: 'bottom'
                    },
                }
            },

        }
    },
    methods: {
        getStats() {
            const loggedUserStore = useLoggedUserStore();
            const { user } = storeToRefs(loggedUserStore);
            getSalesStats(user.value.id).then((resp) => {
                this.chartData = {
                    labels: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'],
                    datasets: [{
                        label: 'Mis Ventas',
                        data: resp.stats.sellerSales,
                        backgroundColor: "#41b883"
                    },
                    {
                        label: 'Ventas Totales',
                        data: resp.stats.sales,
                        backgroundColor: "#35495e"
                    }
                    ],
                },
                    this.loaded = true;
            })
        }
    },
    async mounted() {
        this.loaded = false;
        this.getStats();
    }
}
</script>

<style scoped>
.menu{
    max-width: 850px;
}
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

h1 span {
    color: var(--color-primary);
    font-style: italic;
}

i {
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

.chart-container {
    display: flex;
    flex-direction: column;
    align-items: center;
}

.chart-title {
    font-size: 25px;
    color: white;
}
</style>