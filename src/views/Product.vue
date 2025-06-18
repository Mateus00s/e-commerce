<template>
  <div>
    <header class="bg-gray-800 text-white p-4 flex justify-between items-center">
      <router-link to="/cart" class="relative">
        <span
          v-if="totalItems > 0"
          class="absolute -top-2 -right-2 bg-red-600 text-white text-xs px-2 rounded-full"
        >
          {{ totalItems }}
        </span>
      </router-link>
    </header>

    <div class="container mx-auto px-4 py-6" v-if="product">
      <div class="grid md:grid-cols-2 gap-6">
        <img :src="product.thumbnail" :alt="product.title" class="w-full h-auto rounded-lg shadow" />

        <div>
          <h1 class="text-3xl font-bold mb-2">{{ product.title }}</h1>
          <p class="text-gray-700 mb-4">{{ product.description }}</p>
          <p class="text-xl font-semibold text-green-600 mb-2">$ {{ product.price }}</p>
          <p class="text-sm text-gray-500 mb-2">Marca: {{ product.brand }}</p>
          <p class="text-sm text-gray-500 mb-2">Categoria: {{ product.category }}</p>
          <p class="text-sm text-yellow-500 mb-2">Avaliação: {{ product.rating }} ⭐</p>
          <p class="text-xl font-semibold text-green-600 mb-2">Estoque: {{ product.stock }}</p>

          <button
            @click="addToCart(product)"
            class="bg-green-600 text-white px-4 py-2 rounded mt-4 hover:bg-green-700"
          >
            Adicionar ao carrinho
          </button>
        </div>
      </div>
    </div>

    <div v-else class="text-center py-20">
      Carregando produto...
    </div>
  </div>
</template>

<script>
import api from '../services/api';

export default {
  name: 'Product',
  data() {
    return {
      product: null,
      totalItems: 0, // precisa definir totalItems ou pegar do store/global
    };
  },
  async created() {
    const productId = this.$route.params.id;
    try {
      const response = await api.get(`/products/${productId}`);
      this.product = response.data;
    } catch (error) {
      console.error('Erro ao carregar produto:', error);
    }
  },
  methods: {
    addToCart(product) {
      // lógica para adicionar o produto ao carrinho
      console.log('Adicionar ao carrinho:', product);
    },
  },
};
</script>
