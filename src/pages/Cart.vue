<template>
  <div>
    <h1 class="mt-5 text-2xl font-bold">
      Products in cart
      <span v-if="productsInCartCount">({{ productsInCartCount }})</span>
    </h1>
    <cart-card
      v-for="cartItem in productsInCart"
      :key="cartItem.slug"
      :image="cartItem.image"
      :title="cartItem.title"
      :quantity="cartItem.quantity"
      :slug="cartItem.slug"
    />
    <p v-if="!productsInCartCount">No items in your cart!</p>
  </div>
</template>

<script>
import CartCard from "../components/CartCard";
export default {
  components: {
    CartCard
  },
  computed: {
    productsInCart() {
      return this.$store.getters.productsInCart;
    },
    productsInCartCount() {
      return this.$store.getters.productsInCartCount;
    }
  }
};
</script>

<style></style>
