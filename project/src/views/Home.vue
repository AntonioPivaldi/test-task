<template>
  <div>
    <h1>
      Repositories of: <i>{{ getUser }}</i>
    </h1>
    <div v-for="repo of res" :key="repo.name">
      {{ repo.name }}
    </div>
    <button @click="showRes()">show data</button>
    <button @click="debuger(res)">debug</button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      baseUrl: "https://api.github.com/graphql",
      res: null,
      token: "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",
    };
  },
  computed: {
    getUser() {
      return this.$store.getters.getUser;
    },
    getQuery() {
      return this.$store.getters.getQuery;
    },
  },
  methods: {
    async getRes() {
      fetch(this.baseUrl, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${this.token}`,
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          query: this.getQuery,
          variables: { userLogin: this.getUser },
        }),
      })
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          this.res = data.data.user.repositories.nodes;
        });
    },
    showRes() {
      console.log(this.res);
    },
    debuger(el) {
      console.log(el);
    },
  },
  beforeMount() {
    this.getRes(this.query);
  },
};
</script>