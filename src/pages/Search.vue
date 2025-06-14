<template>
  <div class="container mx-auto px-4 py-6">
    <h1 class="text-2xl font-bold mb-4">Resultados para: "{{ searchQuery }}"</h1>

    <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      <div
        v-for="product in products"
        :key="product.id"
        class="bg-white rounded-lg shadow-md p-4 hover:shadow-lg transition"
      >
        <img :src="product.thumbnail" class="w-full h-40 object-cover rounded mb-2" />
        <h2 class="text-lg font-semibold">{{ product.title }}</h2>
        <p class="text-gray-700">${{ product.price }}</p>
        <router-link :to="`/product/${product.id}`" class="text-blue-600 hover:underline mt-2 inline-block">
          Ver detalhes
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
import api from '../services/api';

export default {
  name: 'Search',
  data() {
    return {
      products: [],
    };
  },
  computed: {
    searchQuery() {
      return this.$route.params.query;
    },
  },
  async created() {
    try {
      const res = await api.get(`/products/search?q=${this.searchQuery}`);
      this.products = res.data.products;
    } catch (err) {
      console.error('Erro ao buscar produtos:', err);
    }
  },
};
</script>
