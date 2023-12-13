<template>
  <div class="sidebar" :class="{ 'open': isOpen }">
    <a href="javascript:void(0)" class="closebtn" @click="closeSidebar">&#10005;</a>
      <a href="/">Inicio</a>
      <a href="/Cocktails">Crear cocteles personalizados</a>
      <a href="/Cocktails">Crear cocteles</a>
      <a href="/CocktailsList">Lista cocteles</a>
  </div>
</template>

<script>
export default {
  props: {
    isOpen: Boolean
  },
  methods: {
    closeSidebar() {
      this.$emit('close-sidebar');
    }
  }
};
</script>

  