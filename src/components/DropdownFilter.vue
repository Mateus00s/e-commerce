<template>
  <div class="relative dropdown-wrapper w-full max-w-xs">
    <button
      @click="isOpen = !isOpen"
      class="flex items-center justify-between w-full px-4 py-2 border rounded-[10px] bg-white hover:bg-gray-50 shadow"
    >
      <span class="truncate">{{ selectedFilter || 'Filtrar por categoria' }}</span>
      <svg
        class="w-5 h-5 ml-2"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M19 9l-7 7-7-7"
        />
      </svg>
    </button>

    <div
      v-if="isOpen"
      class="absolute z-10 w-full mt-1 bg-white border rounded-[10px] shadow-lg max-h-60 overflow-y-auto"
    >
      <div class="py-1">
        <button
          @click="selectFilter({ label: 'Todas', value: '' })"
          class="block w-full px-4 py-2 text-left hover:bg-gray-100"
        >
          Todas
        </button>
        <button
          v-for="category in categories"
          :key="category"
          @click="selectFilter({ label: formatCategory(category), value: category })"
          class="block w-full px-4 py-2 text-left hover:bg-gray-100"
        >
          {{ formatCategory(category) }}
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue';
import api from '../services/api';

const emit = defineEmits(['filter']);
const isOpen = ref(false);
const selectedFilter = ref('');
const categories = ref([]);

function formatCategory(category) {
  return category
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}

async function fetchCategories() {
  try {
    const response = await api.get('/products/categories');
    categories.value = response.data;
  } catch (error) {
    console.error('Erro ao buscar categorias:', error);
    categories.value = [];
  }
}

function selectFilter(filter) {
  selectedFilter.value = filter.label;
  emit('filter', filter.value);
  isOpen.value = false;
}

// Fecha o menu se clicar fora
function handleClickOutside(event) {
  // Executa depois do clique no botão (permite abrir)
  setTimeout(() => {
    if (!event.target.closest('.dropdown-wrapper')) {
      isOpen.value = false;
    }
  }, 0);
}


onMounted(() => {
  fetchCategories();
  document.addEventListener('mousedown', handleClickOutside); 
});

onBeforeUnmount(() => {
  document.removeEventListener('mousedown', handleClickOutside); 
});

</script>
