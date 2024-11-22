import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import PatternsView from '../views/PatternsView.vue'
import AboutView from '../views/AboutView.vue'
import GameView from '../views/GameView.vue'
import NotFoundView from '../views/NotFoundView.vue'
import Document from '../components/Document.vue'
import ImportantView from '../views/ImportantView.vue'

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
    },
    {
      path: '/game',
      name: 'game',
      component: GameView,
    },
    {
      path: '/:pathMatch(.*)*',
      name: 'NotFound',
      component: NotFoundView
    },
    {
      path: '/document',
      name: 'document',
      component: Document,
    },
    {
      path: '/important',
      name: 'important',
      component: ImportantView,
    }
  ],
})

export default router
