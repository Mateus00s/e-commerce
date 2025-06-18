<!-- src/views/ProductDetail.vue -->
<template>
  <div class="container mx-auto px-4 py-6">
    <div v-if="product" class="flex flex-col md:flex-row gap-6">
      <img :src="product.thumbnail" :alt="product.title" class="w-full md:w-1/3 object-cover rounded" />
      <div>
        <h1 class="text-2xl font-bold mb-2">{{ product.title }}</h1>
        <p class="text-gray-700 mb-2">{{ product.description }}</p>
        <p class="text-xl font-semibold text-green-600 mb-2">${{ product.price }}</p>
        <p class="mb-1"><strong>Marca:</strong> {{ product.brand }}</p>
        <p class="mb-1"><strong>Categoria:</strong> {{ product.category }}</p>
        <p class="mb-4"><strong>Avaliação:</strong> {{ product.rating.toFixed(2) }} ⭐</p>
        <button
          @click="addToCart(product)"
          class="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Adicionar ao carrinho
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { inject, ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import api from '../services/api';

export default {
  name: 'ProductDetail',
  setup() {
    const product = ref(null);
    const route = useRoute();
    const addToCart = inject('addToCart');

    onMounted(async () => {
      const { data } = await api.get(`/products/${route.params.id}`);
      product.value = data;
    });

    return {
      product,
      addToCart,
    };
  },
};
</script>
