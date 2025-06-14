<template>
  <div class="max-w-7xl mx-auto px-4 py-8">
    <h1 class="text-3xl font-extrabold mb-8 text-gray-900 text-center">Todos os Produtos</h1>

    <!-- SearchBar -->
    <SearchBar @search="handleSearch" />

    <div
      class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-8"
    >
      <div
        v-for="product in paginatedProducts"
        :key="product.id"
        class="bg-white rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 flex flex-col"
      >
        <div class="overflow-hidden rounded-t-lg">
          <img
            :src="product.thumbnail"
            :alt="product.title"
            class="w-full h-48 sm:h-56 md:h-48 lg:h-52 object-cover transform hover:scale-105 transition-transform duration-300"
            loading="lazy"
          />
        </div>
        <div class="flex flex-col flex-grow p-4">
          <h2
            class="text-lg font-semibold text-gray-800 mb-2 line-clamp-2"
            :title="product.title"
          >
            {{ product.title }}
          </h2>
          <p class="text-green-700 font-bold text-xl mb-4">${{ product.price.toFixed(2) }}</p>

          <div class="mt-auto flex justify-between items-center gap-2">
            <router-link
              :to="`/product/${product.id}`"
              class="text-blue-600 hover:text-blue-800 font-medium text-sm focus:outline-none focus:ring-2 focus:ring-blue-400 rounded"
              tabindex="0"
            >
              Ver detalhes
            </router-link>
            <button
              @click="addToCart(product)"
              class="bg-green-600 hover:bg-green-700 text-white rounded px-4 py-2 text-sm font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-green-400 cursor-pointer"
              type="button"
            >
              Adicionar ao carrinho
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Paginação -->
    <nav
      class="flex justify-center items-center mt-10 space-x-2 select-none"
      aria-label="Paginação"
    >
      <button
        class="px-3 py-1 rounded border border-gray-300 hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-blue-400"
        :disabled="currentPage === 1"
        @click="prevPage"
        type="button"
      >
        Anterior
      </button>

      <button
        v-for="page in totalPages"
        :key="page"
        @click="goToPage(page)"
        class="px-3 py-1 rounded border border-gray-300 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-400"
        :class="{
          'bg-blue-600 text-white border-blue-600 cursor-default': currentPage === page,
          'cursor-pointer': currentPage !== page,
        }"
        type="button"
        :aria-current="currentPage === page ? 'page' : null"
      >
        {{ page }}
      </button>

      <button
        class="px-3 py-1 rounded border border-gray-300 hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-blue-400"
        :disabled="currentPage === totalPages"
        @click="nextPage"
        type="button"
      >
        Próxima
      </button>
    </nav>

    <p v-if="filteredProducts.length === 0" class="text-center text-gray-500 mt-24">
      Nenhum produto disponível no momento.
    </p>
  </div>
</template>

<script>
import { ref, computed, onMounted, inject } from 'vue';
import api from '../services/api';
import SearchBar from '../components/SearchBar.vue';

export default {
  name: 'Home',
  components: { SearchBar },
  setup() {
    const products = ref([]);
    const addToCart = inject('addToCart');
    const searchTerm = ref('');

    const currentPage = ref(1);
    const productsPerPage = 9;

    // Filtra produtos pelo título conforme o searchTerm (case-insensitive)
    const filteredProducts = computed(() => {
      if (!searchTerm.value.trim()) return products.value;
      return products.value.filter(product =>
        product.title.toLowerCase().includes(searchTerm.value.toLowerCase())
      );
    });

    const totalPages = computed(() =>
      Math.ceil(filteredProducts.value.length / productsPerPage)
    );

    const paginatedProducts = computed(() => {
      const start = (currentPage.value - 1) * productsPerPage;
      return filteredProducts.value.slice(start, start + productsPerPage);
    });

    function goToPage(page) {
      if (page >= 1 && page <= totalPages.value) {
        currentPage.value = page;
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    }

    function prevPage() {
      if (currentPage.value > 1) {
        goToPage(currentPage.value - 1);
      }
    }

    function nextPage() {
      if (currentPage.value < totalPages.value) {
        goToPage(currentPage.value + 1);
      }
    }

    // Atualiza o termo de busca e reseta para a página 1
    function handleSearch(term) {
      searchTerm.value = term;
      currentPage.value = 1;
    }

    onMounted(async () => {
      try {
        const res = await api.get('/products');
        products.value = res.data.products;
      } catch (error) {
        console.error('Erro ao carregar produtos:', error);
      }
    });

    return {
      products,
      filteredProducts,
      paginatedProducts,
      addToCart,
      currentPage,
      totalPages,
      goToPage,
      prevPage,
      nextPage,
      handleSearch,
    };
  },
};
</script>

<style>
.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>
