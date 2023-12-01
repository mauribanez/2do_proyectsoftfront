import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import './components/styles.css'; // Asegúrate de que la ruta sea correcta

createApp(App)
  .use(router) // Usa el router
  .mount('#app');
