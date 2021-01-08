<template>
  <div
    class="border border-gray-200 rounded card hover:bg-gray-100 cursor-pointer "
  >
    <router-link :to="link">
      <img :src="image" :alt="title" />
      <div class="p-5">
        <h3 class="mt-5 font-bold">{{ title }}</h3>
      </div>
    </router-link>
  </div>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      required: true
    },
    image: {
      type: String,
      required: true
    }
  },
  computed: {
    link() {
      return `categories/${this.title.toLowerCase()}`;
    }
  }
};
</script>

<style scoped lang="scss">
.card {
  max-height: 250px;
  img {
    height: 60%;
    width: 100%;
    object-fit: cover;
  }
}
</style>
