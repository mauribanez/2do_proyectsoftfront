<template>
  <div>
    <Navbar @open-sidebar="openSidebar" />
    <Sidebar :isOpen="sidebarOpen" @close-sidebar="closeSidebar" />
    <div class="generate-container">
      <h1>Generate Cocktail Recipe</h1>
      <input v-model="prompt" type="text" placeholder="Enter ingredients or cocktail name">
      <button @click="generate">Generate</button>
      <p v-if="output">{{ output }}</p>
    </div>
  </div>
</template>

<script>
import Navbar from '../components/Navbar.vue';
import Sidebar from '../components/Sidebar.vue';
import getCompletion from '@/servicios/openaiService'; // Ajusta la ruta según sea necesario

export default {
  components: {
    Navbar,
    Sidebar
  },
  data() {
    return {
      sidebarOpen: false,
      prompt: '',
      output: null,
    };
  },
  methods: {
    openSidebar() {
      this.sidebarOpen = true;
    },
    closeSidebar() {
      this.sidebarOpen = false;
    },
    async generate() {
      if (!this.prompt.trim()) {
        alert('Please enter some text to generate a cocktail recipe');
        return;
      }
      try {
        const response = await getCompletion(this.prompt);
        this.output = response.choices[0].text; // Asegúrate de que esta es la estructura de respuesta correcta.
      } catch (error) {
        console.error('Error:', error);
        this.output = 'Failed to generate recipe. Please try again later.';
      }
    },
  },
};
</script>

<style>
.generate-container {
  margin-top: 20px;
  text-align: center;
}

/* Añade estilos adicionales si es necesario para que coincidan con tu diseño */
</style>
