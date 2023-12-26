<template>
  <div>
    <Navbar @open-sidebar="openSidebar" />
    <Sidebar :isOpen="sidebarOpen" @close-sidebar="closeSidebar" />
    <!-- Renderiza CocktailView solo si 'cocktail' tiene un valor -->
    <CocktailView :cocktailProp="cocktail" />
  </div>
</template>

<script>
import Navbar from '../components/Navbar.vue';
import Sidebar from '../components/Sidebar.vue';
import CocktailView from '../components/CocktailView.vue';
import { getCocktailById } from '../servicios/ServicioCocktail.js';

export default {
  components: {
    Navbar,
    Sidebar,
    CocktailView
  },
  data() {
    return {
      cocktail: null,
      sidebarOpen: false
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
    if (response.data && response.data.Cóctel) {
      // Verifica si los ingredientes existen y son un array antes de mapearlos
      const ingredients = Array.isArray(response.data.Cóctel.ingredients)
        ? response.data.Cóctel.ingredients.map(ing => `${ing.nombre}: ${ing.cantidad}`)
        : []; // Si no hay ingredientes, utiliza un array vacío

      // Asigna directamente los datos del cóctel, incluyendo los ingredientes verificados
      this.cocktail = {
        id: response.data.Cóctel.cocktailId,
        name: response.data.Cóctel.nameCocktail,
        imageUrl: response.data.Cóctel.imageUrl || 'ruta/a/imagen/por/defecto.jpg',
        category: response.data.Cóctel.category.nameCategory,
        preparation: response.data.Cóctel.preparation,
        ingredients: ingredients
      };
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
