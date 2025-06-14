<template>
  <div class="mb-6">
    <input
      type="text"
      v-model="search"
      placeholder="Buscar produtos..."
      class="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
      @input="emitSearch"
      aria-label="Buscar produtos"
    />
  </div>
</template>

<script>
export default {
  name: 'SearchBar',
  data() {
    return {
      search: '',
    };
  },
  methods: {
    emitSearch() {
      this.$emit('search', this.search);
    },
  },
};
</script>
