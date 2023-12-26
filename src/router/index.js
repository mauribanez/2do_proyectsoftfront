import { createRouter, createWebHistory } from 'vue-router';

import Inicio from '../paginas/Inicio.vue';
import CreateCocktail from '../paginas/CreateCocktail.vue';
import CocktailsList from '../paginas/CocktailsList.vue';
import GenerateCocktail from '../paginas/GenerateCocktail.vue'; // Importa tu nuevo componente


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
  {
    path: '/generate-cocktail',
    name: 'GenerateCocktail',
    component: GenerateCocktail // Usa tu nuevo componente aquí
  },
  // ... otras rutas
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
