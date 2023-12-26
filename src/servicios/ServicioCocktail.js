// ServicioCocktail.js
import axios from 'axios';

const API_URL = 'http://localhost:9998/api/v1/cocktails';

export function getAllCocktails() {
  return axios.get(`${API_URL}`);
}

export function getCocktailById(id) {
  return axios.get(`${API_URL}/${id}`);
}

export function createCocktail(cocktailData) {
  return axios.post(`${API_URL}/create`, cocktailData);
}

// ... Más métodos para crear, actualizar y eliminar cócteles ...
