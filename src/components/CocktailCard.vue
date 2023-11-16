<template>
    <div class="cocktail-card">
      <h2>{{ title }}</h2>
      <p>{{ description }}</p>
    </div>
  </template>
  
  <script>
  export default {
    props: {
      title: String,
      description: String
    }
  }
  </script>
  