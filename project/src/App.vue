<template>
  <div class="wrapper">
    <div class="upper">
      <Header />
      <RouterView />
    </div>
    <div class="lower">
      <Footer />
    </div>
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
  justify-content: space-between;
  height: 100%;
  padding: 1rem;
}

.lower {
  padding: 1rem 0;
}
</style>

