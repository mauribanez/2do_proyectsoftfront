// ServicioCocktail.js
import axios from 'axios';

const API_URL = 'http://localhost:9999/api/v1/cocktails';

export function getAllCocktails() {
  return axios.get(`${API_URL}`);
}

export function getCocktailById(id) {
  return axios.get(`${API_URL}/${id}`);
}

// ... Más métodos para crear, actualizar y eliminar cócteles ...
