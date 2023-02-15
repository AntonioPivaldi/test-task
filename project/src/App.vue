<template>
  <div>
    <Header />
    <RouterView />
  </div>
</template>

<script setup>
import { RouterLink, RouterView } from "vue-router";
import router from "./router/index.js";
import Header from "./components/Header.vue";
</script>


<style scoped>
</style>
