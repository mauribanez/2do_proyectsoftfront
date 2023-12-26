import axios from 'axios';

const API_URL = 'http://localhost:9998/api/v1/typecocktails';

export function getAllTypeCocktails() {
  return axios.get(`${API_URL}`);
}

export function getTypeCocktailById(id) {
  return axios.get(`${API_URL}/${id}`);
}