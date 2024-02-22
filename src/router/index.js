import { createRouter, createWebHistory } from 'vue-router'
import UserList from '../components/UserList.vue'
import UserDetails from '../components/UserDetails.vue'
import Repos from '../components/Repos.vue'
import Gists from '../components/Gists.vue'
import Followers from '../components/Followers.vue'
import Following from '../components/Following.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'UserList',
      component: UserList,
    },
    {
      path: '/:username',
      name: 'UserDetails',
      component: UserDetails,
    },
    {
      path: '/:username/repos',
      name: 'Repos',
      component: Repos,
    },
    {
      path: '/:username/gists',
      name: 'Gists',
      component: Gists,
    },
    {
      path: '/:username/followers',
      name: 'Followers',
      component: Followers,
    },
    {
      path: '/:username/following',
      name: 'Following',
      component: Following,
    },
    
  ]
})

export default router
