<template>
  <div class="wrapper">
    <Header />
    <RouterView />
    <Footer />
  </div>
</template>

<script setup>
import { RouterLink, RouterView } from "vue-router";
import router from "./router/index.js";
import store from "./store/index.js";
import Header from "./components/Header.vue";
import Footer from "./components/Footer.vue";
</script>


<style lang="scss" scoped>
.wrapper {
  display: flex;
  flex-direction: column;
  max-width: 1600px;
  padding: 1rem;

  &:last-child {
    justify-self: end;
  }
}
</style>

