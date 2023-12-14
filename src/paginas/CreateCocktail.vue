<template>
    <Navbar @open-sidebar="openSidebar" />
    <Sidebar :isOpen="sidebarOpen" @close-sidebar="closeSidebar" />
    <div class="container">
      <h2 class="header">Crear Cóctel</h2>
      
      <div class="input-row">
        <input type="text" class="input-field" placeholder="Nombre del ingrediente" v-model="nuevoIngrediente.nombre">
        <input type="text" class="input-field" placeholder="Cantidad" v-model="nuevoIngrediente.cantidad">
        <button class="input-button" @click="agregarIngrediente">Agregar</button>
      </div>
    
      <div v-if="ingredientes.length > 0">
        <table class="table">
          <thead>
            <tr>
              <th scope="col">Nombre del ingrediente</th>
              <th scope="col">Cantidad</th>
              <th scope="col">Acciones</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(ingrediente, index) in ingredientes" :key="index">
              <td>{{ ingrediente.nombre }}</td>
              <td>{{ ingrediente.cantidad }}</td>
              <td>
                <button class="btn btn-danger btn-sm" @click="eliminarIngrediente(index)">Eliminar</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <p class="text-muted" v-else>No hay ingredientes agregados.</p>
    
      <!-- Detalles del Cóctel -->
      <div class="form-section">
        <input type="text" class="form-control mb-2" placeholder="Nombre del Cóctel" v-model="nombreCocktail">
        <select class="custom-select mb-2" v-model="tipoCocktail">
  <option value="">Seleccione el tipo</option>
  <option v-for="tipo in tiposCocktail" :key="tipo.typeCocktailId" :value="tipo.typeCocktailId">
    {{ tipo.nameType }}
  </option>
</select>
<select class="custom-select mb-2" v-model="categoriaCocktail">
  <option value="">Seleccione la categoría</option>
  <option v-for="categoria in categoriasCocktail" :key="categoria.categoryId" :value="categoria.categoryId">
    {{ categoria.nameCategory }}
  </option>
</select>
        <textarea class="form-control mb-2" rows="3" placeholder="Instrucciones de preparación" v-model="instrucciones"></textarea>
      </div>
      <!-- Botones de Guardar y Cancelar -->
      <div class="actions">
      <button class="button save-button" @click="guardarCocktail">Guardar</button>
      <button class="button cancel-button" @click="cancelar">Cancelar</button>
    </div>
  </div>
  </template>
  
  
  <script>
  import Navbar from '../components/Navbar.vue';
  import Sidebar from '../components/Sidebar.vue';
  import { createCocktail } from '../servicios/ServicioCocktail.js';
  import { createIngredient } from '../servicios/ServicioIngredients.js';
  import { getAllCategories } from '../servicios/ServicioCategory.js';
  import { getAllTypeCocktails } from '../servicios/ServicioTypeCocktail.js';
export default {
    components: {
    Navbar,
    Sidebar
  },
  data() {
    return {
      sidebarOpen: false, // Agrega esto
      nuevoIngrediente: { nombre: '', cantidad: '' },
      ingredientes: [],
      nombreCocktail: '',
      instrucciones: '',
      categoriasCocktail: [],
      tiposCocktail: [],
      tipoCocktail: null,
    categoriaCocktail: null,
    };
  },
  methods: {
    openSidebar() {
      this.sidebarOpen = true;
    },
    closeSidebar() {
      this.sidebarOpen = false;
    },
    
    agregarIngrediente() {
      if (this.nuevoIngrediente.nombre && this.nuevoIngrediente.cantidad) {
        this.ingredientes.push({...this.nuevoIngrediente});
        this.nuevoIngrediente.nombre = '';
        this.nuevoIngrediente.cantidad = '';
      }
    },
    eliminarIngrediente(index) {
      this.ingredientes.splice(index, 1);
    },
    async guardarCocktail() {
  // Verifica si los valores de tipo y categoría son válidos antes de enviar
  if (!this.tipoCocktail || !this.categoriaCocktail) {
    console.error('Tipo de cóctel o categoría no seleccionados');
    return;
  }

  try {
    const cocktailData = {
      nameCocktail: this.nombreCocktail,
      typeCocktail: this.tipoCocktail,
      category: this.categoriaCocktail,
      preparation: this.instrucciones
    };

    // Espera la respuesta de la creación del cóctel
    const response = await createCocktail(cocktailData);
    const cocktailId = response.data.cocktailId;

    if (cocktailId) {
      // Ahora crea los ingredientes con el ID del cóctel
      for (const ingrediente of this.ingredientes) {
        const ingredienteData = {
          nombre: ingrediente.nombre,
          cantidad: ingrediente.cantidad,
          cocktailId: cocktailId // Asegúrate de que este ID es el correcto
        };
        await createIngredient(ingredienteData);
      }
      console.log('Cóctel y sus ingredientes guardados con éxito');
    } else {
      console.error('No se recibió un ID de cóctel válido');
    }
  } catch (error) {
    console.error('Error al guardar cóctel o ingredientes:', error);
  }
},

    
    cargarDatos() {
      getAllCategories().then(response => {
  console.log('Categorías cargadas:', response.data);
  this.categoriasCocktail = response.data; // Asumiendo que esto te da un array de objetos con categoryId y nameCategory
}).catch(error => {
  console.error('Error al cargar categorías:', error);
});

getAllTypeCocktails().then(response => {
  console.log('Tipos de cócteles cargados:', response.data);
  if(response.data && response.data['Tipos de cócteles']) {
    this.tiposCocktail = response.data['Tipos de cócteles']; // Asumiendo que esto te da un array de objetos con typeCocktailId y nameType
  } else {
    console.error('Formato de respuesta inesperado para tipos de cóctel:', response.data);
  }
}).catch(error => {
  console.error('Error al cargar tipos de cóctel:', error);
});
    }
  },
  mounted() {
    this.cargarDatos();
  }
  // ... más código si es necesario ...
};
  
