<template>
  <div class="App">
    <Navbar @open-sidebar="openSidebar" />
    <Sidebar v-if="sidebarOpen" @close-sidebar="closeSidebar" />
    <SearchContainer />
    <Carousel />
    <main>
      <CocktailCard title="Negroni" description="Ginebra, vermouth rojo y hielo" />
      <CocktailCard title="Chuflay" description="Whisky, lemon juice, maple syrup y hielo" />
      <!-- ... más tarjetas -->
    </main>
  </div>
</template>

<script>
import Navbar from './components/Navbar.vue'
import Sidebar from './components/Sidebar.vue'
import SearchContainer from './components/SearchContainer.vue'
import Carousel from './components/Carousel.vue'
import CocktailCard from './components/CocktailCard.vue'

export default {
  name: 'App',
  components: {
    Navbar,
    Sidebar,
    SearchContainer,
    Carousel,
    CocktailCard
  },
  data() {
    return {
      sidebarOpen: false
    }
  },
  methods: {
    openSidebar() {
      this.sidebarOpen = true;
    },
    closeSidebar() {
      this.sidebarOpen = false;
    }
  }
}
</script>
<style></style>