<template>
    <div id="mySidebar" class="sidebar">
      <a href="javascript:void(0)" class="navbar-icon" @click="closeSidebar">&#10005;</a>
      <a href="#">Inicio</a>
      <a href="#">Crear cocteles personalizados</a>
      <a href="#">Crear cocteles</a>
    </div>
  </template>
  
  <script>
  export default {
    methods: {
      closeSidebar() {
        this.$emit('close-sidebar');
      }
    }
  }
  </script>
  