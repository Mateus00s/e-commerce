<template>
  <CartProvider>
    <div>
      <!-- Cabeçalho com busca e links -->
      <header class="bg-white shadow p-4">
        <div class="container mx-auto flex justify-between items-center">
          <router-link to="/" class="text-blue-600 hover:underline">⬅ Voltar</router-link>
          <router-link to="/cart" class="text-blue-600 hover:underline">🛒 Carrinho</router-link>
        </div>
      </header>


      <!-- Conteúdo da rota atual -->
      <router-view />
    </div>
  </CartProvider>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue';
import { useRouter } from 'vue-router';
import axios from 'axios';
import gsap from 'gsap';

const categories = ref([]);
const navRef = ref(null);
const lastScrollY = ref(0);
const isVisible = ref(true);
const router = useRouter();

const fetchCategories = async () => {
  try {
    const res = await axios.get('https://dummyjson.com/products/categories');
    categories.value = res.data;
  } catch (err) {
    console.error('Erro ao buscar categorias:', err);
  }
};

const handleScroll = () => {
  const currentScroll = window.scrollY;

  if (currentScroll > lastScrollY.value && currentScroll > 100) {
    if (isVisible.value) {
      isVisible.value = false;
      gsap.to(navRef.value, { y: -100, duration: 0.3, ease: 'power2.out' });
    }
  } else {
    if (!isVisible.value) {
      isVisible.value = true;
      gsap.to(navRef.value, { y: 0, duration: 0.3, ease: 'power2.out' });
    }
  }

  lastScrollY.value = currentScroll;
};

const goCategory = (category) => {
  router.push({ name: 'CatalogView', params: { category } });
};

onMounted(() => {
  fetchCategories();
  window.addEventListener('scroll', handleScroll);
});

onBeforeUnmount(() => {
  window.removeEventListener('scroll', handleScroll);
});

</script>