
// ServicioIngredients.js
import axios from 'axios';

const API_URL = 'http://localhost:9999/api/v1/ingredients';

export function getAllIngredients() {
  return axios.get(`${API_URL}`);
}

export function getIngredientById(id) {
  return axios.get(`${API_URL}/${id}`);
}

// ... Más métodos para crear, actualizar y eliminar ingredientes ...