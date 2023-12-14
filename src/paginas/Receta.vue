<script>
import CocktailView from '../components/CocktailView.vue';
import Navbar from '../components/Navbar.vue';
import Sidebar from '../components/Sidebar.vue';
import { getCocktailById } from '../servicios/ServicioCocktail.js'; // Asegúrate de que la ruta sea correcta

export default {
  name: "Recetas",
  components: {
    CocktailView,
    Navbar,
    Sidebar,
  },
  data() {
    return {
      cocktail: null, // Inicializa cocktail como null
      sidebarOpen: false, // Agrega esto
    };
  },
  methods: {
    openSidebar() {
      this.sidebarOpen = true;
    },
    closeSidebar() {
      this.sidebarOpen = false;
    },
    fetchCocktailDetails() {
      const cocktailId = this.$route.params.cocktailId;
      getCocktailById(cocktailId).then(response => {
        console.log('Respuesta completa:', response);
        if (response.data && response.data.category) {
          this.cocktail = {
            id: response.data.cocktailId,
            name: response.data.nameCocktail,
            imageUrl: "https://www.gourmet.cl/wp-content/uploads/2019/03/Negroni-web-553x458.jpg",
            category: response.data.category.nameCategory,
            ingredients: response.data.ingredients.map(ing => `${ing.nombre}: ${ing.cantidad}`),
            preparation: response.data.preparation
          };
          console.log('Detalle del cóctel:', this.cocktail); // Depuración: ver detalle del cóctel
        } else {
          console.error('La respuesta no tiene la estructura esperada:', response);
        }
      }).catch(error => {
        console.error('Error fetching cocktail details:', error);
      });
    }
  },
  mounted() {
    this.fetchCocktailDetails();
  }
};
</script>

<template>
  <div>
    <Navbar @open-sidebar="openSidebar" />
    <Sidebar :isOpen="sidebarOpen" @close-sidebar="closeSidebar" />
    <!-- Renderiza CocktailView solo si 'cocktail' tiene un valor -->
    <CocktailView v-if="cocktail" :cocktail="cocktail" />
  </div>
</template>