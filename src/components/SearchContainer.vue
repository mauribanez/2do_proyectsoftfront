<template>
  <div class="search-container">
    <form @submit.prevent="searchCocktails">
      <input v-model="searchQuery" type="text" placeholder="Buscar cocteles..." name="search">
      <button type="submit">Buscar</button>
    </form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      searchQuery: '', // Variable para almacenar la consulta de búsqueda
    };
  },
  methods: {
    // Método para emitir el evento search-change con el valor actual del campo de búsqueda
    searchCocktails() {
      this.$emit('search-change', this.searchQuery);
    },
  },
};
</script>