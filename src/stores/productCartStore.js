import { defineStore } from "pinia";

export const useProductCartStore = defineStore("productCart", {
  state: () => {
    return {
      products: [],
      client: {},
    };
  },
  actions: {
    addProduct(product) {
      const productInList = this.products.find((p) => p.id === product.id);

      if (productInList) {
        productInList.quantity ++;
      } else {
        product.quantity = 1;
        this.products.push(product);
      }
    },
    deleteProduct(id) {
      this.products = this.products.filter((p) => p.id !== id); 
    }
  },
});