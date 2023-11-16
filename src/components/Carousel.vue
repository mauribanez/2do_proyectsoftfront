<template>
    <div class="carousel">
      <button class="carousel-btn carousel-btn-prev" @click="prevSlide">&#8249;</button>
      <div class="carousel-inner">
        <div class="carousel-item" v-for="(item, index) in items" :key="index">
          <img :src="item.src" :alt="item.alt">
        </div>
      </div>
      <button class="carousel-btn carousel-btn-next" @click="nextSlide">&#8250;</button>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        currentIndex: 0,
        items: [
          { src: 'url1', alt: 'Coctel 1' },
          { src: 'url2', alt: 'Coctel 2' },
          { src: 'url3', alt: 'Coctel 3' },
          // ... más ítems
        ]
      }
    },
    methods: {
      showSlide(index) {
        const carouselInner = this.$el.querySelector('.carousel-inner');
        this.currentIndex = index;
        const newTransformValue = -this.currentIndex * 100 / this.items.length + '%';
        carouselInner.style.transform = 'translateX(' + newTransformValue + ')';
      },
      prevSlide() {
        this.currentIndex = (this.currentIndex - 1 + this.items.length) % this.items.length;
        this.showSlide(this.currentIndex);
      },
      nextSlide() {
        this.currentIndex = (this.currentIndex + 1) % this.items.length;
        this.showSlide(this.currentIndex);
      }
    }
  }
  </script>
  