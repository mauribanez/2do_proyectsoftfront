// src/paginas/Inicio.vue
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
      cocktails: []
    }
  },
  created() {
    this.fetchCocktails();
  },
  methods: {
    openSidebar() {
      this.sidebarOpen = true;
    },
    closeSidebar() {
      this.sidebarOpen = false;
    },
    fetchCocktails() {
      const cocktailIds = [11007, 11000, 11001, 11002]; 
      Promise.all(cocktailIds.map(id => 
        axios.get(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`)))
        .then(responses => {
          this.cocktails = responses.map(response => {
            const drink = response.data.drinks[0];
            return {
              ...drink,
              ingredients: this.getCocktailIngredients(drink) // Asegúrate de que esto devuelve un array
            };
          });
        })
        .catch(error => {
          console.error('Error fetching the cocktail data:', error);
        });
    },
    getCocktailIngredients(cocktail) {
      const ingredients = [];
      for (let i = 1; i <= 15; i++) {
        const ingredient = cocktail[`strIngredient${i}`];
        if (ingredient) {
          ingredients.push(ingredient);
        }
      }
      return ingredients; // Ahora devuelve un array
    }
  }
}
</script>

<template>
  <div>
    <Navbar @open-sidebar="openSidebar" />
    <Sidebar :isOpen="sidebarOpen" @close-sidebar="closeSidebar" />
    <SearchContainer />
    <Carousel />
    <main>
      <div v-for="cocktail in cocktails" :key="cocktail.idDrink">
        <CocktailCard
          :title="cocktail.strDrink"
          :ingredients="cocktail.ingredients" 
          :image="cocktail.strDrinkThumb"
        />
      </div>
    </main>
  </div>
</template>