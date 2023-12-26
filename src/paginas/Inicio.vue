<template>
  <div>
    <Navbar @open-sidebar="openSidebar" />
    <Sidebar :isOpen="sidebarOpen" @close-sidebar="closeSidebar" />
    <SearchContainer @search-change="onSearchChange" />
    <Carousel />
    <main>
      <div class="card-container">
        <CocktailCard
          v-for="(cocktail) in filteredCocktails"
          :key="cocktail.idDrink"
          :title="cocktail.nameDrink"
          :ingredients="cocktail.ingredients" 
          :image="cocktail.imagenURL" 
          class="card-column"
        />
      </div>
    </main>
  </div>
</template>

<script>
import axios from 'axios';
import Navbar from '../components/Navbar.vue';
import Sidebar from '../components/Sidebar.vue';
import SearchContainer from '../components/SearchContainer.vue';
import Carousel from '../components/Carousel.vue';
import CocktailCard from '../components/CocktailCard.vue';

export default {
  name: 'Inicio',
  components: {
    Navbar,
    Sidebar,
    SearchContainer,
    Carousel,
    CocktailCard
  },
  data() {
    return {
      sidebarOpen: false,
      cocktails: [],
      searchQuery: '', // Variable para almacenar la consulta de búsqueda
      filteredCocktails: [], // Tarjetas filtradas en función de la búsqueda
    };
  },
  created() {
    this.fetchCocktails();
  },
  watch: {
    // Observador para cambios en la variable de búsqueda
    searchQuery: 'onSearch', // Llamar al método onSearch cuando cambie searchQuery
  },
  methods: {
    openSidebar() {
      this.sidebarOpen = true;
    },
    closeSidebar() {
      this.sidebarOpen = false;
    },
    fetchCocktails() {
      axios.get(`http://localhost:9998/api/v1/cocktailapi`)
        .then(response => {
          this.cocktails = response.data;
          // Al iniciar, mostrar todas las tarjetas
          this.filteredCocktails = [...this.cocktails.map(cocktail => ({
            ...cocktail,
            ingredients: this.getCocktailIngredients(cocktail),
          }))];
        })
        .catch(error => {
          console.error('Error fetching the cocktail data:', error);
        });
    },
    getCocktailIngredients(cocktail) {
      const ingredients = [];
      for (let i = 1; i <= 15; i++) {
        const ingredientName = cocktail[`ingredientName${i}`];

        if (ingredientName) {
          ingredients.push(ingredientName);
        }
      }
      return ingredients; // Ahora devuelve un array solo con los nombres de los ingredientes
    },
    // Método para manejar cambios en la variable de búsqueda
    onSearchChange(newQuery) {
      this.searchQuery = newQuery;
    },
    // Método para realizar la búsqueda en tiempo real
    onSearch() {
      // Filtrar las tarjetas basadas en la consulta de búsqueda
      this.filteredCocktails = this.cocktails.map(cocktail => ({
        ...cocktail,
        ingredients: this.getCocktailIngredients(cocktail),
      })).filter(cocktail =>
        cocktail.nameDrink.toLowerCase().includes(this.searchQuery.toLowerCase())
      );
    },
  },
};
</script>