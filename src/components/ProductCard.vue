<template>
  <div class="border border-gray-200 card">
    <router-link :to="'/products/' + slug">
      <img :src="image" :alt="title"
    /></router-link>

    <div class="mt-3 p-5">
      <router-link :to="'/products/' + slug"
        ><h3 class="font-bold hover:underline cursor-pointer">
          {{ title }}
        </h3></router-link
      >
      <p class="mt-2">{{ formattedDescription }}</p>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      required: true
    },
    category: {
      type: String,
      required: true
    },
    image: {
      type: String,
      required: true
    },
    description: {
      type: String,
      required: true
    },
    slug: {
      type: String,
      required: true
    }
  },
  computed: {
    formattedDescription() {
      if (this.description.length > 65) {
        return `${this.description.slice(0, 65)}...`;
      }

      return this.description;
    }
  }
};
</script>

<style scoped lang="scss">
.card {
  height: 250px;
  img {
    object-fit: cover;
    object-position: center;
    height: 50%;
    width: 100%;
  }
}
</style>
