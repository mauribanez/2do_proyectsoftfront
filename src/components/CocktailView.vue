<template>
  <div v-if="cocktail" class="cocktail-view">
    <div class="cocktail-image">
      <!-- Muestra la imagen del cóctel -->
      <img :src="cocktail.imageUrl" alt="Imagen del cóctel" />
    </div>
    <div class="cocktail-info">
      <!-- Muestra el nombre del cóctel -->
      <h2>{{ cocktail.name }}</h2>
      <!-- Muestra la categoría del cóctel -->
      <h3>Categoría</h3>
      <p>{{ cocktail.category }}</p>
      <!-- Muestra los ingredientes del cóctel -->
      <h3>Ingredientes</h3>
      <ul>
        <li v-for="ingredient in cocktail.ingredients" :key="ingredient">{{ ingredient }}</li>
      </ul>
      <!-- Muestra la preparación del cóctel -->
      <h3>Preparación</h3>
      <p>{{ cocktail.preparation }}</p>
    </div>
  </div>
</template>

<script>
export default {
  name: "CocktailView",
  props: {
    cocktail: {
      type: Object,
      default: () => ({
        name: "Cargando...",
        imageUrl: "default-image-url.jpg", // Asegúrate de reemplazar esto con una URL de imagen por defecto
        category: "",
        ingredients: [],
        preparation: ""
      })
    }
  }
};
</script>

<style scoped>
.cocktail-view {
  display: grid;
  grid-template-columns: 1fr 2fr;
  grid-gap: 20px;
  align-items: start;
  margin: 20px;
  border: 2px solid #000;
  padding: 20px;
}

.cocktail-image img {
  width: 100%;
  height: auto;
  border: 1px solid #000;
}

.cocktail-info {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
}

.cocktail-info h2 {
  font-size: 1.5em;
  border-bottom: 1px solid #000;
  padding-bottom: 5px;
  margin-bottom: 10px;
}

.cocktail-info h3 {
  font-size: 1.2em;
  margin-top: 20px;
  margin-bottom: 5px;
}

.cocktail-info p, .cocktail-info ul {
  margin: 0;
  padding: 0;
  list-style-position: inside;
}

/* Estilo para los elementos de la lista de ingredientes */
.cocktail-info ul {
  padding-left: 20px; /* Añade un espacio dentro de la lista */
}

/* Puedes agregar más estilos personalizados según tus necesidades */
</style>
