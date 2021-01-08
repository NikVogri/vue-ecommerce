<template>
  <div class="mt-8">
    <button
      v-if="isAuth"
      class="text-white px-8 py-2"
      :class="{
        'bg-green-400': !productInCart,
        'bg-red-400': productInCart,
        'hover:bg-green-500': !productInCart,
        'hover:bg-red-500': productInCart
      }"
      @click="addToCart"
    >
      {{ !productInCart ? "Buy Now" : "Added" }}
    </button>
    <router-link
      v-else
      class="bg-green-400 hover:bg-green-500 text-white px-8 py-2"
      to="/login"
    >
      Buy Now
    </router-link>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  props: {
    slug: {
      type: String,
      required: true
    }
  },
  methods: {
    addToCart() {
      this.$emit("addToCart");
    }
  },
  computed: {
    ...mapGetters(["isAuth", "isInCart"]),
    productInCart() {
      return this.isInCart(this.slug);
    }
  }
};
</script>

<style></style>
