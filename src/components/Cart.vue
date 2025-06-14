<template>
  <div class="container mx-auto px-4 py-6">
    <h1 class="text-3xl font-bold mb-6 text-gray-800">Seu Carrinho</h1>

    <div v-if="cart.items.length === 0" class="text-gray-600 text-lg">
      <p>O carrinho está vazio.</p>
    </div>

    <div v-else class="space-y-4">
      <div
        v-for="item in cart.items"
        :key="item.id"
        class="flex flex-col sm:flex-row justify-between items-start sm:items-center bg-white p-4 rounded-lg shadow-md"
      >
        <div class="mb-2 sm:mb-0">
          <h2 class="text-lg font-semibold text-gray-800">{{ item.title }}</h2>
          <p class="text-sm text-gray-600">Quantidade: {{ item.quantity }}</p>
          <p class="text-sm text-gray-600">Preço unitário: ${{ item.price }}</p>
        </div>

        <div class="flex flex-col items-end">
          <p class="text-lg font-bold text-green-600">${{ (item.price * item.quantity).toFixed(2) }}</p>
          <button
            @click="removeFromCart(item.id)"
            class="mt-2 text-sm text-red-600 hover:underline flex items-center gap-1"
          >
            <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
            Remover
          </button>
        </div>
      </div>

      <div class="text-right mt-6 border-t pt-4">
        <p class="text-xl font-bold text-gray-800">
          Total: <span class="text-green-600">${{ cartTotal().toFixed(2) }}</span>
        </p>
        <button
          @click="clearCart"
          class="mt-3 bg-red-600 text-white px-5 py-2 rounded-lg hover:bg-red-700 transition"
        >
          Limpar carrinho
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { inject } from 'vue';

export default {
  name: 'Cart',
  setup() {
    const cart = inject('cart');
    const removeFromCart = inject('removeFromCart');
    const clearCart = inject('clearCart');
    const cartTotal = inject('cartTotal');

    return {
      cart,
      removeFromCart,
      clearCart,
      cartTotal,
    };
  },
};
</script>
