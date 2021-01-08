import VueRouter from "vue-router";
import Vue from "vue";
import Homepage from "./pages/Homepage.vue";
import Items from "./pages/Items.vue";
import Cart from "./pages/Cart.vue";
import Category from "./pages/Category.vue";
import Product from "./pages/Product.vue";
import Login from "./pages/Login.vue";
import Register from "./pages/Register.vue";

Vue.use(VueRouter);

import router from "./router";
import store from "./store/store";

const routes = [
  { path: "/", component: Homepage },
  { path: "/items", component: Items },
  {
    path: "/cart",
    component: Cart,
    beforeEnter: (to, from, next) => {
      if (store.getters.isAuth) {
        return next();
      }

      router.push("/login");
    }
  },
  {
    path: "/categories/:category",
    component: Category
  },
  {
    path: "/products/:slug",
    component: Product
  },
  {
    path: "/login",
    component: Login
  },
  {
    path: "/register",
    component: Register
  }
];

export default new VueRouter({ mode: "history", routes });
