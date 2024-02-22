<template>
  <div>
    
    <h1>User List</h1>
    <p>Enter a letter then press search.</p>
    <input type="text" v-model="searchQuery" placeholder="Search users">
    <button @click="searchUsers">Search</button>
    <table>
      <thead>
        <tr>
          <th>Username</th>
          <th>User Type</th>
          <th>Profile Image</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="user in userList" :key="user.id">
          <td>{{ user.login }}</td>
          <td>{{ user.type }}</td>
          <td><img :src="user.avatar_url" alt="Profile Image" style="width: 50px; height: 50px;"></td>
          <td><router-link :to="{ name: 'UserDetails', params: { username: user.login }}">User details</router-link></td>
        </tr>
      </tbody>
    </table>
    <button @click="prevPage" :disabled="page === 1">Previous</button>
    <span>{{ page }}</span>
    <button @click="nextPage" :disabled="userList.length < pageSize">Next</button>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      searchQuery: '',
      userList: [],
      page: 1,
      pageSize: 10
    };
  },
  methods: {
    async searchUsers() {
      try {
        const response = await axios.get(`https://api.github.com/search/users?q=${this.searchQuery}&page=${this.page}&per_page=${this.pageSize}`);
        this.userList = response.data.items;
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    },
    nextPage() {
      this.page++;
      this.searchUsers();
    },
    prevPage() {
      if (this.page > 1) {
        this.page--;
        this.searchUsers();
      }
    }
  }
};
</script>
