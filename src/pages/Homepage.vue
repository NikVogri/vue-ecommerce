<template>
  <div class="mt-5 grid grid-cols-3 gap-3">
    <div v-if="loading">Loading...</div>
    <category-card
      v-for="category in categories"
      :key="category.title"
      :title="category.title"
      :image="category.image"
    />
  </div>
</template>

<script>
import axios from "axios";
import CategoryCard from "../components/CategoryCard";
export default {
  data() {
    return {
      categories: [],
      loading: true
    };
  },
  components: {
    CategoryCard
  },
  methods: {
    async getCategories() {
      try {
        const res = await axios.get(
          `${process.env.VUE_APP_FIREBASE_DB_URL}/categories.json`
        );

        this.categories = res.data;
      } catch (err) {
        console.log(err);
      } finally {
        this.loading = false;
      }
    }
  },
  mounted() {
    this.getCategories();
  }
};
</script>

<style></style>
