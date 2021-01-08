import axios from "axios";

import router from "../router";

export const auth = {
  state: {
    errorMessage: null,
    idToken: null,
    refreshToken: null,
    isAuth: false,
    email: ""
  },
  getters: {
    errorMessage(state) {
      return state.errorMessage;
    },
    isAuth(state) {
      return state.isAuth;
    },
    user(state) {
      return {
        email: state.email,
        idToken: state.idToken
      };
    }
  },
  mutations: {
    auth(state, payload) {
      const { idToken, refreshToken, email } = payload;

      state.idToken = idToken;
      state.refreshToken = refreshToken;
      state.email = email;
      state.errorMessage = null;
      state.isAuth = true;

      localStorage.setItem(
        "auth",
        JSON.stringify({ idToken, refreshToken, email })
      );
    },
    setErrorMessage(state, payload) {
      switch (payload.error.message) {
        case "EMAIL_EXISTS":
          state.errorMessage =
            "The email address is already in use by another account.";
          break;
        case "TOO_MANY_ATTEMPTS_TRY_LATER":
          state.errorMessage =
            "We have blocked all requests from this device due to unusual activity. Try again later.";
          break;
        case "EMAIL_NOT_FOUND":
          state.errorMessage = "There is no user with that email found.";
          break;
        case "INVALID_PASSWORD":
          state.errorMessage = "Email and password combination is invalid.";
          break;

        default:
          state.errorMessage = "Something went wrong, please try again later.";
          break;
      }
    },
    logoutUser(state) {
      state.idToken = null;
      state.refreshToken = null;
      state.isAuth = false;
      state.email = "";

      localStorage.removeItem("auth");
    }
  },
  actions: {
    async loginUser({ commit }, payload) {
      try {
        const res = await axios.post(
          `${process.env.VUE_APP_FIREBASE_AUTH_URL}:signInWithPassword?key=${process.env.VUE_APP_FIREBASE_KEY}`,
          {
            ...payload,
            returnSecureToken: true
          }
        );

        commit("auth", res.data);
        router.push("/");
      } catch (err) {
        console.log(err.response);
        commit("setErrorMessage", err.response.data);
      }
    },
    async registerUser({ commit }, payload) {
      try {
        console.log(payload);
        const res = await axios.post(
          `${process.env.VUE_APP_FIREBASE_AUTH_URL}:signUp?key=${process.env.VUE_APP_FIREBASE_KEY}`,
          {
            ...payload,
            returnSecureToken: true
          }
        );

        commit("auth", res.data);
        router.back();
      } catch (err) {
        console.log(err.response);
        commit("setErrorMessage", err.response.data);
      }
    },
    persistUser({ commit }) {
      const userData = JSON.parse(localStorage.getItem("auth"));

      if (userData) {
        commit("auth", userData);
      }
    }
  }
};
