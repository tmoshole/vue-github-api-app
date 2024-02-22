<template>
  <div>
    <h1>Repositories</h1>
    <table>
      <thead>
        <tr>
          <th>Repo Name</th>
          <th>Created At</th>
          <th>Repo Link</th>
          <th>Clone Link</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="repo in repositories" :key="repo.id" @click="navigateToRepoDetails(repo)">
          <td>{{ repo.name }}</td>
          <td>{{ repo.created_at }}</td>
          <td><a :href="repo.html_url" target="_blank">{{ repo.html_url }}</a></td>
          <td><a :href="repo.clone_url" target="_blank">{{ repo.clone_url }}</a></td>
        </tr>
      </tbody>
    </table>
    <button @click="prevPage" :disabled="page === 1">Previous</button>
    <span>{{ page }}</span>
    <button @click="nextPage">Next</button>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      repositories: [],
      page: 1,
      pageSize: 7
    };
  },
  async mounted() {
    this.fetchRepositories();
  },
  methods: {
    async fetchRepositories() {
      const username = this.$route.params.username;
      try {
        const response = await axios.get(`https://api.github.com/users/${username}/repos?page=${this.page}&per_page=${this.pageSize}`);
        this.repositories = response.data;
      } catch (error) {
        console.error('Error fetching repositories:', error);
      }
    },
    navigateToRepoDetails(repo) {
      const username = this.$route.params.username;
      this.$router.push({ name: 'RepoDetails', params: { username: username, repo: repo.name } });
    },
    nextPage() {
      this.page++;
      this.fetchRepositories();
    },
    prevPage() {
      if (this.page > 1) {
        this.page--;
        this.fetchRepositories();
      }
    }
  }
};
</script>

