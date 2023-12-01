<template>
  <div class="cocktail-card">
    <div class="cocktail-image">
      <!-- Asegúrate de proporcionar la URL correcta de la imagen del cóctel -->
      <img :src="cocktail.imageUrl" alt="Imagen del cóctel">
    </div>
    <div class="cocktail-info">
      <h3>{{ cocktail.name }}</h3>
      <p class="category">{{ cocktail.category }}</p>
      <h4>Ingredientes:</h4>
      <ul>
        <li v-for="ingredient in cocktail.ingredients" :key="ingredient">{{ ingredient }}</li>
      </ul>
      <h4>Preparación:</h4>
      <p>{{ cocktail.preparation }}</p>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    cocktail: {
      type: Object,
      required: true
    }
  }
};
</script>

<style>
.cocktail-card {
  display: flex;
  align-items: flex-start; /* Alinea los elementos al principio de la tarjeta */
  max-width: 800px; /* Aumenta el ancho máximo si es necesario */
  margin: 20px auto;
  padding: 20px;
  border-radius: 8px;
  background-color: #ff7f50; /* El color naranja que has estado usando */
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2); /* Sombra suave para resaltar la tarjeta */
  color: #fff; /* Texto blanco para contraste */
}

.cocktail-image img {
  max-width: 300px; /* Aumenta el ancho máximo si es necesario */
  height: auto;
  margin-right: 20px; /* Añade un margen a la derecha de la imagen */
  border-radius: 8px;
}

.cocktail-info {
  flex: 1; /* Ocupa el espacio restante */
}

.cocktail-info h3, .cocktail-info h4 {
  margin-top: 10px;
  margin-bottom: 5px;
}

.category {
  font-style: italic;
}

ul {
  padding-left: 20px;
}

/* Si tienes más estilos que quieres aplicar, agrégalos aquí */
</style>
