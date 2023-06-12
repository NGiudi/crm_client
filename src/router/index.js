import { createRouter, createWebHistory } from "vue-router";

import { useLoggedUserStore } from "../stores/loggedUserStore";
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
      path: PATHS.home,
      name: "home",
      component: () => import("../pages/home/HomePage.vue"),
      meta: {
        requiresAuth: true,
      }
    },
    {
      path: PATHS.notFound,
      name: "not-found",
      component: () => import("../pages/common/NotFoundPage.vue"),
    },
    {
      path: PATHS.productsDetail,
      name: "product-detail",
      component: () => import("../pages/products/ProductDetailPage.vue"),
      meta: {
        requiresAuth: true,
      }
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
      path: PATHS.salesDetail,
      name: "sales-detail",
      component: () => import("../pages/sales/SalesDetailPage.vue"),
      meta: {
        requiresAuth: true,
      }
    },
    {
      path: PATHS.salesList,
      name: "sales-list",
      component: () => import("../pages/sales/SalesListPage.vue"),
      meta: {
        requiresAuth: true,
      }
    },
    {
      path: PATHS.salesNew,
      name: "sales-new",
      component: () => import("../pages/sales/SaleNewPage.vue"),
      meta: {
        requiresAuth: true,
      }
    },
    {
      path: PATHS.usersDetail,
      name: "user-detail",
      component: () => import("../pages/users/UsersDetailPage.vue"),
      meta: {
        requiresAuth: true,
      }
    },
    {
      path: PATHS.usersList,
      name: "users-list",
      component: () => import("../pages/users/UsersListPage.vue"),
      meta: {
        requiresAuth: true,
      }
    },
    {
      path: PATHS.usersNew,
      name: "users-new",
      component: () => import("../pages/users/UserNewPage.vue"),
      meta: {
        requiresAuth: true,
      }
    },
    {
      path: PATHS.productsNew,
      name: "products-new",
      component: () => import("../pages/products/ProductNewPage.vue"),
      meta: {
        requiresAuth: true,
      }
    },
    {
      path: PATHS.default,
      name: 'not-found',
      component: () => import("../pages/common/NotFoundPage.vue"),
    },
  ]
});

router.beforeEach((to, from, next) => {
  const userStore = useLoggedUserStore();
  const { isLogged } = storeToRefs(userStore);

  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (!isLogged.value) {
      next({ path: PATHS.login, query: { redirect_url: to.fullPath } });
    } else {
      next();
    }
  } else {
    next();
  }
});

export default router;
