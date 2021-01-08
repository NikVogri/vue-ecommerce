<template>
  <div
    class="mt-3 card flex items-center border border-gray-400 rounded p-3 justify-between"
  >
    <img :src="image" :alt="title" />
    <h3 class="font-bold">{{ title }}</h3>
    <div class="d-flex items-center">
      <button type="button" @click="incrementQuantity(slug)">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="15"
          height="15"
          viewBox="0 0 448 512"
        >
          <title>plus</title>
          <g fill="#303030">
            <path
              d="M416 208H272V64c0-17.67-14.33-32-32-32h-32c-17.67 0-32 14.33-32 32v144H32c-17.67 0-32 14.33-32 32v32c0 17.67 14.33 32 32 32h144v144c0 17.67 14.33 32 32 32h32c17.67 0 32-14.33 32-32V304h144c17.67 0 32-14.33 32-32v-32c0-17.67-14.33-32-32-32z"
            ></path>
          </g>
        </svg>
      </button>
      <input
        type="number"
        :value="quantity"
        class="border border-gray-300 w-12 text-center mx-3"
        max="20"
        min="1"
      />
      <button type="button" @click="decrementQuantity(slug)">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="15"
          height="15"
          viewBox="0 0 448 512"
        >
          <title>minus</title>
          <g fill="#303030">
            <path
              d="M416 208H32c-17.67 0-32 14.33-32 32v32c0 17.67 14.33 32 32 32h384c17.67 0 32-14.33 32-32v-32c0-17.67-14.33-32-32-32z"
            ></path>
          </g>
        </svg>
      </button>
    </div>
    <button @click="removeItemFromCart(slug)">Remove</button>
  </div>
</template>

<script>
import { mapMutations } from "vuex";
export default {
  props: {
    image: {
      type: String,
      required: true
    },
    title: {
      type: String,
      required: true
    },
    quantity: {
      type: Number,
      required: true
    },
    slug: {
      type: String,
      required: true
    }
  },
  methods: {
    ...mapMutations([
      "removeItemFromCart",
      "incrementQuantity",
      "decrementQuantity"
    ])
  }
};
</script>

<style scoped lang="scss">
.card {
  img {
    height: 50px;
    width: 50px;
    object-fit: cover;
  }
}
</style>
