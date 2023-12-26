<template>
  <div class="cocktail-card">
    <div class="cocktail-info">
      <h2>{{ title }}</h2>
      <h3>Ingredients</h3>
      <ul class="ingredients-list">
        <li v-for="(ingredient, index) in ingredients" :key="index">
          - {{ ingredient }}
        </li>
      </ul>
      <h3>Preparation</h3>
      <p>{{ preparation }}</p>
    </div>
    <div class="cocktail-image">
      <img :src="image" :alt="`Imagen de ${title}`" />
    </div>
  </div>
</template>

<script>
export default {
  props: {
    title: String,
    ingredients: Array,
    preparation: String, // Agrega la propiedad preparation
    image: String,
  },
}
</script>

<style scoped>
/* Estilos CSS */
.card-container {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
}

.card-column {
  width: 23%; /* Ajustado para permitir 4 tarjetas en una fila con espacio entre ellas */
  box-sizing: border-box;
  margin-bottom: 20px;
}

.cocktail-card {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100%; /* Ajuste para que las tarjetas tengan la misma altura */
}

.cocktail-info {
  width: 100%;
}

.ingredients-list {
  columns: 2;
  column-gap: 20px;
  margin-top: 10px;
  padding-left: 0;
  list-style: none;
}

.cocktail-image {
  width: 100%;
}

.cocktail-image img {
  width: 100%;
  height: auto;
}
</style>