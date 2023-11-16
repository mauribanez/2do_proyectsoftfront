<template>
    <div class="navbar">
      <i class="fas fa-bars navbar-icon" @click="openSidebar"></i>
    <i class="fas fa-user-circle login-icon"></i>
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
  