<template>
  <div class="mb-8 bg-white p-4 rounded-lg shadow-md">
    <h2 class="text-xl font-bold text-gray-800 mb-4">Categorias</h2>
    <ul class="space-y-3">
      <li v-for="category in categories" :key="category">
        <router-link
          :to="`/category/${category}`"
          class="flex items-center gap-2 text-blue-600 hover:text-blue-800 transition"
        >
          <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 text-blue-500" fill="none" viewBox="0 0 24 24"
               stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                  d="M9 5l7 7-7 7" />
          </svg>
          <span class="capitalize">{{ category.replace('-', ' ') }}</span>
        </router-link>
      </li>
    </ul>
  </div>
</template>

<script>
import api from '../services/api';

export default {
  name: 'CategoryMenu',
  data() {
    return {
      categories: [],
    };
  },
  async created() {
    try {
      const res = await api.get('/products/categories');
      this.categories = res.data;
    } catch (err) {
      console.error('Erro ao carregar categorias:', err);
    }
  },
};
</script>
