<template>
  <div>
    <h1>Followers</h1>
    <table>
      <thead>
        <tr>
          <th>Username</th>
          <th>Avatar</th>
          <th>Type</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="follower in followers" :key="follower.id">
          <td>{{ follower.login }}</td>
          <td><img :src="follower.avatar_url" alt="Avatar" style="width: 50px; height: 50px;"></td>
          <td>{{ follower.type }}</td>
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
      followers: [],
      page: 1,
      pageSize: 7
    };
  },
  async mounted() {
    this.fetchFollowers();
  },
  methods: {
    async fetchFollowers() {
      const username = this.$route.params.username;
      try {
        const response = await axios.get(`https://api.github.com/users/${username}/followers?page=${this.page}&per_page=${this.pageSize}`);
        this.followers = response.data;
      } catch (error) {
        console.error('Error fetching followers:', error);
      }
    },
    nextPage() {
      this.page++;
      this.fetchFollowers();
    },
    prevPage() {
      if (this.page > 1) {
        this.page--;
        this.fetchFollowers();
      }
    }
  }
};
</script>
