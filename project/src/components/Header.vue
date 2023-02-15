<template>
  <header>
    <h1>
      Repositories of: <i>{{ getUser }}</i>
    </h1>
  </header>
</template>

<script>
export default {
  computed: {
    getUser() {
      return this.$store.getters.getUser;
    },
  },
};
</script>