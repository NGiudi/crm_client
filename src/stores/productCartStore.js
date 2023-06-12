import { defineStore, storeToRefs } from "pinia";

import { useLoggedUserStore } from "./loggedUserStore";

export const useProductCartStore = defineStore("productCart", {
  state: () => {
    return {
      products: [],
      client: "",
    };
  },
  actions: {
    addProduct(product) {
      const productInList = this.products.find((p) => p.id === product.id);

      if (productInList) {
        productInList.quantity++;
      } else {
        product.quantity = 1;
        this.products.push(product);
      }
    },
    clearCart() {
      this.$reset();
    },
    createRequestObject() {
      const loggedUserStore = useLoggedUserStore();
      const { user } = storeToRefs(loggedUserStore);

      return {
        client: this.client,
        products: this.products.map((p) => ({
          discount: p.discount,
          price: p.price,
          product_id: p.id,
          quantity: p.quantity,
        })),
        seller_id: user.value.id,
      };
    },
    deleteProduct(id) {
      this.products = this.products.filter((p) => p.id !== id);
    },
    setClient(client) {
      this.client = client;
    },
  },
});