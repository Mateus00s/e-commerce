<script setup>
import { ShoppingCart } from "lucide-vue-next";
import { useRouter } from 'vue-router';

const props = defineProps({
    product: {
        type: Object,
        required: true
    }
});

const router = useRouter();

const goToDetails = () => {
    router.push({ name: 'ProductDetails', params: { id: props.product.id } });
};
</script>

<template>
    <div @click="goToDetails"
        class="cursor-pointer flex flex-col items-center justify-between gap-3 p-4 border border-zinc-100 rounded-xl bg-zinc-50 shadow-md hover:shadow-lg transition-shadow w-full max-w-xs">

        <figure class="rounded-md overflow-hidden w-full relative">
  <img :src="product.thumbnail" :alt="product.title" class="rounded-md w-full object-cover aspect-square" />

  <div
    class="absolute top-2 right-2 rounded-full px-2 py-1 text-xs font-semibold"
    :class="product.stock > 0 ? 'bg-green-500 text-zinc-100' : 'bg-red-500 text-zinc-100'"
  >
    {{ product.stock > 0 ? 'Em estoque' : 'Indisponível' }}
  </div>
</figure>


        <div class="text-center w-full px-2">
            <h2 class="text-zinc-800 font-semibold text-lg leading-snug line-clamp-2">
                {{ product.title }}
            </h2>

            <div class="mt-2">
                <span
                    class="inline-block bg-zinc-200 text-zinc-900 text-xs font-medium px-3 py-1 rounded-full capitalize">
                    {{ product.category }}
                </span>
            </div>

            <div class="mt-2">
                <p class="text-indigo-400 font-bold text-xl">
                    R$ {{ product.price.toFixed(2).replace('.', ',') }}
                </p>

            </div>
        </div>

        <button
            class="flex items-center justify-center gap-2 bg-indigo-600 text-white px-4 py-2 rounded-md w-full font-medium shadow-md hover:bg-indigo-500 transition-colors">
            <ShoppingCart :size="18" />
            Adicionar ao carrinho
        </button>
    </div>
</template>