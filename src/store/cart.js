const getCartItemIndex = (allProductsInCart, slug) =>
  allProductsInCart.findIndex(product => product.slug === slug);

export const cart = {
  state: {
    cartOpen: false,
    productsInCart: []
  },
  getters: {
    productsInCartCount(state) {
      return state.productsInCart.length;
    },
    productsInCart(state) {
      return state.productsInCart;
    },
    isInCart(state) {
      return function(slug) {
        return getCartItemIndex(state.productsInCart, slug) !== -1;
      };
    }
  },
  mutations: {
    addToCart(state, payload) {
      const productInCartIndex = state.productsInCart.findIndex(
        product => product.slug === payload.slug
      );

      if (productInCartIndex !== -1) {
        const product = state.productsInCart[productInCartIndex];
        this.commit("incrementQuantity", product.slug);

        return;
      }

      state.productsInCart.push({ ...payload, quantity: 1 });
    },
    removeItemFromCart(state, payload) {
      state.productsInCart = state.productsInCart.filter(
        product => product.slug !== payload
      );
    },
    incrementQuantity(state, payload) {
      const productInCartIndex = getCartItemIndex(
        state.productsInCart,
        payload
      );

      if (productInCartIndex !== -1) {
        const product = state.productsInCart[productInCartIndex];

        if (product.quantity + 1 <= 20) {
          product.quantity = product.quantity + 1;
        }
      }
    },
    decrementQuantity(state, payload) {
      const productInCartIndex = getCartItemIndex(
        state.productsInCart,
        payload
      );

      if (productInCartIndex !== -1) {
        const product = state.productsInCart[productInCartIndex];

        if (product.quantity - 1 === 0) {
          return this.commit("removeItemFromCart", product.slug);
        }

        product.quantity = product.quantity - 1;
      }
    },
    setCartItems(state, payload) {
      state.productsInCart = payload;
    }
  },
  actions: {
    persistCart({ commit }) {
      const localStorageCartData = JSON.parse(localStorage.getItem("cart"));

      if (localStorageCartData) {
        commit("setCartItems", localStorageCartData);
      }
    }
  }
};
