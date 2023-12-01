import { createRouter, createWebHistory } from 'vue-router';
import Receta from '../paginas/Receta.vue'; // Asegúrate de que el nombre del archivo importado coincida
import Inicio from '../paginas/Inicio.vue';
import CreateCocktail from '../paginas/CreateCocktail.vue';
import CocktailsList from '../paginas/CocktailsList.vue';

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
  {
    path: '/Cocktails',
    name: 'Cocktails',
    component: CreateCocktail
    
    
  },
  {
    path: '/CocktailsList',
    name: 'CocktailsList',
    component: CocktailsList
  },
  // ... otras rutas
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
