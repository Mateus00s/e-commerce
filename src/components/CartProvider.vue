<template>
  <slot />
</template>

<script>
import { reactive, provide } from 'vue';

export default {
  name: 'CartProvider',
  setup() {
    const cart = reactive({
      items: [],
    });

    const addToCart = (product) => {
      const existing = cart.items.find((item) => item.id === product.id);
      if (existing) {
        existing.quantity += 1;
      } else {
        cart.items.push({ ...product, quantity: 1 });
      }
    };

    const removeFromCart = (productId) => {
      cart.items = cart.items.filter((item) => item.id !== productId);
    };

    const clearCart = () => {
      cart.items = [];
    };

    const cartTotal = () =>
      cart.items.reduce((total, item) => total + item.price * item.quantity, 0);

    provide('cart', cart);
    provide('addToCart', addToCart);
    provide('removeFromCart', removeFromCart);
    provide('clearCart', clearCart);
    provide('cartTotal', cartTotal);
  },
};
</script>
