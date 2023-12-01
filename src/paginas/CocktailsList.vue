<template>
    <div>
      <Navbar @open-sidebar="openSidebar" />
      <Sidebar :isOpen="sidebarOpen" @close-sidebar="closeSidebar" />
      <SearchContainer />
  
      <div class="header-container">
      <h2>LISTA DE TUS CÓCTELES</h2>
      <button @click="navigateToCreateCocktail" class="create-button">Crear un cóctel</button>
    </div>
    <div v-if="cocktails.length === 0" class="no-cocktails">
    No tienes ningún cóctel creado.
  </div>
  <div v-else class="cocktail-list">
    <CocktailCard
            v-for="cocktail in cocktails"
            :key="cocktail.idDrink"
            :title="cocktail.strDrink"
            :ingredients="getCocktailIngredients(cocktail)"
            :image="cocktail.strDrinkThumb"
          />
  </div>
      </div>
  </template>
  
  <script>
  
  import Navbar from '../components/Navbar.vue';
  import Sidebar from '../components/Sidebar.vue';
  import SearchContainer from '../components/SearchContainer.vue';
  import CocktailCard from '../components/CocktailCard.vue';
  
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
        cocktails: [] // Este será el arreglo de tus cócteles creados
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
        // Aquí iría la lógica para navegar a la página de creación de cócteles
        // Por ejemplo, usando this.$router.push('/create-cocktail') si estás utilizando Vue Router
      },
      // ... tus otros métodos ...
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
  