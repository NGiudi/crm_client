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
      // which is lazy-loaded when the route is visited.
      component: () => import("../views/Login/LoginView.vue")
    },
    {
      path: "/users",
      name: "users",
      // which is lazy-loaded when the route is visited.
      component: () => import("../views/Users/UsersView.vue")
    },
    {
      path: "/products",
      name: "productsList",
      // which is lazy-loaded when the route is visited.
      component: () => import("../views/Products/ProductsListView.vue")
    },
    {
      path: "/products/:id",
      name: "productDetail",
      // which is lazy-loaded when the route is visited.
      component: () => import("../views/Products/ProductDetailView.vue")
    }
  ]
})

export default router
