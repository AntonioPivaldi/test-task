<template>
  <div>
    <section class="inputs">
      <div class="inputs__text">
        <input
          type="text"
          v-model="newUserLogin"
          placeholder="Input user login"
          @keyup.enter="setUser()"
        />
        <input @click="setUser()" type="submit" value="submit" />
      </div>
      <div class="inputs__dropdown" v-if="res && resLoaded">
        <a-select
          v-model:value="value"
          show-search
          allowClear
          placeholder="Select a repository"
          style="width: 200px"
          :options="options"
          @change="chosen = value"
          :deselect="(value = null)"
        ></a-select>
      </div>
    </section>
    <div class="message" v-if="!res && !resLoaded">
      <h2>Data is loading...</h2>
    </div>
    <div class="message" v-else-if="!res && resLoaded">
      <h2>Data is not found. Check the login and try again.</h2>
    </div>
    <div class="message" v-else-if="res && resLoaded && res.length == 0">
      <h2>This user has no repositories. Try another login.</h2>
    </div>
    <div class="message" v-else-if="!chosen">
      <h2>Please, choose a repository.</h2>
    </div>
    <section v-else>
      <div class="repo" v-for="repo of getChosenRepo()" :key="repo.name">
        <div
          class="issue"
          v-for="(issue, index) of repo.issues.edges"
          :key="issue.node.bodyText"
        >
          <div class="issue__header">
            <div class="issue__name">
              Issue name:
              <div class="issue__name-text">{{ issue.node.title }}</div>
            </div>
            <div class="issue__state">
              Issue state:
              <span
                :style="`color: ${
                  issue.node.state == 'OPEN' ? 'lightgreen' : 'red'
                }; font-weight: 600`"
                >{{ issue.node.state }}</span
              >
            </div>
          </div>
          <div v-if="issue.node.bodyText" class="issue__description">
            {{ issue.node.bodyText }}
          </div>
          <div v-else class="issue__description__empty">No description</div>
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
                      by: {{ comment.node.author.login }}
                    </div>
                    <div class="comment__date">
                      at: {{ getDate(comment.node.createdAt) }}
                    </div>
                  </div>
                </div>
              </a-collapse-panel>
            </a-collapse>
          </div>
        </div>
        <div class="message" v-if="!repo.issues.edges.length">
          <h2>There are no issues in this repository.</h2>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import { ref } from "vue";
import { mapGetters } from "vuex";

export default {
  data() {
    return {
      baseUrl: "https://api.github.com/graphql",
      res: null,
      resLoaded: false,
      token: import.meta.env.VITE_TOKEN,
      chosen: undefined,
      options: [],
      newUserLogin: null,
    };
  },
  setup() {
    const activeKey = ref(["0"]);
    return {
      activeKey,
    };
  },
  computed: mapGetters(["getUser", "getQuery"]),
  methods: {
    setUser() {
      this.$store.commit("setUser", this.newUserLogin);
      this.newUserLogin = null;
      this.getRes();
    },
    async getRes() {
      this.res = null;
      this.resLoaded = false;
      this.chosen = undefined;
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
          this.res = data?.data?.user?.repositories?.nodes;
          this.resLoaded = true;
          this.fillOptions(this.res);
        });
    },
    fillOptions(res) {
      this.options = [];
      if (Array.isArray(res))
        res.forEach((repo) => {
          this.options.push({
            value: repo.name,
            label: repo.name,
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
    defineIfChosen(value) {
      return this.chosen ? value : null;
    },
    getDate(dateStr) {
      return new Date(dateStr)
        .toISOString()
        .replace("T", " ")
        .replace("Z", "")
        .slice(0, -4);
    },
  },
  beforeMount() {
    this.getRes();
  },
  mounted() {
    console.log(this.token);
  },
};
</script>

<style lang="scss" scoped>
.inputs {
  display: flex;
  gap: 1rem;

  &__text {
    display: flex;
    gap: 0.25rem;

    & input {
      padding: 3px 0.5rem;

      &:first-child {
        border: 1px solid rgba(0, 0, 0, 0.151);
        border-radius: 2px;
        transition: 0.4s;

        &::placeholder {
          color: rgb(197, 197, 197);
        }

        &:hover {
          border: 1px solid rgb(0, 132, 255);
        }

        &:focus {
          outline: none;
          border: 1px solid rgb(0, 132, 255);
          box-shadow: 0px 0px 3px rgba(19, 141, 255, 0.959);
        }
      }

      &:last-child {
        cursor: pointer;
        border: 1px solid rgba(0, 0, 0, 0.151);
        border-radius: 3px;
      }
    }
  }
}

.issue {
  margin: 1rem 0;
  padding: 1rem;
  border: 1px solid rgba(0, 0, 0, 0.274);
  border-radius: 10px;
  background-color: rgb(245, 245, 245);

  &__header {
    display: flex;
    justify-content: space-between;
  }

  &__name {
    &-text {
      word-break: break-word;
      font-weight: 600;
    }
  }

  &__state {
    min-width: fit-content;
  }

  &__description {
    padding: 0.5rem 1rem;
    margin-top: 0.5rem;
    border: 1px solid rgba(0, 0, 0, 0.048);
    border-radius: 5px;
    background-color: rgb(238, 238, 238);
    font-size: 1rem;
    word-break: break-word;

    &__empty {
      @extend .issue__description;
      font-size: 0.75rem;
      font-style: italic;
    }
  }
}

.comment {
  margin-bottom: 0.5rem;
  padding: 0.5rem 1rem;
  border-radius: 10px;
  background-color: white;

  &__text {
    font-size: 1rem;
    word-break: break-word;
  }

  &__footer {
    display: flex;
    justify-content: space-between;
    padding: 0 0.5rem;
    color: rgba(56, 56, 56, 0.582);
  }
}
</style>