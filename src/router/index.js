import { createRouter, createWebHistory } from "vue-router";

import { useLoggedUserStore } from "../stores/loggedUser";  
import { storeToRefs } from "pinia";

import { PATHS } from "../assets/constants/constants";


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: PATHS.login,
      name: "login",
      component: () => import("../pages/LoginPage.vue"),
    },
    {
      path: PATHS.productsList,
      name: "products-list",
      component: () => import("../pages/products/ProductListPage.vue"),
      meta: {
        requiresAuth: true,
      }
    },
    {
      path: PATHS.productsDetail,
      name: "product-detail",
      component: () => import("../pages/products/ProductDetailPage.vue"),
      meta: {
        requiresAuth: true,
      }
    }
  ]
});

router.beforeEach((to, from, next) => {
  const userStore = useLoggedUserStore();
  const { isLogged } = storeToRefs(userStore);

  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (!isLogged.value) {
      next({ path: PATHS.login });
    } else {
      next();
    }
  } else {
    next();
  }
});

export default router;
