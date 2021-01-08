<template>
  <div class="p-4 mt-5 w-1/3 mx-auto">
    <form
      class="border border-gray-300 rounded p-5"
      @submit.prevent="checkForm"
    >
      <h1 class="mb-5 font-bold text-2xl text-center">Login</h1>
      <div class="mb-3">
        <input
          type="text"
          class="border border-gray-300 rounded px-2 py-1 w-full"
          placeholder="Email"
          v-model="formData.email"
        />
        <p
          class="text-red-400 align-left text-sm mt-1 ml-1"
          v-if="formErrors.email"
        >
          {{ formErrors.email }}
        </p>
      </div>
      <div class="mb-3">
        <input
          type="password"
          class="border border-gray-300 rounded px-2 py-1 w-full"
          placeholder="Password"
          v-model="formData.password"
        />
        <p
          class="text-red-400 align-left text-sm mt-1 ml-1"
          v-if="formErrors.password"
        >
          {{ formErrors.password }}
        </p>
      </div>

      <button
        type="submit"
        class="block mx-auto bg-green-400 hover:bg-green-500 text-white px-8 py-2 w-full mb-2"
      >
        Log in
      </button>
      <p v-if="errorMessage" class="text-red-400 align-left text-sm mt-1 ml-1">
        {{ errorMessage }}
      </p>
      <small class="align"
        >Don't have an account yet?
        <router-link to="/register" class="text-blue-600 hover:underline"
          >Sign up</router-link
        ></small
      >
    </form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      formErrors: {
        email: "",
        password: ""
      },
      formData: {
        email: "",
        password: ""
      }
    };
  },

  methods: {
    checkForm() {
      if (!this.formData.email) {
        return (this.formErrors.email = "Email is required");
      }

      if (!this.formData.password) {
        return (this.formErrors.password = "Password is required");
      }

      if (this.formData.password.length < 5) {
        return (this.formErrors.password =
          "Password must be longer than 5 characters");
      }

      const emailRegex = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/g;

      if (!this.formData.email.match(emailRegex)) {
        return (this.formErrors.email = "Enter a valid email address");
      }

      this.loginUser();
    },
    loginUser() {
      this.$store.dispatch("loginUser", this.formData);
    }
  },
  computed: {
    errorMessage() {
      return this.$store.getters.errorMessage;
    }
  }
};
</script>

<style lang="scss"></style>
