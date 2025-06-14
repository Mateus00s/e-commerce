<template>
  <CartProvider>
    <div>
      <header class="bg-white shadow p-4">
        <div class="container mx-auto flex justify-between items-center">
          <SearchBar />
          <router-link to="/cart" class="text-blue-600 hover:underline">🛒 Carrinho</router-link>
        </div>
      </header>
      <router-view />
    </div>
  </CartProvider>
</template>

<script>
import CartProvider from './components/CartProvider.vue';
import SearchBar from './components/SearchBar.vue';

export default {
  components: { CartProvider, SearchBar },
};
</script>
