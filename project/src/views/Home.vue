<template>
  <div>
    <h1>Query</h1>
    <h2 v-if="res">{{ res.user.repositories.nodes.length }}</h2>
    <button @click="showRes()">show data</button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      query: `
        query {
  user: repositoryOwner(login: "octocat") {
    repositories(
      first: 100
      ownerAffiliations: OWNER
    ) {
      nodes {
        name
      }
    } 
  } 
}
      `,
      baseUrl: "https://api.github.com/graphql",
      res: null,
      token: "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",
    };
  },
  methods: {
    async getRes(query) {
      fetch(this.baseUrl, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${this.token}`,
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          query,
        }),
      })
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          this.res = data.data;
        });
    },
    showRes() {
      console.log(this.res);
    },
  },
  beforeMount() {
    this.getRes(this.query);
  },
};
</script>