</script>

<style>
/* styles.css */
.container {
  width: 80%;
  margin: 20px auto;
  padding: 20px;
  border: 1px solid #ddd;
  border-radius: 8px;
}

.header {
  margin-bottom: 20px;
  text-align: center;
}

.input-row {
  margin-bottom: 10px;
}

.input-field {
  padding: 10px;
  margin-right: 5px;
  border: 1px solid #ccc;
  border-radius: 4px;
}

.input-button {
  padding: 10px 20px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.input-button:hover {
  background-color: #0056b3;
}

.table {
  width: 100%;
  margin-top: 20px;
  border-collapse: collapse;
}

.table thead {
  background-color: #f8f9fa;
}

.table th,
.table td {
  padding: 10px;
  border: 1px solid #ddd;
}

.table th {
  text-align: left;
}

.no-ingredients {
  color: #6c757d;
  text-align: center;
}

.form-section {
  margin-bottom: 20px;
}

.form-section input[type="text"],
.form-section select,
.form-section textarea {
  width: 100%;
  padding: 10px;
  margin-bottom: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
}

.form-section textarea {
  height: 100px;
}

.actions {
  text-align: right;
}

.actions .button {
  padding: 10px 20px;
  margin-left: 10px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}
.container {
  width: 80%;
  margin: 20px auto;
  padding: 20px;
  border-radius: 8px;
  background-color: #ff7f50; /* Color de fondo para la tarjeta */
  box-shadow: 0 0 10px rgba(49, 6, 6, 0.1); /* Sombra suave para dar un efecto elevado */
}

/* Estilos para Botones Neutros */
.button {
  padding: 10px 20px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s ease;
  background-color: #cccccc; /* Gris neutro para el botón */
  color: #333; /* Color de texto casi negro */
}

/* Cambio de color al pasar el cursor sobre los botones */
.button:hover {
  background-color: #bbbbbb; /* Un tono de gris más oscuro para el efecto hover */
  color: #000; /* Texto negro para mayor contraste */
}

/* Estilos para los botones de acción */
.actions .save-button {
  background-color: #e94808; /* Color neutro para el botón guardar */
}

.actions .save-button:hover {
  background-color: #09dd3e; /* Color al pasar el cursor sobre el botón guardar */
}

.actions .cancel-button {
  background-color: #cccccc; /* Color neutro para el botón cancelar */
}

.actions .cancel-button:hover {
  background-color: #eb0f0f; /* Color al pasar el cursor sobre el botón cancelar */
}
.no-cocktails {
  text-align: center;
  margin-top: 20px;
  font-size: 1.2em;
}

.table {
  background-color: #ffffff; /* Fondo claro para la tabla */
  color: #333; /* Texto oscuro */
}

.table thead {
  background-color: #000000; /* Fondo más oscuro para el encabezado de la tabla */
  color: #fffdfd;
}

.table th,
.table td {
  padding: 10px;
  border: 1px solid #9e9e9e; /* Bordes oscuros para las celdas */
}

.table th {
  text-align: left;
}

.btn-danger {
  background-color: #e94808; /* Rojo para el botón eliminar */
  color: white;
  border: none;
  border-radius: 4px;
  padding: 5px 10px;
  cursor: pointer;
  transition: background-color 0.2s ease;
}

.btn-danger:hover {
  background-color: #c9302c; /* Rojo más oscuro al pasar el cursor */
}

/* Estilos para los botones de acción */
.actions .save-button {
  background-color: #f0ad4e; /* Color neutro para el botón guardar */
}

.actions .save-button:hover {
  background-color: #ec971f; /* Color al pasar el cursor sobre el botón guardar */
}

.actions .cancel-button {
  background-color: #d9534f; /* Color neutro para el botón cancelar */
}

.actions .cancel-button:hover {
  background-color: #c9302c; /* Color al pasar el cursor sobre el botón cancelar */
}
</style>