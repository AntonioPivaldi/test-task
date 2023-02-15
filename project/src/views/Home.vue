<template>
  <div>
    <section v-if="!res">
      <h1>Data is loading...</h1>
    </section>
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
      <section class="repo" v-for="repo of getChosenRepo()" :key="repo.name">
        <div
          class="issue"
          v-for="(issue, index) of repo.issues.edges"
          :key="issue.node.bodyText"
        >
          <div class="issue__header">
            <div class="issue__name">Issue name: {{ issue.node.title }}</div>
            <div class="issue__state">Issue state: {{ issue.node.state }}</div>
          </div>
          <div class="issue__description">
            {{ issue.node.bodyText }}
          </div>
          <div v-if="issue.node.comments.edges.length > 0">
            <a-collapse v-model="activeKey" ghost>
              <a-collapse-panel
                :key="index + 1"
                :header="`Show comments (${issue.node.comments.edges.length})`"
              >
                <div
                  class="comment"
                  v-for="comment of issue.node.comments.edges"
                  :key="comment.node.bodyText"
                >
                  <div class="comment__text">
                    {{ comment.node.bodyText }}
                  </div>
                  <div class="comment__footer">
                    <div class="comment__author">
                      {{ comment.node.author.login }}
                    </div>
                    <div class="comment__date">
                      {{ comment.node.createdAt }}
                    </div>
                  </div>
                </div>
              </a-collapse-panel>
            </a-collapse>
          </div>
        </div>
        <div v-if="!repo.issues.edges.length">
          <h2>There are no issues in this repository</h2>
        </div>
      </section>
      <section class="debug">
        <button @click="showRes()">show res</button>
        <button @click="debuger(getChosenRepo())">debug</button>
      </section>
    </div>
  </div>
</template>

<script>
import { ref } from "vue";

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
  setup() {
    const activeKey = ref(["0"]);
    return {
      activeKey,
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

<style lang="scss" scoped>
.issue {
  margin: 1rem 0;
  padding: 1rem;
  border: 1px solid rgba(0, 0, 0, 0.274);
  border-radius: 10px;
  background-color: rgb(245, 245, 245);
}

.comment {
  margin-bottom: 0.5rem;
  padding: 0.5rem;
  border-radius: 10px;
  background-color: white;
}
</style>