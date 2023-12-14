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
import { getAllCocktails } from '../servicios/ServicioCocktail.js';
import { getAllIngredients } from '../servicios/ServicioIngredients.js';

export default {
  name: 'DetalleCocktail',
  data() {
    return {
      cocktail: null,
    };
  },
  methods: {
    fetchCocktailsAndIngredients() {
      const cocktailId = this.$route.params.cocktailId; // Asegúrate de que estás obteniendo el ID correctamente

      getAllCocktails().then(cocktailsResponse => {
        const cocktailsData = cocktailsResponse.data['Cócteles'];
        console.log('Cócteles cargados:', cocktailsData); // Verifica los cócteles cargados

        getAllIngredients().then(ingredientsResponse => {
          const ingredientsData = ingredientsResponse.data['Ingredientes creados'];
          console.log('Ingredientes cargados:', ingredientsData); // Verifica los ingredientes cargados

          // Busca el cóctel específico
          const foundCocktail = cocktailsData.find(c => c.cocktailId.toString() === cocktailId);
          if (!foundCocktail) {
            console.error('Cóctel no encontrado:', cocktailId);
            return;
          }

          // Asigna los ingredientes al cóctel encontrado
          const ingredientsForCocktail = ingredientsData
            .filter(ing => ing.cocktailId.toString() === cocktailId.toString())
            .map(ing => `${ing.nombre}: ${ing.cantidad}`);

          this.cocktail = {
            ...foundCocktail,
            ingredients: ingredientsForCocktail
          };
          console.log('Cóctel con ingredientes:', this.cocktail); // Verifica el cóctel final
        });
      }).catch(error => {
        console.error('Error fetching data:', error);
      });
    }
  },
  mounted() {
    this.fetchCocktailsAndIngredients();
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
