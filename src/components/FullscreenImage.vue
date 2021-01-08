<template>
  <div class="image-display h-full w-full">
    <img :src="image" :alt="title" class="image-display__image z-40" />
    <button class="z-50 image-display__close-btn">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="25"
        height="25"
        viewBox="0 0 36 36"
        @click="closeFullScreenMode"
      >
        <g fill="#fefefe">
          <path
            d="M28.5 9.62L26.38 7.5 18 15.88 9.62 7.5 7.5 9.62 15.88 18 7.5 26.38l2.12 2.12L18 20.12l8.38 8.38 2.12-2.12L20.12 18z"
          ></path>
        </g>
      </svg>
    </button>

    <div
      class="absolute top-0 left-0 h-full w-full bg-black opacity-80 z-10"
      @click="closeFullScreenMode"
    ></div>
  </div>
</template>

<script>
export default {
  props: {
    image: {
      type: String,
      required: true
    },
    title: {
      type: String,
      required: true
    }
  },
  methods: {
    closeFullScreenMode() {
      this.$emit("closeFullScreenMode");
    }
  }
};
</script>

<style lang="scss">
.image-display__image {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  max-height: 70vh;
}
.image-display__close-btn {
  position: absolute;
  z-index: 99;
  top: 10%;
  right: 30%;
}
</style>
