import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import PatternsView from '../views/PatternsView.vue'
import AboutView from '../views/AboutView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/patterns',
      name: 'patterns',
      component: PatternsView,
    },
    {
      path: '/about',
      name: 'about',
      component: AboutView,
    }
  ],
})

export default router
