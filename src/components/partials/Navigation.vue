<template>
  <nav>
    <div class="navigation__inner">
      <router-link to="/"><h2>MyStore</h2></router-link>
      <ul class="navigation__links">
        <li>
          <p v-if="isAuth">Hi, {{ user.email.split("@")[0] }}</p>
        </li>
        <li><router-link to="/items">Items</router-link></li>
        <li v-if="isAuth">
          <button @click="showCartDropdown = true">
            Cart
            <span v-if="productsInCartCount > 0"
              >({{ productsInCartCount }})</span
            >
          </button>
          <cart-dropdown
            v-if="showCartDropdown"
            @closeDropdown="showCartDropdown = false"
          />
        </li>
        <li><router-link to="/login" v-if="!isAuth">Login</router-link></li>
        <li>
          <router-link to="/register" v-if="!isAuth">Register</router-link>
        </li>
        <li>
          <button @click="logoutUser" v-if="isAuth">Log out</button>
        </li>
      </ul>
    </div>
  </nav>
</template>

<script>
import { mapGetters } from "vuex";
import CartDropdown from "../CartDropdown";

export default {
  data() {
    return {
      showCartDropdown: false
    };
  },
  components: {
    CartDropdown
  },
  computed: {
    ...mapGetters(["isAuth", "user", "productsInCartCount"])
  },
  methods: {
    logoutUser() {
      this.$store.commit("logoutUser");
    }
  }
};
</script>

<style></style>
