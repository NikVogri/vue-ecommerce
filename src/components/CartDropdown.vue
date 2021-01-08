<template>
  <li class="relative">
    <div
      class="absolute right-0 bg-white p-4 rounded border-gray-400 border dropdown mt-3"
      v-on-clickaway="closeDropdown"
    >
      <button class="absolute top-2 right-2" @click="closeDropdown">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="22"
          height="22"
          viewBox="0 0 36 36"
        >
          <g fill="#303030">
            <path
              d="M28.5 9.62L26.38 7.5 18 15.88 9.62 7.5 7.5 9.62 15.88 18 7.5 26.38l2.12 2.12L18 20.12l8.38 8.38 2.12-2.12L20.12 18z"
            ></path>
          </g>
        </svg>
      </button>
      <ul class="px-3 cart-products mt-5">
        <li
          v-for="product in productsInCart"
          :key="product.slug"
          class="flex mb-3 items-center flex-auto cart-products__item border-b pb-3"
        >
          <img :src="product.image" :alt="product.title" />
          <h2 class="flex-auto title ml-5">{{ product.title }}</h2>
          <p class="flex-auto ">{{ product.quantity }}</p>
          <button @click="removeItemFromCart(product.slug)">remove</button>
        </li>
      </ul>
      <p v-if="!productsInCartCount" class="mb-4">
        No items in cart, add them now!
      </p>
      <div class="text-right py-2" v-if="productsInCartCount">
        <router-link
          to="/cart"
          class="mr-2 bg-green-400 hover:bg-green-500 text-white px-8 py-3 align-right"
        >
          Go to cart
        </router-link>
      </div>
    </div>
  </li>
</template>

<script>
import { mixin as clickaway } from "vue-clickaway";
import { mapGetters, mapMutations } from "vuex";
export default {
  mixins: [clickaway],
  computed: {
    ...mapGetters(["isAuth", "productsInCart", "productsInCartCount"])
  },
  methods: {
    ...mapMutations(["removeItemFromCart"]),
    closeDropdown() {
      this.$emit("closeDropdown");
    }
  },
  watch: {
    $route(to, from) {
      this.closeDropdown();
    }
  }
};
</script>

<style lang="scss">
.dropdown {
  width: 500px;
}

.cart-products__item {
  margin-right: 0 !important;

  img {
    height: 50px;
    width: 50px;
    object-fit: cover;
  }

  .title {
    max-width: 200px;
  }
}
</style>
