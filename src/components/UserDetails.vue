<template>
    <div v-if="user">
      <img :src="user.avatar_url" alt="Avatar" style="width: 100px; height: 100px;">
      <h1>{{ user.login }}</h1>
      <p>{{ user.name }}</p>
      <p>{{ user.bio }}</p>
      <p>Followers: {{ user.followers }} <router-link :to="{ name: 'Followers', params: { username: user.login }}">View Followers</router-link></p>
      <p>Following: {{ user.following }} <router-link :to="{ name: 'Following', params: { username: user.login }}">View Following</router-link></p>
      <p>Repos: {{ user.public_repos }} <router-link :to="{ name: 'Repos', params: { username: user.login }}">View Repos</router-link></p>
      <p>Gists: {{ user.public_gists }} <router-link :to="{ name: 'Gists', params: { username: user.login }}">View Gists</router-link></p>
      <router-view></router-view>
    </div>
    <div v-else>
      <p>Loading...</p>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  
  export default {
    data() {
      return {
        user: null
      };
    },
    async mounted() {
      const username = this.$route.params.username;
      try {
        const response = await axios.get(`https://api.github.com/users/${username}`);
        this.user = response.data;
      } catch (error) {
        console.error('Error fetching user details:', error);
      }
    }
  };
  </script>
  