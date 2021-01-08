import VueX from "vuex";
import Vue from "vue";

import { cart } from "./cart";
import { auth } from "./auth";

Vue.use(VueX);

const store = new VueX.Store({
  modules: {
    cart,
    auth
  }
});

export default store;
