<template>
  <div class="cocktail-card">
    <div class="cocktail-info">
      <h2>{{ title }}</h2>
      <h3>Ingredients</h3>
      <ul class="ingredients-list">
        <li v-for="(ingredient, index) in ingredientsList" :key="index">
          - {{ ingredient }}
        </li>
      </ul>
    </div>
    <div class="cocktail-image">
      <img :src="image" :alt="`Imagen de ${title}`" />
    </div>
  </div>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      default: ''
    },
    ingredients: {
      type: String,
      default: '' // Asegura que ingredients tenga un valor por defecto de cadena vacía.
    },
    image: {
      type: String,
      default: ''
    }
  },
  computed: {
    ingredientsList() {
      // Verifica que ingredients no sea una cadena vacía antes de dividirla.
      return this.ingredients ? this.ingredients.split(', ') : [];
    }
  }
}
</script>

<style scoped>
.cocktail-card {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  width: 35%; /* Ancho completo */
  max-height: 200px; /* Altura fija para todas las tarjetas */
  margin-bottom: 20px; /* Espacio entre tarjetas */
}

.cocktail-info {
  width: 60%; 
}

.ingredients-list {
  columns: 2; /* Divide la lista en 2 columnas */
  column-gap: 20px; /* Espacio entre columnas */
  margin-top: 10px; /* Espacio entre el título y la lista */
  padding-left: 0; /* Remover padding por defecto */
  list-style: none; /* Remover bullets */
}

.cocktail-image {
  width: 45%; /* Ancho de la sección de imagen */
}

.cocktail-image img {
  width: 100%; /* Ancho completo dentro del contenedor */
  height: auto;
}
</style>
