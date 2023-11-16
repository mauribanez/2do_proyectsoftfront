<template>
  <div class="carousel">
    <button class="carousel-btn carousel-btn-prev" @click="prevSlide">&#8249;</button>
    <div class="carousel-inner">
      <div class="carousel-item" v-for="(item, index) in items" :key="index">
        <img :src="item.strDrinkThumb" :alt="item.strDrink">
        <div class="cocktail-name">{{ item.strDrink }}</div>
      </div>
    </div>
    <button class="carousel-btn carousel-btn-next" @click="nextSlide">&#8250;</button>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      currentIndex: 0,
      items: []
    };
  },
  created() {
    this.fetchCocktails();
  },
  methods: {
    fetchCocktails() {
      axios.get('https://www.thecocktaildb.com/api/json/v1/1/filter.php?a=Alcoholic')
        .then(response => {
          const allCocktails = response.data.drinks;
          this.items = this.getRandomCocktails(allCocktails, 5);
        })
        .catch(error => console.error('Error fetching cocktails:', error));
    },
    getRandomCocktails(cocktails, num) {
      const shuffled = cocktails.sort(() => 0.5 - Math.random());
      return shuffled.slice(0, num);
    },
    prevSlide() {
    if (this.currentIndex === 0) {
      this.currentIndex = this.items.length - 1; // Ir al último si está en el primero
    } else {
      this.currentIndex--;
    }
    this.showSlide(this.currentIndex);
  },
  nextSlide() {
    if (this.currentIndex === this.items.length - 1) {
      this.currentIndex = 0; // Volver al primero si está en el último
    } else {
      this.currentIndex++;
    }
    this.showSlide(this.currentIndex);
  },
  showSlide(index) {
    const carouselInner = this.$el.querySelector('.carousel-inner');
    this.currentIndex = index;
    const newTransformValue = -this.currentIndex * 100 + '%';
    carouselInner.style.transform = `translateX(${newTransformValue})`;
  }
  }
}
</script>

<style scoped>
.cocktail-name {
  color: white;
  text-align: center;
}
/* Otros estilos para el carrusel */
</style>