<template>
  <div class="container mx-auto px-4 py-6">
    <h1 class="text-3xl font-bold mb-6 capitalize text-gray-800">
      Categoria: <span class="text-blue-600">{{ category.replace('-', ' ') }}</span>
    </h1>

    <div
      class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
    >
      <div
        v-for="product in products"
        :key="product.id"
        class="bg-white rounded-xl shadow-sm hover:shadow-md transition p-4 flex flex-col"
      >
        <img
          :src="product.thumbnail"
          :alt="product.title"
          class="w-full h-40 object-contain mb-4 rounded-md bg-gray-50"
        />
        <h2 class="text-lg font-semibold text-gray-800 mb-1 line-clamp-2">{{ product.title }}</h2>
        <p class="text-green-600 font-bold mb-2 text-base">${{ product.price }}</p>
        <router-link
          :to="`/product/${product.id}`"
          class="mt-auto inline-block text-sm text-blue-600 hover:text-blue-800 hover:underline transition"
        >
          Ver detalhes →
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
import api from '../services/api';

export default {
  name: 'Category',
  data() {
    return {
      products: [],
    };
  },
  computed: {
    category() {
      return this.$route.params.name;
    },
  },
  async created() {
    try {
      const res = await api.get(`/products/category/${this.category}`);
      this.products = res.data.products;
    } catch (err) {
      console.error('Erro ao carregar produtos da categoria:', err);
    }
  },
};
</script>
