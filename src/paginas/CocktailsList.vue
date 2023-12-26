<template>
  <div>
    <Navbar @open-sidebar="openSidebar" />
    <Sidebar :isOpen="sidebarOpen" @close-sidebar="closeSidebar" />
    <SearchContainer @search-change="handleSearch" />

    <div class="header-container">
      <h2>LISTA DE TUS CÓCTELES</h2>
      <button @click="navigateToCreateCocktail" class="create-button">Crear un cóctel</button>
    </div>

    <div v-if="cocktails.length === 0" class="no-cocktails">
      No tienes ningún cóctel creado.
    </div>

    <div v-else class="cocktail-list">
      <CocktailCard
        v-for="cocktail in filteredCocktails"
        :key="cocktail.id"
        :title="cocktail.name"
        :ingredients="cocktail.ingredients" 
        :image="cocktail.image"
      />
    </div>
  </div>
</template>

<script>
import Navbar from '../components/Navbar.vue';
import Sidebar from '../components/Sidebar.vue';
import SearchContainer from '../components/SearchContainer.vue';
import CocktailCard from '../components/CocktailCard.vue';
import { getAllCocktails } from '../servicios/ServicioCocktail.js';
import { getAllIngredients } from '../servicios/ServicioIngredients.js';

export default {
  components: {
    Navbar,
    Sidebar,
    SearchContainer,
    CocktailCard
  },
  
  data() {
    return {
      sidebarOpen: false,
      cocktails: [], // Este será el arreglo de tus cócteles creados
      searchQuery: '', // Variable para almacenar la consulta de búsqueda
    }
  },
  methods: {
    openSidebar() {
      this.sidebarOpen = true;
    },
    closeSidebar() {
      this.sidebarOpen = false;
    },
    navigateToCreateCocktail() {
      this.$router.push('/Cocktails');
    },
    fetchCocktailsAndIngredients() {
      getAllCocktails().then(response => {
        // Inicializamos cada cóctel con un array vacío para 'ingredients'
        this.cocktails = response.data['Cócteles'].map(cocktail => ({
          ...cocktail,
          id: cocktail.cocktailId,
          name: cocktail.nameCocktail,
          image: '/path/to/default/image.jpg', // Asegúrate de que esta ruta sea correcta
          ingredients: [] // Inicializamos 'ingredients' como un array vacío
        }));

        // Cargamos los ingredientes para cada cóctel
        this.cocktails.forEach((cocktail, index) => {
          getAllIngredients().then(ingredientsResponse => {
            // Filtramos y mapeamos los ingredientes para este cóctel
            const ingredientsForCocktail = ingredientsResponse.data['Ingredientes creados']
              .filter(ingredient => ingredient.cocktailId.cocktailId === cocktail.id)
              .map(ing => `${ing.nombre}: ${ing.cantidad}`);
            
            // Actualizamos el cóctel con sus ingredientes
            this.cocktails[index].ingredients = ingredientsForCocktail;

            // Actualizamos la lista de cócteles para que Vue detecte el cambio
            this.cocktails = [...this.cocktails];
          });
        });
      }).catch(error => console.error('Error fetching cocktails:', error));
    },
    handleSearch(query) {
      this.searchQuery = query;
    },
  },
  computed: {
    // Filtra los cócteles basándose en la consulta de búsqueda
    filteredCocktails() {
      return this.cocktails.filter(cocktail =>
        cocktail.name.toLowerCase().includes(this.searchQuery.toLowerCase())
      );
    },
  },
  mounted() {
    this.fetchCocktailsAndIngredients();
  }
}
</script>

<style>
.header-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #ff7f50; /* Color de fondo del encabezado */
  padding: 10px 20px;
}

h2 {
  margin: 0;
  color: white; /* Color del texto del encabezado */
}

.create-button {
  padding: 10px 20px;
  background-color: #ffa07a; /* Color de fondo del botón */
  border: none;
  border-radius: 5px;
  cursor: pointer;
  color: white; /* Color del texto del botón */
  font-weight: bold;
  transition: background-color 0.3s ease;
}

.create-button:hover {
  background-color: #ff8c69; /* Color más oscuro al pasar el cursor */
}

/* Asegúrate de que tus otros estilos no interfieran con los nuevos estilos que agregaste */
</style>
