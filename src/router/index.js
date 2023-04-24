import { createRouter, createWebHistory } from "vue-router";

import HomeView from "../views/Home/HomeView.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/home",
      name: "home",
      component: HomeView
    },
    {
      path: "/login",
      name: "login",
      component: () => import("../views/Login/LoginView.vue")
    },
    {
      path: "/users",
      name: "users",
      component: () => import("../views/Users/UsersView.vue")
    },
    {
      path: "/products",
      name: "productsList",
      component: () => import("../views/Products/ProductsListView.vue")
    },
    {
      path: "/products/:id",
      name: "productDetail",
      component: () => import("../views/Products/ProductDetailView.vue")
    }
  ]
})

export default router
