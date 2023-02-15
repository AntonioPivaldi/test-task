<template>
  <div>
    <div v-if="!res">
      <h1>Data is loading...</h1>
    </div>
    <div v-else>
      <h1>
        Repositories of: <i>{{ getUser }}</i>
      </h1>
      <a-select
        v-model:value="value"
        show-search
        allowClear
        placeholder="Select a repository"
        style="width: 200px"
        :options="options"
        @change="chosen = value"
      ></a-select>
      <div class="repo" v-for="repo of getChosenRepo()" :key="repo.name">
        <div
          class="issue"
          v-for="issue of repo.issues.edges"
          :key="issue.node.bodyText"
        >
          {{ issue.node.title }}
        </div>
        <div v-if="!repo.issues.edges.length">
          <h2>There are no issues in this repository</h2>
        </div>
      </div>
      <div class="debug">
        <button @click="showRes()">show res</button>
        <button @click="debuger(getChosenRepo())">debug</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      baseUrl: "https://api.github.com/graphql",
      res: null,
      token: "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",
      chosen: undefined,
      options: [],
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
          this.fillOptions(this.res);
        });
    },
    fillOptions(res) {
      res.forEach((repo) => {
        this.options.push({
          value: repo.name,
          label: repo.name,
          // issues: repo.issues.edges.map((issue) => {
          //   return issue.node;
          // }),
        });
      });
    },
    getChosenRepo() {
      const result = [];
      this.res.forEach((repo) => {
        if (repo.name == this.chosen) result.push(repo);
      });
      return result;
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