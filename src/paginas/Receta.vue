<script>
  import CocktailView from '../components/CocktailView.vue'; // Asegúrate de que la ruta sea correcta
  import Navbar from '../components/Navbar.vue'; // Asegúrate de que la ruta sea correcta
  import Sidebar from '../components/Sidebar.vue';


export default {
  name: "Recetas",
  components: {
    CocktailView, // Asegúrate de declarar el componente aquí
    Navbar,
    Sidebar,
  },
  data() {
    return {
      cocktail: {
        name: "Nombre del Cóctel",
        imageUrl: "url-de-la-imagen.jpg",
        category: "Categoría del Cóctel",
        ingredients: ["Ingrediente 1", "Ingrediente 2"],
        preparation: "Instrucciones de preparación"
      }
    };
  }
};
</script>

<template>
    <div>
    <Navbar @open-sidebar="openSidebar" />
    <Sidebar :isOpen="sidebarOpen" @close-sidebar="closeSidebar" />
      <!-- Pasar el objeto cocktail al componente CocktailView como prop -->
      <CocktailView :cocktail="cocktail" />

    </div>
  </template>