import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import './components/styles.css'; // Asegúrate de que la ruta sea correcta

createApp(App)
  .use(router) // Usa el router
  .mount('#app');

<link
  rel="stylesheet"
  href="https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css"
  integrity="sha384-JcKb8q3p0Rds/gnD10kryb0gqZqmbZ1AhiEuLE1N6/1ubtFZfF4T8F1CJpXbjj2f"
  crossorigin="anonymous"
></link>
