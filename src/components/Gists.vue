<template>
  <div>
    <h1>Gists</h1>
    <table>
      <thead>
        <tr>
          <th>Created At</th>
          <th>Updated At</th>
          <th>Description</th>
          <th>Commit Url</th>

          
        </tr>
      </thead>
      <tbody>
        <tr v-for="gist in gists" :key="gist.id">
          <td>{{ gist.created_at }}</td>
          <td>{{ gist.updated_at }}</td>
          <td>{{ gist.description }}</td>
          <td>{{gist.commits_url}}</td>
      
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
      gists: [],
      page: 1,
      pageSize: 10
    };
  },
  async mounted() {
    this.fetchGists();
  },
  methods: {
    async fetchGists() {
      const username = this.$route.params.username;
      try {
        const response = await axios.get(`https://api.github.com/users/${username}/gists?page=${this.page}&per_page=${this.pageSize}`);
        this.gists = response.data;
      } catch (error) {
        console.error('Error fetching gists:', error);
      }
    },
    nextPage() {
      this.page++;
      this.fetchGists();
    },
    prevPage() {
      if (this.page > 1) {
        this.page--;
        this.fetchGists();
      }
    }
  }
};
</script>