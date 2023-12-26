import axios from 'axios';

const API_URL = 'http://localhost:9998/api/v1/category';

export function getAllCategories() {
  return axios.get(`${API_URL}`);
}

export function getCategoryById(id) {
  return axios.get(`${API_URL}/${id}`);
}