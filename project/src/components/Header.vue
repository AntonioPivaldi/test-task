<template>
  <header>
    <nav>
      <router-link
        v-for="route of this.$router.getRoutes()"
        :key="route.name"
        :to="route.path"
      >
        {{ route.name }}
      </router-link>
    </nav>
  </header>
</template>

<script>
</script>