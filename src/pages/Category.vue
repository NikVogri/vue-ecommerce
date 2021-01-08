<template>
  <div
    class="grid gap-3 grid-cols-1 mt-5 grid-wrap md:grid-cols-2 lg:grid-cols-3"
  >
    <product-card
      v-for="product in products"
      :key="product.title"
      :category="product.categories"
      :description="product.description"
      :image="product.image"
      :title="product.title"
      :slug="product.slug"
    />
  </div>
</template>

<script>
import axios from "axios";
import ProductCard from "../components/ProductCard.vue";

export default {
  components: { ProductCard },
  data() {
    return {
      products: [],
      loading: true
    };
  },
  mounted() {
    const category = this.$route.params.category;
    this.getItemsByCategory(category);
  },
  methods: {
    async getItemsByCategory(category) {
      try {
        const res = await axios.get(
          `${process.env.VUE_APP_FIREBASE_DB_URL}/items.json`
        );

        this.products = res.data.filter(product => {
          return product && product.categories === category;
        });
      } catch (err) {
        console.log(err);
      } finally {
        this.loading = false;
      }
    }
  }
};
</script>

<style></style>
