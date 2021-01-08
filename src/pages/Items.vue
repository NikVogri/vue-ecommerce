<template>
  <div class="grid grid-cols-3 gap-3 mt-5">
    <p v-if="loading">Loading...</p>
    <product-card
      v-for="product in products"
      :key="product.title"
      :image="product.image"
      :title="product.title"
      :category="product.categories"
      :description="product.description"
      :slug="product.slug"
    />
  </div>
</template>

<script>
import ProductCard from "../components/ProductCard";

import axios from "axios";
export default {
  components: {
    ProductCard
  },
  data() {
    return {
      loading: true,
      products: []
    };
  },
  methods: {
    async getProducts() {
      try {
        const res = await axios.get(
          `${process.env.VUE_APP_FIREBASE_DB_URL}/items.json`
        );
        this.products = res.data.filter(product => product);
      } catch (err) {
        console.log(err);
      } finally {
        this.loading = false;
      }
    }
  },
  mounted() {
    this.getProducts();
  }
};
</script>

<style></style>
