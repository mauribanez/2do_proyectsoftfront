import { createRouter, createWebHistory } from 'vue-router';

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
    path: '/receta/:cocktailId',
    name: 'Receta',
    component: () => import('../paginas/Receta.vue')
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
