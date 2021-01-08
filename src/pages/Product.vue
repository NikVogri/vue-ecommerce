<template>
  <div class="mt-5">
    <p v-if="loading">loading....</p>
    <div class="flex product" v-if="product">
      <div class="border border-solid border-gray-200 p-5">
        <img
          :src="product.image"
          :alt="product.title"
          class="cursor-pointer"
          @click="fullscreenMode = true"
        />
      </div>
      <div class="ml-8 py-5">
        <h1 class="font-bold text-4xl">{{ product.title }}</h1>
        <span class="mb-3 block">Category: {{ product.categories }}</span>
        <hr />
        <p class="mt-3">{{ product.description }}</p>
        <buy-product-button @addToCart="addToCart" :slug="product.slug" />
      </div>
    </div>
    <fullscreen-image
      :image="product.image"
      :title="product.title"
      v-if="fullscreenMode"
      @closeFullScreenMode="fullscreenMode = false"
    />
  </div>
</template>

<script>
import axios from "axios";
import { mapGetters } from "vuex";
import FullscreenImage from "../components/FullscreenImage";
import BuyProductButton from "../components/BuyProductButton";

export default {
  components: {
    FullscreenImage,
    BuyProductButton
  },
  data() {
    return {
      product: null,
      loading: true,
      fullscreenMode: false
    };
  },
  mounted() {
    this.getProduct(this.$route.params.slug);
  },
  methods: {
    async getProduct(slug) {
      try {
        const res = await axios.get(
          `${process.env.VUE_APP_FIREBASE_DB_URL}/items.json`
        );

        this.product = res.data.find(
          product => product && product.slug === slug
        );
      } catch (err) {
        console.log(err);
      } finally {
        this.loading = false;
      }
    },
    addToCart() {
      this.$store.commit("addToCart", this.product);
    }
  }
};
</script>

<style scoped lang="scss"></style>
