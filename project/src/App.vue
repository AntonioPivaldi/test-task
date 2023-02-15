<template>
  <div class="wrapper">
    <Header />
    <RouterView />
  </div>
</template>

<script setup>
import { RouterLink, RouterView } from "vue-router";
import router from "./router/index.js";
import store from "./store/index.js";
import Header from "./components/Header.vue";
</script>


<style lang="scss" scoped>
.wrapper {
  max-width: 1600px;
  padding: 1rem;
}
</style>

