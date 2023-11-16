<template>
    <div class="navbar">
      <div class="navbar-icon" @click="openSidebar">&#9776;</div>
      <div class="login-icon">👤</div>
    </div>
  </template>
  
  <script>
  export default {
    methods: {
      openSidebar() {
        this.$emit('open-sidebar');
      }
    }
  }
  </script>
  