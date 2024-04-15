import { createRouter, createWebHistory } from 'vue-router'
import Chessboard from '@/components/Chessboard.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'main',
      component: Chessboard
    }
  ]
})

export default router
