import { createRouter, createWebHistory } from 'vue-router';
import Receta from '../paginas/Receta.vue'; // Asegúrate de que el nombre del archivo importado coincida
import Inicio from '../paginas/Inicio.vue';

const routes = [
  {
    path: '/',
    name: 'Inicio',
    component: Inicio
  },
  {
    path: '/recetas',
    name: 'Recetas',
    component: Receta
  },
  // ... otras rutas
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
