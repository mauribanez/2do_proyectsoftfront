<template>
  <div class="cocktail-card" v-if="cocktail">
    <div class="cocktail-image">
      <!-- Asegúrate de proporcionar la URL correcta de la imagen del cóctel -->
      <img :src="cocktail.imageUrl" alt="Imagen del cóctel">
    </div>
    <div class="cocktail-info">
      <h3>{{ cocktail.name }}</h3>
      <p class="category">{{ cocktail.category }}</p>
      <h4>Ingredientes:</h4>
      <ul>
        <li v-for="ingredient in cocktail.ingredients" :key="ingredient">
          {{ ingredient }}
        </li>
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
  props: {
    cocktailProp: {
      type: Object,
      default: () => ({})
    }
  },
  data() {
    return {
      cocktail: null
    };
  },
  created() {
    // Al crear el componente, copiamos los datos de la prop a una variable local
    this.cocktail = { ...this.cocktailProp };
  },
  methods: {
  fetchCocktailsAndIngredients() {
    const cocktailId = this.$route.params.cocktailId;

    getAllCocktails().then(cocktailsResponse => {
      const cocktailsData = cocktailsResponse.data['Cócteles'];
      const foundCocktail = cocktailsData.find(c => c.cocktailId.toString() === cocktailId);

      if (!foundCocktail) {
        console.error('Cóctel no encontrado:', cocktailId);
        return;
      }

      // Configuración inicial del cóctel
      this.cocktail = {
        id: foundCocktail.cocktailId,
        name: foundCocktail.nameCocktail,
        imageUrl: "/path/to/default/image.jpg",
        category: foundCocktail.category.nameCategory,
        preparation: foundCocktail.preparation,
        ingredients: []
      };

      getAllIngredients().then(ingredientsResponse => {
        // Asegúrate de acceder correctamente al array de ingredientes
        const ingredientsData = ingredientsResponse.data['Ingredientes creados'];

        if (!Array.isArray(ingredientsData)) {
          console.error('Error: La respuesta de los ingredientes no es un array.');
          return;
        }

        // Filtra y mapea los ingredientes para este cóctel
        const ingredientsForCocktail = ingredientsData
          .filter(ing => ing.cocktailId.cocktailId === this.cocktail.id)
          .map(ing => `${ing.nombre}: ${ing.cantidad}`);

        // Actualiza el cóctel con sus ingredientes
        this.cocktail.ingredients = ingredientsForCocktail;
      });
    }).catch(error => {
      console.error('Error fetching data:', error);
    });
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
