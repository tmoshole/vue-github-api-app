<template>
  <div>
    <h1>Following</h1>
    <table>
      <thead>
        <tr>
          <th>Username</th>
          <th>Avatar</th>
          <th>Type</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="user in followingList" :key="user.id"> 
          <td>{{ user.login }}</td>
          <td><img :src="user.avatar_url" alt="Avatar" style="width: 50px; height: 50px;"></td>
          <td>{{ user.type }}</td>
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
      followingList: [],
      page: 1,
      pageSize: 7
    };
  },
  async mounted() {
    this.fetchFollowing();
  },
  methods: {
    async fetchFollowing() {
      const username = this.$route.params.username;
      try {
        const response = await axios.get(`https://api.github.com/users/${username}/following?page=${this.page}&per_page=${this.pageSize}`);
        this.followingList = response.data;
      } catch (error) {
        console.error('Error fetching following:', error);
      }
    },
    nextPage() {
      this.page++;
      this.fetchFollowing();
    },
    prevPage() {
      if (this.page > 1) {
        this.page--;
        this.fetchFollowing();
      }
    }
  }
};
</script>
