<template>
  <div>
    <navigation />
    <main class="container">
      <router-view />
    </main>
  </div>
</template>

<script>
import Navigation from "./components/partials/Navigation.vue";

export default {
  components: {
    Navigation
  },
  mounted() {
    this.$store.dispatch("persistUser");
    this.$store.watch(
      (state, getters) => getters.productsInCart,
      newVal => this.updateCart(newVal)
    );

    this.$store.dispatch("persistCart");
  },
  methods: {
    updateCart(newVal) {
      localStorage.setItem("cart", JSON.stringify(newVal));
    }
  }
};
</script>

<style lang="scss">
@import url("https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;700&display=swap");

/* ./src/index.css */

/*! @import */
@tailwind base;
@tailwind components;
@tailwind utilities;

*,
*::before,
*::after {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: roboto, sans-serif;
}

.container {
  width: 1024px;
  margin: 0 auto;
}
nav {
  width: 100%;
  height: 50px;
  @apply border-b;
}

.navigation {
  &__inner {
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 100%;
    max-width: 1024px;
    width: 90%;
    margin: 0 auto;

    a {
      text-decoration: none;
    }
  }

  &__links {
    display: flex;
    list-style: none;

    & li {
      &:not(:last-child) {
        margin-right: 15px;
      }
    }
  }
}

footer {
  position: absolute;
  bottom: 0;
  left: 0;
  text-align: center;
  width: 100%;
  height: 50px;
  line-height: 50px;
  @apply border-t;
}
</style>
